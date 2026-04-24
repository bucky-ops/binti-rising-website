import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sitemapUrl = "https://bintirising.org/sitemap.xml";
    const results: { engine: string; success: boolean; message: string }[] =
      [];

    // Ping Google
    try {
      const googleResponse = await fetch(
        `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        { method: "GET", redirect: "manual" }
      );
      results.push({
        engine: "Google",
        success: googleResponse.status < 400 || googleResponse.status === 200,
        message: `Status: ${googleResponse.status}`,
      });
    } catch {
      results.push({
        engine: "Google",
        success: false,
        message: "Failed to reach Google.",
      });
    }

    // Ping Bing
    try {
      const bingResponse = await fetch(
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        { method: "GET", redirect: "manual" }
      );
      results.push({
        engine: "Bing",
        success: bingResponse.status < 400 || bingResponse.status === 200,
        message: `Status: ${bingResponse.status}`,
      });
    } catch {
      results.push({
        engine: "Bing",
        success: false,
        message: "Failed to reach Bing.",
      });
    }

    return NextResponse.json({
      success: true,
      sitemapUrl,
      pings: results,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process ping requests." },
      { status: 500 }
    );
  }
}
