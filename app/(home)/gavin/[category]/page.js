import Category from "./Category";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  return <Category category={category} />;
}
