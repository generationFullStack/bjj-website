"use client";

// About Us 頁面，展示 3 個成員卡片，實現 CodePen 的彈出效果，並在卡片下方添加左右排列的正方形圖片，卡片上方添加代表字，每個卡片添加超連結
export default function AboutUs() {
  // 成員數據，包括圖片、名稱、描述、額外的正方形圖片和超連結
  const members = [
    {
      name: "Jason Lai",
      role: "香港第一專一",
      description: "Just for fun. Let's fucking go.",
      image: "/images/jason.jpg",
      extraImages: ["/images/jasonig.jpg"],
      link: "https://www.instagram.com/jason___lai_",
    },
    {
      name: "Pan Lau",
      role: "香港第一情深",
      description: "有情緒價值提供 INFP CHILL Fun.",
      image: "/images/pan.jpeg",
      extraImages: ["/images/panig.png"],
      link: "https://www.instagram.com/__ppppnnn515",
    },
    {
      name: "Gavin Lui",
      role: "香港第一腳鎖",
      description: "A0 業餘BJJ打手.",
      image: "/images/gavin.jpg",
      extraImages: ["/images/lkkgavin.png"],
      link: "https://www.instagram.com/lkkgavin",
    },
  ];

  return (
    <div className="min-h-screen bg-[#151414] flex flex-col items-center justify-center py-10">
      {/* 頁面標題 */}
      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-1">
        點擊此處與3位猛男激烈對話
      </div>
      <div className="text-5xl md:text-6xl font-bold text-white text-center mb-10">
        Three Handsome Boys
      </div>
      {/* 成員卡片容器：調整間距以適應更大的卡片和更多成員 */}
      <div className="flex flex-wrap justify-center gap-20 px-10">
        {members.map((member, index) => (
          <a
            key={index}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center no-underline"
          >
            {/* 代表字：顯示成員名稱的首字母 */}
            <div className="text-6xl font-bold text-white mb-4">
              {member.name.charAt(0)}
            </div>
            {/* 卡片：包含圖片、文字和額外圖片 */}
            <div className="group relative w-160 h-270 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out hover:scale-105">
              {/* 圖片區域：保持懸停效果 */}
              <div className="flex items-center justify-center h-104">
                {/* 圖片：圓形裁剪，懸停時放大和移動 */}
                <div
                  className="absolute w-104 h-104 rounded-full transition-all duration-300 ease-in-out group-hover:w-112 group-hover:h-112 group-hover:-translate-y-10"
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
              </div>
              {/* 文字層：role 和 description，始終顯示，位於圖片下方 */}
              <div className="relative z-10 text-center text-white mt-28">
                <h2 className="text-6xl font-bold">{member.name}</h2>
                <p className="text-4xl italic">{member.role}</p>
                <p className="mt-2 text-2xl">{member.description}</p>
              </div>
              {/* 下方正方形圖片：左右排列 */}
              <div className="flex justify-center gap-4 mt-4">
                {member.extraImages.map((extraImage, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={extraImage}
                    alt={`${member.name} extra image ${imgIndex + 1}`}
                    className="w-90 h-95 rounded-4xl"
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
