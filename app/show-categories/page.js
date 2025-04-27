export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <h1>Videos</h1>
      <ul className="flex flex-col">
        {data.map((element) => (
          <li key={element.id}>
            <h1>name: {element.name}</h1>
            <div>parent_id: {element["parent_id"]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
