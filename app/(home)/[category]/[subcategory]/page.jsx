import SubcategoryClient from "./SubcategoryClient";

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = await params; // 使用 await 處理動態路由參數

  return <SubcategoryClient category={category} subcategory={subcategory} />;
}
