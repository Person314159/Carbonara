export function formatTime(s: number) {
    const hours = Math.floor(s / 3600).toString();
    const minutes = (Math.floor(s / 60) % 60).toString();
    const seconds = (s % 60).toString();

    return `${hours !== "0" ? hours + "h" : ""}${minutes !== "0" ? minutes + "m" : ""}${seconds !== "0" ? seconds + "s" : ""}`;
}

export function tupleCmp([a1, a2]: [number, number], [b1, b2]: [number, number]) {
    return a1 != b1 ? a1 - b1 : a2 - b2;
}

export function shuffle<T>(arr: T[]): T[] {
    const copy = arr.slice();

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
