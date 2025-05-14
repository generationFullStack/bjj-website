"use client";

// About Us 頁面，展示 3 個成員卡片，實現 CodePen 的彈出效果，並在卡片下方添加左右排列的正方形圖片，卡片上方添加代表字，每個卡片添加超連結
export default function AboutUs() {
  // 成員數據，包括圖片、名稱、描述、額外的正方形圖片和超連結
  const members = [
    {
      name: "Jason Lai",
      role: "Head Coach",
      description:
        "Alex has over 10 years of experience in Brazilian Jiu-Jitsu and has trained multiple national champions.",
      image: "/images/jason.jpg",
      extraImages: ["/images/jasonig.jpg"],
      link: "https://www.instagram.com/jasonlai", // 占位超連結
    },
    {
      name: "Pan Lau",
      role: "Instructor",
      description:
        "Sarah specializes in No-Gi techniques and has a background in competitive grappling.",
      image: "/images/pan.jpeg",
      extraImages: ["/images/panig.png"],
      link: "https://www.instagram.com/__ppppnnn515", // 占位超連結
    },
    {
      name: "Gavin Lui",
      role: "Fitness Trainer",
      description:
        "Michael focuses on BJJ-inspired fitness programs to help students build strength and endurance.",
      image: "/images/gavin.jpg",
      extraImages: ["/images/lkkgavin.png"],
      link: "https://www.instagram.com/lkkgavin", // 占位超連結
    },
  ];

  return (
    <div className="min-h-screen bg-[#151414] flex flex-col items-center justify-center py-10">
      {/* 頁面標題 */}
      <h1 className="text-6xl md:text-8xl font-bold text-white text-center mb-20 mt-5">
        Meet Our JPG Team
      </h1>
      {/* 成員卡片容器：調整間距以適應更大的卡片和更多成員 */}
      <div className="flex flex-wrap justify-center gap-20 px-4">
        {members.map((member, index) => (
          <a
            key={index}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center no-underline"
          >
            {/* 代表字：顯示成員名稱的首字母 */}
            <div className="text-8xl font-bold text-white mb-4">
              {member.name.charAt(0)}
            </div>
            {/* 卡片：包含圖片、文字和額外圖片 */}
            <div className="group relative w-160 h-240 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ease-in-out hover:scale-105">
              {/* 原有卡片內容：圖片和文字 */}
              <div className="flex items-center justify-center h-full">
                {/* 圖片：圓形裁剪，懸停時放大和移動 */}
                <div
                  className="absolute w-104 h-104 rounded-full transition-all duration-300 ease-in-out group-hover:w-112 group-hover:h-112 group-hover:-translate-y-28"
                  style={{ clipPath: "circle(50%)" }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 背景層：懸停時顯示半透明背景 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                {/* 文字層：名稱和描述，懸停時顯示，調整字體大小以匹配更大的卡片 */}
                <div className="relative z-10 text-center text-white opacity-0 translate-y-8 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                  <h2 className="text-6xl font-bold">{member.name}</h2>
                  <p className="text-4xl italic">{member.role}</p>
                  <p className="mt-2 text-2xl">{member.description}</p>
                </div>
              </div>
              {/* 下方正方形圖片：左右排列 */}
              <div className="flex justify-center gap-4 mt-4">
                {member.extraImages.map((extraImage, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={extraImage}
                    alt={`${member.name} extra image ${imgIndex + 1}`}
                    className="w-90 h-95  rounded-4xl"
                  />
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
