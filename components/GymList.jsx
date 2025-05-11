import Image from "next/image";

export default function GymList() {
  return (
    <div className="flex flex-col text-5xl gap-10 items-center">
      <h1 className="font-bold">GYMS IN HONG KONG</h1>
      <div className="border-2 flex flex-col-reverse sm:flex-row w-full justify-between gap-5">
        <div className="flex flex-col justify-around items-start gap-5 p-5">
          <h1 className="">Kennon Bjj</h1>
          <a
            href="https://www.facebook.com/shootogymhongkong"
            target="_blank"
            className="text-blue-400 hover:text-blue-700 underline text-3xl wrap-anywhere"
          >
            https://www.facebook.com/shootogymhongkong
          </a>
          <div className="text-3xl">
            2/F TUNG WAI BUILDING, 227-229 Tung Choi Street Mongkok, Hong Kong
          </div>
        </div>
        <Image
          src={"/kennonbjj.png"}
          width={200}
          height={200}
          alt="Logo of the gym"
          className="self-center"
        />
      </div>
      <div className="border-2 flex flex-col-reverse sm:flex-row w-full justify-between gap-5">
        <div className="flex flex-col justify-around items-start gap-5 p-5">
          <h1 className="">Tempo Jiu Jitsu</h1>
          <a
            href="https://www.tempojj.com"
            target="_blank"
            className="text-blue-400 hover:text-blue-700 underline text-3xl wrap-anywhere"
          >
            https://www.tempojj.com
          </a>
          <div className="text-3xl">
            3A, 10-14 Arbuthnot House, Arbuthnot Road, Central, Hong Kong
          </div>
        </div>
        <Image
          src={"/tempojj.png"}
          width={200}
          height={200}
          alt="Logo of the gym"
          className="self-center bg-white"
        />
      </div>
      <div className="border-2 flex flex-col-reverse sm:flex-row w-full justify-between gap-5">
        <div className="flex flex-col justify-around items-start gap-5 p-5">
          <h1 className="">Jiu Jitsu Academy</h1>
          <a
            href="https://www.instagram.com/jiu_jitsu.academy"
            target="_blank"
            className="text-blue-400 hover:text-blue-700 underline text-3xl wrap-anywhere"
          >
            https://www.instagram.com/jiu_jitsu.academy
          </a>
          <div className="text-3xl">
            佐敦尖沙咀柯士甸道118-120號業廣商業中心16樓1604室 到15樓行一層樓梯上
          </div>
        </div>
        <Image
          src={"/jja.png"}
          width={200}
          height={200}
          alt="Logo of the gym"
          className="self-center bg-white"
        />
      </div>
    </div>
  );
}
