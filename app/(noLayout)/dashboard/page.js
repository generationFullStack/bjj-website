import AddVideoForm from "@/components/AddVideosForm";
import DeleteVideosForm from "@/components/DeleteVideosForm";
import LogoutButton from "@/components/LogoutButton";
import ShowCategories from "@/components/ShowCategories";

export default function Home() {
  return (
    <div>
      <div className="flex justify-around">
        <h1 className="text-center text-5xl mt-5">Admin dashboard</h1>
        <LogoutButton />
      </div>
      <AddVideoForm />
      <DeleteVideosForm />
      <ShowCategories />
    </div>
  );
}
