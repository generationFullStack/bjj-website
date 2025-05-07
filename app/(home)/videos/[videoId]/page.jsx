"use client";

import Link from "next/link";
import styles from "../Videos.module.css";

const submenus = [
  {
    title: "Submissions",
    videos: [
      {
        title: "Armbar Tutorial",
        videoId: "3Bp4WzcPJIU",
      },
      {
        title: "Triangle Choke Basics",
        videoId: "3Bp4WzcPJIU",
      },
      {
        title: "Rear Naked Choke Guide",
        videoId: "3Bp4WzcPJIU",
      },
    ],
  },
  {
    title: "Guard Passing",
    videos: [
      {
        title: "Toreando Pass Techniques",
        videoId: "3Bp4WzcPJIU",
      },
      {
        title: "Knee Cut Pass Tips",
        videoId: "3Bp4WzcPJIU",
      },
      {
        title: "Over-Under Pass Strategy",
        videoId: "3Bp4WzcPJIU",
      },
    ],
  },
];

const findVideo = (videoId) => {
  for (const submenu of submenus) {
    const video = submenu.videos.find((v) => v.videoId === v.videoId);
    if (video) return video;
  }
  return null;
};

export default function VideoPage({ params }) {
  const { videoId } = params;
  const video = findVideo(videoId);

  if (!video) {
    return (
      <div className={styles.videosPage}>
        <h2>視頻不存在</h2>
        <Link href="/videos" className={styles.moreButton}>
          返回列表
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.videosPage}>
      <h1>{video.title}</h1>
      <div className={styles.videoPlayer}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <Link href="/videos" className={styles.moreButton}>
        返回列表
      </Link>
    </div>
  );
}
