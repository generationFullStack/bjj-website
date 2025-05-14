import { revalidatePath } from "next/cache";

async function handleSubmit(formData) {
  "use server";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video-categories`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  console.log(data);
  revalidatePath("/");
}

async function handleDelete(formData) {
  "use server";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video-categories`,
    {
      method: "DELETE",
      body: formData,
    }
  );
  const data = await response.json();
  console.log(data);
  revalidatePath("/");
}

export default async function VideoCategoriesForm() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video-categories`,
    { cache: "no-cache" }
  );
  const data = await response.json();
  return (
    <div className="w-1/2">
      <form
        action={handleSubmit}
        className="flex flex-col gap-5 text-3xl p-5 border-2 border-white/50 rounded-2xl mb-5"
      >
        <h1>Add category to video form</h1>
        <input
          name="video_id"
          placeholder="video_id"
          className="border-2 rounded-lg border-white/50"
          required
        />
        <input
          name="category_id"
          placeholder="category_id"
          className="border-2 rounded-lg border-white/50"
          required
        />
        <button
          type="submit"
          className="border-2 rounded-2xl w-3xs hover:bg-red-500"
        >
          ADD
        </button>
      </form>
      <div className="grid grid-cols-4 gap-5 justify-between p-3 border-2 border-b-0">
        <div>video_id</div>
        <div>category_id</div>
        <div>name</div>
      </div>
      <ul className="border-2 text-3xl h-200 overflow-x-clip overflow-y-scroll">
        {data.map((element, index) => (
          <li
            key={index}
            className="grid grid-cols-4 gap-5 justify-between p-3 border-b-2"
          >
            <div>{element.video_id}</div>
            <div>{element.category_id}</div>
            <div>{element.name}</div>

            <form action={handleDelete}>
              <input type="hidden" name="video_id" value={element.video_id} />
              <input
                type="hidden"
                name="category_id"
                value={element.category_id}
              />
              <button type="submit" className="border-2 h-10 hover:bg-red-600">
                DELETE
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
