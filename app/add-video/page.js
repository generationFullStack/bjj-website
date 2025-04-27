"use client";

export default function Home() {
  async function onSubmit(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="w-screen border-2">
      <h1 className="text-center text-5xl mt-5">Add Video Page</h1>
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
        <div className="border-2 border-white/50">
          <input name="start_position" placeholder="start_position" />
        </div>
        <div className="border-2 border-white/50">
          <input name="end_position" placeholder="end_position" />
        </div>
        <button type="submit" className="border-2 border-white/50 p-1">
          Add
        </button>
      </form>
    </div>
  );
}
