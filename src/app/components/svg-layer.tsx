import React, { type JSX } from "react";
import { LineId, MiscNodeId, StnId } from "../constants/constants";
import { ExternalLineStyleAttributes, LineStyleComponentProps } from "../constants/lines";
import { StationType } from "../constants/stations";
import { Element } from "../util/process-elements";
import { UnknownLineStyle, UnknownNode } from "./svgs/common/unknown";
import { lineStyles } from "./svgs/lines/lines";
import { default as allStations } from "./svgs/stations/stations";
import { MiscNodeType } from "@/app/constants/nodes";
import miscNodes from "@/app/components/svgs/nodes/misc-nodes";

interface SvgLayerProps {
    elements: Element[];
}

// HELP NEEDED: Why component is not this type?
type StyleComponent = React.FC<
    LineStyleComponentProps<NonNullable<ExternalLineStyleAttributes[keyof ExternalLineStyleAttributes]>>
>;

const SvgLayer = React.memo(
    (props: SvgLayerProps) => {
        const { elements } = props;
        const layers = Object.fromEntries(
            Array.from({ length: 21 }, (_, i) => [
                i - 10,
                {
                    pre: [] as JSX.Element[],
                    main: [] as JSX.Element[],
                    post: [] as JSX.Element[]
                }
            ])
        );

        for (const element of elements) {
            if (element.type === "line") {
                const type = element.line!.attr.type;
                const style = element.line!.attr.style;
                const styleAttrs = element.line!.attr[style] as NonNullable<
                    ExternalLineStyleAttributes[keyof ExternalLineStyleAttributes]
                >;
                const PreStyleComponent = lineStyles[style]?.preComponent as StyleComponent | undefined;

                if (PreStyleComponent) {
                    layers[element.line!.attr.zIndex].pre.push(
                        <PreStyleComponent
                            key={`${element.id}.pre`}
                            id={element.id as LineId}
                            type={type}
                            path={element.line!.path}
                            styleAttrs={styleAttrs}
                            newLine={false}
                        />
                    );
                }

                const StyleComponent = (lineStyles[style]?.component ?? UnknownLineStyle) as StyleComponent;

                layers[element.line!.attr.zIndex].main.push(
                    <StyleComponent
                        key={element.id}
                        id={element.id as LineId}
                        type={type}
                        path={element.line!.path}
                        styleAttrs={styleAttrs}
                        newLine={false}
                    />
                );

                const PostStyleComponent = lineStyles[style]?.postComponent as StyleComponent | undefined;

                if (PostStyleComponent) {
                    layers[element.line!.attr.zIndex].post.push(
                        <PostStyleComponent
                            key={`${element.id}.post`}
                            id={element.id as LineId}
                            type={type}
                            path={element.line!.path}
                            styleAttrs={styleAttrs}
                            newLine={false}
                        />
                    );
                }
            } else if (element.type === "station") {
                const attr = element.station!;
                const type = attr.type as StationType;
                const PreStationComponent = allStations[type]?.preComponent;

                if (PreStationComponent) {
                    layers[element.station!.zIndex].pre.push(
                        <PreStationComponent
                            key={`${element.id}.pre`}
                            id={element.id as StnId}
                            x={attr.x}
                            y={attr.y}
                            attrs={attr}
                        />
                    );
                }

                const StationComponent = allStations[type]?.component ?? UnknownNode;

                layers[element.station!.zIndex].main.push(
                    <StationComponent key={element.id} id={element.id as StnId} x={attr.x} y={attr.y} attrs={attr} />
                );

                const PostStationComponent = allStations[type]?.postComponent;

                if (PostStationComponent) {
                    layers[element.station!.zIndex].post.push(
                        <PostStationComponent
                            key={`${element.id}.post`}
                            id={element.id as StnId}
                            x={attr.x}
                            y={attr.y}
                            attrs={attr}
                        />
                    );
                }
            } else if (element.type === "misc-node") {
                const attr = element.miscNode!;
                const type = attr.type as MiscNodeType;

                if (type === "virtual") continue;

                const PreMiscNodeComponent = miscNodes[type]?.preComponent;

                if (PreMiscNodeComponent) {
                    layers[element.miscNode!.zIndex].pre.push(
                        <PreMiscNodeComponent
                            key={`${element.id}.pre`}
                            id={element.id as MiscNodeId}
                            x={attr.x}
                            y={attr.y}
                            // @ts-expect-error simple
                            attrs={attr[type]}
                        />
                    );
                }

                const MiscNodeComponent = miscNodes[type]?.component ?? UnknownNode;

                layers[element.miscNode!.zIndex].main.push(
                    <MiscNodeComponent
                        key={element.id}
                        id={element.id as MiscNodeId}
                        x={attr.x}
                        y={attr.y}
                        // @ts-expect-error simple
                        attrs={attr[type]}
                    />
                );

                const PostMiscNodeComponent = miscNodes[type]?.postComponent;

                if (PostMiscNodeComponent) {
                    layers[element.miscNode!.zIndex].post.push(
                        <PostMiscNodeComponent
                            key={`${element.id}.post`}
                            id={element.id as MiscNodeId}
                            x={attr.x}
                            y={attr.y}
                            // @ts-expect-error simple
                            attrs={attr[type]}
                        />
                    );
                }
            }
        }

        return Array.from({ length: 21 }, (_, i) => (i - 10).toString())
            .map(zIndex => [...layers[zIndex].pre, ...layers[zIndex].main, ...layers[zIndex].post])
            .flat();
    },
    (prevProps, nextProps) => prevProps.elements === nextProps.elements
);

SvgLayer.displayName = "SvgLayer";

export default SvgLayer;
