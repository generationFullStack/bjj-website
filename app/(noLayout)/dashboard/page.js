import AddVideoForm from "@/components/AddVideosForm";
import DeleteVideosForm from "@/components/DeleteVideosForm";
import LogoutButton from "@/components/LogoutButton";
import ShowCategories from "@/components/ShowCategories";
import VideoCategoriesForm from "@/components/VideoCategoriesForm";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await verifySession();
  const userRole = session.role;

  if (userRole === "admin") {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-around my-10 gap-20">
          <h1 className="text-center text-5xl mt-5">Admin dashboard</h1>
          <LogoutButton />
        </div>
        <AddVideoForm />
        <DeleteVideosForm />
        <div className="flex justify-around gap-10 mb-20">
          <ShowCategories />
          <VideoCategoriesForm />
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
