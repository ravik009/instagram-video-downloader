// app/api/download-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fileUrl = searchParams.get("url");
  let filename = searchParams.get("filename"); // Default is undefined

  // If filename is not provided, extract from fileUrl
  if (!filename && fileUrl) {
    try {
      const urlObj = new URL(fileUrl);
      const pathname = urlObj.pathname;
      let extractedFilename = pathname.substring(pathname.lastIndexOf('/') + 1);
      
      // If no extension found, determine based on URL or content type
      if (!extractedFilename.includes('.')) {
        // Check if it's likely a video or image based on URL patterns
        if (fileUrl.includes('video') || fileUrl.includes('mp4')) {
          extractedFilename = extractedFilename + '.mp4';
        } else {
          extractedFilename = extractedFilename + '.jpg';
        }
      }
      
      filename = extractedFilename || "media.mp4";
    } catch {
      filename = "media.mp4";
    }
  }

  if (!fileUrl) {
    return NextResponse.json(
      { error: "missingUrl", message: "url is required" },
      { status: 400 }
    );
  }

  try {
    // Validate the URL slightly (optional but recommended)
    if (!fileUrl.startsWith("https://")) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Fetch the media from the external URL
    const mediaResponse = await fetch(fileUrl);

    if (!mediaResponse.ok) {
      throw new Error(`Failed to fetch media: ${mediaResponse.statusText}`);
    }

    // Get the media data as a ReadableStream
    const mediaStream = mediaResponse.body;

    if (!mediaStream) {
      throw new Error("Media stream is not available");
    }

    // Set headers to force download
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename=\"${filename}\"`);
    // Try to get Content-Type from original response, fallback to appropriate type
    const contentType = mediaResponse.headers.get("Content-Type");
    headers.set(
      "Content-Type",
      contentType || (filename?.includes('.mp4') ? "video/mp4" : "image/jpeg")
    );
    // Optionally set Content-Length if available
    if (mediaResponse.headers.get("Content-Length")) {
      headers.set(
        "Content-Length",
        mediaResponse.headers.get("Content-Length")!
      );
    }

    // Return the stream response
    return new NextResponse(mediaStream, {
      status: 200,
      headers: headers,
    });
  } catch (error: any) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500 }
    );
  }
}
