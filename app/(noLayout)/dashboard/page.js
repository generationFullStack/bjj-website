import AddVideoForm from "@/components/AddVideosForm";
import DeleteVideosForm from "@/components/DeleteVideosForm";
import LogoutButton from "@/components/LogoutButton";
import ShowCategories from "@/components/ShowCategories";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await verifySession();
  const userRole = session.role;

  if (userRole === "admin") {
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
  } else {
    redirect("/");
  }
}
