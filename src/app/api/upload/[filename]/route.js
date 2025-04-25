// src/app/api/upload/[filename]/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import mime from "mime";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const { filename } = params;

    // Secure filename validation
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", filename);
    const fileBuffer = await fs.readFile(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}