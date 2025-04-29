import Form from "next/form";

export default async function Home() {
  return (
    <div className="w-screen border-2">
      <h1 className="text-center text-5xl mt-5">Login page</h1>
      <Form className="flex flex-col gap-5 items-center p-10">
        <div className="border-2 border-white/50">
          <input name="email" placeholder="email" />
        </div>
        <div className="border-2 border-white/50">
          <input name="password" placeholder="password" />
        </div>
        <button type="submit" className="border-2 border-white/50 p-1">
          Login
        </button>
      </Form>
    </div>
  );
}
