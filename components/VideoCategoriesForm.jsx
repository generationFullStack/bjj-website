export default async function VideoCategoriesForm() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video-categories`,
    { cache: "no-cache" }
  );
  const data = await response.json();
  return (
    <div className="border-2 w-1/2 text-3xl h-200 overflow-x-clip overflow-y-scroll">
      <ul>
        {data.map((element) => (
          <li
            key={element.video_id}
            className="grid grid-cols-3 gap-5 justify-between p-3 border-b-2"
          >
            <div>{element.video_id}</div>
            <div>{element.category_id}</div>
            <div>{element.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
