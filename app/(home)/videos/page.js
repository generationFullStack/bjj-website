import Link from "next/link";
import styles from "./Videos.module.css";

export default function Videos() {
  // 子選單數據，嵌入 YouTube 影片
  const submenus = [
    {
      title: "Submissions",
      videos: [
        {
          title: "Armbar Tutorial",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Triangle Choke Basics",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Rear Naked Choke Guide",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
      ],
      moreLink: "/videos/submissions",
    },
    {
      title: "Guard Passing",
      videos: [
        {
          title: "Toreando Pass Techniques",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Knee Cut Pass Tips",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Over-Under Pass Strategy",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
      ],
      moreLink: "/videos/guard-passing",
    },
    {
      title: "Defense",
      videos: [
        {
          title: "Posture Control Basics",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Submission Escapes Guide",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Guard Retention Techniques",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
      ],
      moreLink: "/videos/defense",
    },
    {
      title: "Takedown",
      videos: [
        {
          title: "Single Leg Takedown Tutorial",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Double Leg Takedown Basics",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
        {
          title: "Ankle Pick Techniques",
          embed: (
            <iframe
              src="https://www.youtube.com/embed/3Bp4WzcPJIU"
              title="Armbar Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ),
        },
      ],
      moreLink: "/videos/takedown",
    },
  ];

  return (
    <div className={styles.videosPage}>
      {submenus.map((submenu, index) => (
        <div key={index} className={styles.submenu}>
          <h2>{submenu.title}</h2>
          <div className={styles.videoList}>
            {submenu.videos.map((video, videoIndex) => (
              <div key={videoIndex} className={styles.videoCard}>
                {video.embed ? (
                  video.embed
                ) : (
                  <img src={video.thumbnail} alt={video.title} />
                )}
                <p>{video.title}</p>
              </div>
            ))}
          </div>
          <Link href={submenu.moreLink} className={styles.moreButton}>
            more
          </Link>
        </div>
      ))}
    </div>
  );
}
