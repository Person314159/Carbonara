import { useState } from "react";
import { LegProp } from "@/app/lib/interfaces";
import Leg from "@/app/components/leg";
import { formatTime } from "@/app/lib/util";

interface RoutingResultProps {
    route: LegProp[][] | null | undefined;
    shareUrl?: string | null;
    onStationFocus?: (name: string) => void;
}

export default function RoutingResult({ route, shareUrl, onStationFocus }: RoutingResultProps) {
    const [copied, setCopied] = useState(false);

    if (route === undefined || route === null) return;

    const handleCopyLink = async () => {
        if (!shareUrl) return;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard access unavailable/denied — nothing more we can do here.
        }
    };

    const legs = route.flat();

    return (
        <>
            <div className="line-border" />

            <div id="result">
                {legs.length > 0 ? (
                    <>
                        {route.map((hopLegs, hopIndex) => (
                            <div key={hopIndex}>
                                {route.length > 1 && (
                                    <div className="hop-divider">
                                        {hopLegs[0].from} → {hopLegs[hopLegs.length - 1].to}
                                    </div>
                                )}
                                {hopLegs.map((leg) => (
                                    <Leg
                                        key={`${leg.line.id}-${leg.from}-${leg.to}`}
                                        {...leg}
                                        onStationFocus={onStationFocus}
                                    />
                                ))}
                            </div>
                        ))}
                        <div className="total-time">
                            Total journey time: {formatTime(legs.map((leg) => leg.time).reduce((a, b) => a + b, 0))}
                        </div>
                        {shareUrl && (
                            <button type="button" className="btn copy-link-btn" onClick={handleCopyLink}>
                                {copied ? "Link copied!" : "Copy shareable link"}
                            </button>
                        )}
                    </>
                ) : (
                    <p>No route found between these stations.</p>
                )}
            </div>
        </>
    );
}
