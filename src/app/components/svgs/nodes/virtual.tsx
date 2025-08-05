import React from "react";
import { Node, NodeComponentProps } from "@/app/constants/nodes";

const Virtual = (props: NodeComponentProps<VirtualAttributes>) => {
    const { id, x, y } = props;

    return (
        <g id={id} transform={`translate(${x}, ${y})rotate(45)`} style={{ cursor: "move" }} className="removeMe">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="black" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="black" />
            <circle id={`virtual_circle_${id}`} r={5} stroke="black" fill="white" fillOpacity="0" />
        </g>
    );
};

/**
 * Virtual has no specific props.
 */
export interface VirtualAttributes {}

const defaultVirtualAttributes: VirtualAttributes = {};
const virtual: Node<VirtualAttributes> = {
    component: Virtual,
    defaultAttrs: defaultVirtualAttributes
};

export default virtual;
