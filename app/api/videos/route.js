import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM videos ORDER BY id ASC");
    client.release();
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const title = data.get("title");
    const description = data.get("description");
    const youtube_id = data.get("youtube_id");
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO videos (title, description, youtube_id)
       VALUES ('${title}', '${description}', '${youtube_id}')`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error adding videos:", error);
    return NextResponse.json({ error: "Error adding videos" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.formData();
    const videoId = data.get("video_id");
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM videos WHERE id = ${videoId}`
    );
    client.release();
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error deleting videos:", error);
    return NextResponse.json(
      { error: "Error deleting videos" },
      { status: 500 }
    );
  }
}
