// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // ensure Next doesn’t statically optimize this route

export async function POST(request: Request) {
  try {
    // 1️⃣ Parse the multipart/form-data body
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2️⃣ Prepare the uploads folder
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // 3️⃣ Generate a safe filename (you can tweak this)
    const timestamp = Date.now();
    const safeName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;

    // 4️⃣ Write the file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filepath = path.join(uploadDir, safeName);
    await fs.promises.writeFile(filepath, buffer);

    // 5️⃣ Return the public URL
    const publicUrl = `/uploads/${safeName}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
