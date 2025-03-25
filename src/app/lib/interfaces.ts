export enum LineType {
    LSR,
    HSR
}

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
    line_id: string,
    time: number
}

export interface Neighbour {
    line_id: string,
    destination: string,
    time: number
}

export interface NetworkData {
    lines: Line[],
    stations: Station[],
    connections: Connection[]
}

export interface Leg {
    from: string,
    to: string,
    lineName: string,
    lineColour: string,
    type: LineType,
    stops: string[],
    segments: Connection[],
    time: number
}
