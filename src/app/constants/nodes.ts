import { MiscNodeId } from "./constants";
import { VirtualAttributes } from "../components/svgs/nodes/virtual";
import React from "react";

export enum MiscNodeType {
    Virtual = "virtual"
}

export interface MiscNodeAttributes {
    [MiscNodeType.Virtual]?: VirtualAttributes;
}

/* ----- Below are core types for all miscellaneous nodes, DO NOT TOUCH. ----- */

export interface NodeComponentProps<T> {
    id: MiscNodeId;
    attrs: T;
    x: number;
    y: number;
}

export interface Node<T> {
    /**
     * The core node component.
     */
    component: React.FC<NodeComponentProps<T>>;
    /**
     * This pre component will always be under the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put before other stations/misc-nodes/lines.
     * Note it will be above other elements that have a smaller zIndex.
     */
    preComponent?: React.FC<NodeComponentProps<T>>;
    /**
     * This post component will always be above the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put after other stations/misc-nodes/lines.
     * Note it will be under other elements that have a bigger zIndex.
     */
    postComponent?: React.FC<NodeComponentProps<T>>;
    /**
     * Default attributes for this component.
     */
    defaultAttrs: T;
}
