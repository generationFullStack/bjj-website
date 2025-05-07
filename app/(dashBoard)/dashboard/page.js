import AddVideoForm from "@/components/AddVideosForm";
import DeleteVideosForm from "@/components/DeleteVideosForm";
import ShowCategories from "@/components/ShowCategories";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-5xl mt-5">Admin dashboard</h1>
      <AddVideoForm />
      <DeleteVideosForm />
      <ShowCategories />
    </div>
  );
}
