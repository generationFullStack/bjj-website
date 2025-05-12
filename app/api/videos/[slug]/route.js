import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// fetch list of videos with category name e.g. submission (case sensitive!!!)
export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const client = await pool.connect();
    const result1 = await client.query(
      `SELECT categories.id FROM categories WHERE name = '${slug}'`
    );
    const result2 = await client.query(
      `SELECT videos.id, videos.youtube_id, video_categories.category_id, categories.parent_id, categories.name
      FROM videos
      JOIN video_categories ON videos.id = video_categories.video_id
      JOIN categories ON video_categories.category_id = categories.id
      WHERE categories.id = ${result1.rows[0]["id"]} OR categories.parent_id = ${result1.rows[0]["id"]}`
    );
    client.release();
    return NextResponse.json(result2.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  }
}
