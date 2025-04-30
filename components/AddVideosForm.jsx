import { revalidatePath } from "next/cache";

async function onSubmit(formData) {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log(data);
  revalidatePath("/");
}

export default function AddVideoForm() {
  return (
    <div className="w-full border-2 text-3xl">
      <h1 className="text-center text-5xl mt-5">Add Video Form</h1>
      <form action={onSubmit} className="flex flex-col gap-5 items-center p-10">
        <div className="border-2 border-white/50">
          <input name="title" placeholder="title" />
        </div>
        <div className="border-2 border-white/50">
          <input name="description" placeholder="description" />
        </div>
        <div className="border-2 border-white/50">
          <input name="youtube_id" placeholder="youtube_id" />
        </div>
        <button type="submit" className="border-2 border-red-500">
          Add Video
        </button>
      </form>
    </div>
  );
}
