import Image from "next/image";
import { gymList } from "@/constant/gymList";

export default function GymList() {
  return (
    <ul className="flex flex-col text-5xl gap-10 items-center">
      {gymList.map((element, index) => (
        <li
          key={index}
          className="border-2 flex flex-col-reverse sm:flex-row w-full justify-between gap-5"
        >
          <div className="flex flex-col justify-around items-start gap-5 p-5">
            <h1>{element.name}</h1>
            <a
              href={element.website}
              target="_blank"
              className="text-blue-400 hover:text-blue-700 underline text-3xl wrap-anywhere"
            >
              {element.website}
            </a>
            <div>{element.address}</div>
          </div>
          <Image
            src={element.imgSrc}
            width={200}
            height={200}
            alt="Logo of the gym"
            className="self-center bg-white"
          />
        </li>
      ))}
    </ul>
  );
}
