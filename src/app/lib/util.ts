export function formatTime(s: number) {
    const hours = Math.floor(s / 3600).toString();
    const minutes = (Math.floor(s / 60) % 60).toString();
    const seconds = (s % 60).toString();

    return `${hours !== "0" ? hours + "h" : ""}${minutes !== "0" ? minutes + "m" : ""}${seconds !== "0" ? seconds + "s" : ""}`;
}

export function tupleCmp([a1, a2]: [number, number], [b1, b2]: [number, number]) {
    return a1 != b1 ? a1 - b1 : a2 - b2;
}

export function normalizeForSearch(s: string): string {
    return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function getContrastTextColor(bgColor: string) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1) : bgColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#333333" : "#ffffff";
}
