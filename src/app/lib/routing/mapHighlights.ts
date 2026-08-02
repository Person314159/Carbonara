import networkData from "@/app/lib/networkData";
import MapData from "@/app/lib/RMP.json";
import { LegProp } from "@/app/lib/interfaces";

type RMPNodeAttributeValue =
    | string
    | number
    | boolean
    | string[]
    | null
    | undefined
    | { [key: string]: RMPNodeAttributeValue };

type RMPGraphNodeAttributes = {
    type?: string;
    x?: number;
    y?: number;
} & Record<string, RMPNodeAttributeValue>;

type RMPStyleAttr = { color?: string[] | string } & Record<string, string | string[] | undefined>;

type RMPGraphEdge = {
    source: string;
    target: string;
    key?: string;
    attributes?: { style?: string } & Record<string, RMPNodeAttributeValue>;
};

const stationsByName = new Map(networkData.stations.map((station) => [station.name, station]));

MapData.graph.nodes.forEach((node) => {
    const nodeType = node.attributes.type as keyof typeof node.attributes;

    if (nodeType !== "virtual" && nodeType !== "facilities") {
        // @ts-expect-error TS can't narrow node.attributes[nodeType] to a station-typed value after excluding "virtual"/"facilities"
        const station = stationsByName.get(node.attributes[nodeType]!.names[0]);

        if (station === undefined) console.log("Station not defined in network data:", JSON.stringify(node));
        else station.coordinate = [node.attributes.x, node.attributes.y];
    }
});

const stationNameToNodeKeys = new Map<string, string[]>();
const stationKeyToAliases = new Map<string, string[]>();
const edges = (MapData.graph.edges as RMPGraphEdge[]) ?? [];
const stationNodes = MapData.graph.nodes ?? [];

for (const node of stationNodes) {
    const attributes = node.attributes as RMPGraphNodeAttributes;

    for (const value of Object.values(attributes)) {
        const namedValue = value as { names?: string[] };

        if (typeof value === "object" && value !== null && Array.isArray(namedValue.names)) {
            for (const name of namedValue.names as string[]) {
                const keys = stationNameToNodeKeys.get(name) ?? [];

                if (!keys.includes(node.key)) keys.push(node.key);
                stationNameToNodeKeys.set(name, keys);
            }
        }
    }
}

for (const stationNameToNodeKey of stationNameToNodeKeys) {
    if (stationNameToNodeKey[1].length <= 1) continue;
    for (const key of stationNameToNodeKey[1]) {
        stationKeyToAliases.set(
            key,
            stationNameToNodeKey[1].filter((k) => k !== key)
        );
    }
}

const adjacency = new Map<string, RMPGraphEdge[]>();

for (const edge of edges) {
    const sourceList = adjacency.get(edge.source) ?? [];

    sourceList.push(edge);
    adjacency.set(edge.source, sourceList);

    const targetList = adjacency.get(edge.target) ?? [];

    targetList.push(edge);
    adjacency.set(edge.target, targetList);
}

function normalizeColor(color: string | undefined) {
    return color?.toLowerCase() ?? "";
}

function getEdgeColor(edge: RMPGraphEdge | null | undefined) {
    if (!edge?.attributes || !edge.attributes.style) return "";

    const styleAttr = edge.attributes[edge.attributes.style as string] as RMPStyleAttr | undefined;

    if (!styleAttr || typeof styleAttr !== "object") return "";

    const color = Array.isArray(styleAttr.color) ? styleAttr.color.find((value) => /^#/.test(value)) : undefined;

    return normalizeColor(color as string | undefined);
}

function isRouteEdge(edge: RMPGraphEdge | null | undefined, lineColor?: string) {
    if (!edge?.attributes) return false;
    if (edge.attributes.style === "bjsubway-dotted") return false;

    const edgeColor = getEdgeColor(edge);

    return lineColor ? edgeColor === lineColor : false;
}

function findRMPPathEdges(startKey: string, endKey: string, lineColor?: string) {
    const queue: string[] = [startKey];
    let head = 0;
    const visited = new Set<string>([startKey]);
    const parent = new Map<string, { node: string; edge: RMPGraphEdge | null }>();

    while (head < queue.length) {
        const nodeKey = queue[head++];

        if (nodeKey === endKey) break;

        for (const edge of adjacency.get(nodeKey) ?? []) {
            const otherKey = edge.source === nodeKey ? edge.target : edge.source;

            if (visited.has(otherKey)) continue;
            if (lineColor && !isRouteEdge(edge, lineColor)) continue;

            visited.add(otherKey);
            parent.set(otherKey, { node: nodeKey, edge });
            queue.push(otherKey);
        }

        for (const aliasKey of stationKeyToAliases.get(nodeKey) ?? []) {
            if (visited.has(aliasKey)) continue;
            visited.add(aliasKey);
            parent.set(aliasKey, { node: nodeKey, edge: null });
            queue.push(aliasKey);
        }
    }

    if (!parent.has(endKey)) return undefined;

    const pathEdges: string[] = [];
    let currentKey = endKey;

    while (currentKey !== startKey) {
        const step = parent.get(currentKey)!;

        if (step.edge?.key) pathEdges.unshift(step.edge.key);
        currentKey = step.node;
    }

    return pathEdges;
}

export function getStationKeysForName(name: string) {
    return stationNameToNodeKeys.get(name) ?? [];
}

const linesById = new Map(networkData.lines.map((line) => [line.id, line]));

function getRouteLineColor(lineID: string) {
    return normalizeColor(linesById.get(lineID)?.colour);
}

export function getRouteHighlights(route: LegProp[]) {
    const edgeIds = new Set<string>();
    const stationKeys = new Set<string>();
    const addRouteSegment = (from: string, to: string, lineID: string) => {
        const lineColor = getRouteLineColor(lineID);
        const sourceKeys = getStationKeysForName(from);
        const targetKeys = getStationKeysForName(to);

        sourceKeys.forEach((key) => stationKeys.add(key));
        targetKeys.forEach((key) => stationKeys.add(key));

        for (const sourceKey of sourceKeys) {
            for (const targetKey of targetKeys) {
                const path = findRMPPathEdges(sourceKey, targetKey, lineColor);

                if (path?.length) {
                    path.forEach((edgeId) => edgeIds.add(edgeId));
                    return;
                }
            }
        }
    };

    for (const leg of route) {
        const segments =
            leg.segments.length > 0
                ? leg.segments
                : [{ from: leg.from, to: leg.to, lineID: leg.line.id, time: leg.time }];

        for (const segment of segments) {
            addRouteSegment(segment.from, segment.to, segment.lineID);
        }
    }

    return {
        edgeIds: Array.from(edgeIds),
        stationKeys: Array.from(stationKeys),
    };
}
