import { revalidatePath } from "next/cache";

async function onDelete(formData) {
  "use server";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`,
    {
      method: "DELETE",
      body: formData,
    }
  );
  const data = await response.json();
  revalidatePath("/");
}

export default async function DeleteVideosForm() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    cache: "no-cache",
  });
  const data = await res.json();

  return (
    <div className="w-full text-3xl">
      <h1 className="text-center">Delete Videos form</h1>
      <ul className="flex flex-col">
        {data.map((element) => (
          <li
            key={element.id}
            className="flex border-2 justify-between p-3 items-center"
          >
            <div>
              <div>id: {element.id}</div>
              <div>Title: {element.title}</div>
              <div>Description: {element.description}</div>
              <div>Youtube id: {element.youtube_id}</div>
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
