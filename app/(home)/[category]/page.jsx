import CategoryClient from "./CategoryClient";

export default async function CategoryPage({ params }) {
  const { category } = await params; // 使用 await 處理動態路由參數
  return <CategoryClient category={category} />;
}
