import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT vc.video_id, vc.category_id, c.name 
      FROM video_categories vc 
      JOIN categories c ON vc.category_id = c.id
      ORDER BY video_id ASC`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const videoId = data.get("video_id");
    const categoryId = data.get("category_id");
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO video_categories (video_id, category_id) 
        VALUES (${videoId}, ${categoryId})`
    );
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error adding category to video:", error);
    return NextResponse.json(
      { error: "Error adding category to video" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const data = await request.formData();
    const videoId = data.get("video_id");
    const categoryId = data.get("category_id");
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM video_categories WHERE video_id = ${videoId} AND category_id = ${categoryId}`
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
