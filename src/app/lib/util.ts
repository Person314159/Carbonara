// Format time (seconds to minutes and seconds)
export function formatTime(seconds: number) {
    if (seconds < 60) {
        return `${seconds} seconds`;
    }

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    if (sec === 0) {
        return `${min} minute${min !== 1 ? 's' : ''}`;
    }

    return `${min} minute${min !== 1 ? 's' : ''} ${sec} second${sec !== 1 ? 's' : ''}`;
}
