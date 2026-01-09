import path from "path";
import fs from "fs";
import { books } from "../../../content/books";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const file = searchParams.get("file");
        const token = searchParams.get("token");

        // Validate inputs
        if (!file || !token) {
            return new Response(
                JSON.stringify({ error: "Missing file or token" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Decode token to get email
        let email;
        try {
            email = Buffer.from(token, "base64").toString("utf-8");
        } catch {
            return new Response(
                JSON.stringify({ error: "Invalid token" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Security: Verify file exists in books and matches request
        const book = books.find((b) => b.freeSample?.file === file);
        if (!book) {
            return new Response(
                JSON.stringify({ error: "File not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Construct safe file path
        const filePath = path.join(process.cwd(), "private/free-samples", file);

        // Prevent directory traversal attacks
        const realPath = path.resolve(filePath);
        const basePath = path.resolve(path.join(process.cwd(), "private/free-samples"));
        if (!realPath.startsWith(basePath)) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return new Response(
                JSON.stringify({ error: "File not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath);

        // Return PDF with proper headers
        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${file}"`,
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        console.error("Download error:", error);
        return new Response(
            JSON.stringify({ error: "Unable to download file" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
