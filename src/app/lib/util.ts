export function formatTime(s: number) {
    const hours   = Math.floor(s / 3600).toString();
    const minutes = (Math.floor(s / 60) % 60).toString();
    const seconds = (s % 60).toString();

    return `${hours !== "0" ? hours + "h": ""}${minutes !== "0" ? minutes + "m": ""}${seconds !== "0" ? seconds + "s": ""}`;
}
