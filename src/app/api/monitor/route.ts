import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, args, sessionId, timestamp } = body;

    // Log the event to server console (Vercel logs / terminal)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const date = new Date(timestamp).toISOString();

    console.log(`[TELEMETRY] ${date} | Session: ${sessionId} | IP: ${ip} | UA: ${userAgent}`);
    console.log(`[EVENT] TYPE: ${type} | COMMAND: ${name || "N/A"} | ARGS: ${args || "N/A"}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[TELEMETRY ERROR]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
