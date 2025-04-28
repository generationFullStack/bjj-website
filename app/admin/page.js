import AddVideoForm from "@/components/AddVideosForm";
import DeleteVideosForm from "@/components/DeleteVideosForm";

export default function Home() {
  return (
    <div className="w-screen">
      <h1 className="text-center text-5xl mt-5">Admin dashboard</h1>
      <AddVideoForm />
      <DeleteVideosForm />
    </div>
  );
}
