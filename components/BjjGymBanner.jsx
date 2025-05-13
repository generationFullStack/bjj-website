import Image from "next/image";
import Link from "next/link";

export default function BjjGymBanner() {
  return (
    <div className="h-auto relative w-full">
      {/* 圖片全寬 */}
      <div className="w-full">
        <Image
          src="/hkstreet.jpg"
          alt="BJJ Gyms in Hong Kong"
          width={600}
          height={500}
          className="w-full h-[250px] rounded-md object-cover"
        />
      </div>
      {/* 文字定位在圖片左下角 */}
      <div className="absolute bottom-5 left-5">
        <Link
          href="/gyms"
          className="border-3 text-3xl p-3 font-bold backdrop-blur-xs text-white hover:bg-gray-800 transition-colors"
        >
          BJJ GYMS IN HONG KONG
        </Link>
      </div>
    </div>
  );
}
