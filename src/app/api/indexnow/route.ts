import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required." },
        { status: 400 }
      );
    }

    const key = process.env.INDEXNOW_KEY || "binti-2026-rise-key";
    const host = "https://bintirising.org";

    const indexNowPayload = {
      host,
      key,
      urlList: urls.map(
        (url: string) => (url.startsWith("http") ? url : `${host}${url}`)
      ),
    };

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(indexNowPayload),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `Submitted ${urls.length} URL(s) to IndexNow.`,
        urls: indexNowPayload.urlList,
      });
    }

    return NextResponse.json(
      { error: "Failed to submit to IndexNow API." },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process IndexNow submission." },
      { status: 500 }
    );
  }
}
