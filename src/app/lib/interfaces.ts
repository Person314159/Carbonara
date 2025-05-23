export type LineType = "LSR" | "HSR";

export interface Line {
    id: string,
    name: string,
    colour: string,
    type: LineType
}

export interface Station {
    name: string;
}

export interface Connection {
    from: string,
    to: string,
    lineID: string,
    time: number
}

export interface Neighbour {
    lineID: string,
    destination: string,
    time: number
}

export interface NetworkData {
    lines: Line[],
    stations: Station[],
    connections: Connection[]
}

export interface LegProp {
    from: string,
    to: string,
    line: Line
    stops: string[],
    segments: Connection[],
    time: number
}
