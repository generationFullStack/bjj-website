export default async function ShowCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    { cache: "no-cache" }
  );
  const data = await response.json();
  return (
    <div className="border-2 w-1/2 text-3xl h-200 overflow-y-scroll">
      <ul>
        {data.map((element) => (
          <li
            key={element.id}
            className="flex gap-5 justify-between p-3 border-b-2"
          >
            <div>{element.id}</div>
            <div>{element.name}</div>
            <div>{element.parent_id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
