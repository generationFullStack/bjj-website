async function onDelete(formData) {
  "use server";
  const videoId = formData.get("video_id");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    method: "DELETE",
    body: formData,
  });
  const data = await res.json();
}

export default async function DeleteVideosForm() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`);
  const data = await res.json();

  return (
    <div className="w-full">
      <h1 className="text-center">Videos</h1>
      <ul className="flex flex-col">
        {data.map((element) => (
          <li
            key={element.id}
            className="flex justify-around items-center border-2"
          >
            <div>
              <div>video_id: {element.id}</div>
              <h1>title: {element.title}</h1>
              <div>description: {element.description}</div>
              <div>youtube_id: {element.youtube_id}</div>
            </div>

            <form action={onDelete}>
              <input type="hidden" name="video_id" value={element.id} />
              <button type="submit" className="border-2 border-red-600">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
