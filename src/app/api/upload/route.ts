// POST: /api/upload
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save to "uploads" directory at the project root (outside src)
    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const safeName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, safeName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/api/upload/${safeName}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
