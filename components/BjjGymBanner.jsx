export default function BjjGymBanner() {
  return (
    <div className="h-120 bg-[url(/hkstreet.jpg)] bg-cover bg-center flex justify-center">
      <div className="w-4/5 my-10 p-10 flex flex-col justify-end items-start">
        <a
          href="/gyms"
          className="border-3 text-3xl p-3 font-bold backdrop-blur-xs"
        >
          BJJ GYMS IN HONG KONG
        </a>
      </div>
    </div>
  );
}
