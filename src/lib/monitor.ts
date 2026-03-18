"use client";

export type EventType = "VISIT_START" | "COMMAND_RUN" | "SHORTCUT_CLICK" | "BOOT_COMPLETE";

export interface TelemetryEvent {
  type: EventType;
  name?: string;
  args?: string;
  sessionId: string;
  timestamp: number;
}

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("portfolio_session");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("portfolio_session", id);
  }
  return id;
};

export const trackEvent = async (type: EventType, metadata?: { name?: string; args?: string }) => {
  try {
    const event: TelemetryEvent = {
      type,
      ...metadata,
      sessionId: getSessionId(),
      timestamp: Date.now(),
    };

    // Use sendBeacon for reliability during navigation/unload, or fetch for standard events
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(event)], { type: "application/json" });
      navigator.sendBeacon("/api/monitor", blob);
    } else {
      await fetch("/api/monitor", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    // Silent fail to not disrupt UX
    console.error("Telemetry error:", err);
  }
};
