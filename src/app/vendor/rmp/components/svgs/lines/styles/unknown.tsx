import React from "react";
import { LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

export interface UnknownLineAttributes {}

export const UnknownLineStyle = (props: LineStyleComponentProps<UnknownLineAttributes>) => {
    const { id, path } = props;

    return <path d={path.d} fill="none" stroke="grey" strokeWidth="5" strokeLinecap="round" cursor="pointer" />;
};

const unknownLineStyle: LineStyle<UnknownLineAttributes> = {
    component: UnknownLineStyle,
    defaultAttrs: {},
};

export default unknownLineStyle;
