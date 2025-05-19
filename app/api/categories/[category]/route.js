import { NextResponse } from "next/server";
import { getCategoryChild } from "@/lib/db/category";

export async function GET(request, { params }) {
  const { category } = await params;
  const categoryChild = await getCategoryChild(category); // called the function from data access layer where the query will perform

  try {
    if (!categoryChild) {
      return NextResponse.json(
        { error: "category child not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(categoryChild, { status: 200 });
  } catch (error) {}
}
