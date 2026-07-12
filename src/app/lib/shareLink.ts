// All routes are Fast/Dijkstra and therefore deterministic from their search parameters —
// the same station list, metric, and exclusions always find the same route.
export interface ShareParams {
    stations: string[];
    metric: string;
    excludedLines?: string[];
    excludedStations?: string[];
}

export function buildShareQuery({ stations, metric, excludedLines, excludedStations }: ShareParams): string {
    const params = new URLSearchParams();

    params.set("stations", stations.join("|"));
    params.set("metric", metric);

    if (excludedLines?.length) params.set("xl", excludedLines.join("|"));
    if (excludedStations?.length) params.set("xs", excludedStations.join("|"));

    return params.toString();
}

export function parseShareQuery(search: string): ShareParams | null {
    const params = new URLSearchParams(search);
    const stationsParam = params.get("stations");

    if (!stationsParam) return null;

    const stations = stationsParam.split("|").filter(Boolean);

    if (stations.length < 2) return null;

    const metric = params.get("metric") === "transfers" ? "transfers" : "time";
    const excludedLines = params.get("xl")?.split("|").filter(Boolean);
    const excludedStations = params.get("xs")?.split("|").filter(Boolean);

    return { stations, metric, excludedLines, excludedStations };
}
