import { gymList } from "@/constant/gymList";

export default function GymList() {
  return (
    <ul className="flex flex-col text-5xl gap-50 items-center">
      <h1 className="text-5xl font-bold">GYMS IN HONG KONG</h1>
      {gymList.map((element, index) => (
        <li
          key={index}
          className="flex flex-col-reverse sm:flex-row w-full justify-between gap-5"
        >
          <div className="flex flex-col justify-around items-start p-5">
            <h1 className="mb-10">{element.name}</h1>
            <div className="text-2xl font-bold">WEBSITE</div>
            <a
              href={element.website}
              target="_blank"
              className="text-blue-400 hover:text-blue-700 underline text-3xl wrap-anywhere mb-10"
            >
              {element.website}
            </a>
            <div className="text-2xl font-bold">ADDRESS</div>
            <div className="text-2xl">{element.address}</div>
          </div>
          <img
            src={element.imgSrc}
            alt="Logo of the gym"
            width={200}
            height={200}
            className="self-center bg-white object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
