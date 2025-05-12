"use client";
import { useEffect, useState } from "react";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function Category({ category }) {
  const [videoIds, setVideoIds] = useState([]);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    // fetch categories from database to show on the navbar --Gavin
    async function fetchVideoIds() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${category}`
        );
        const body = await response.json();
        const array = [];

        for (let i = 0; i < body.length; i++) {
          array.push(body[i].youtube_id);
        }

        setVideoIds(array);
      } catch (error) {}
    }
    fetchVideoIds();
  }, []);

  useEffect(() => {
    async function fetchVideosData() {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );
        const body = await response.json();

        const array = body.items.map((item) => ({
          videoId: item.id,
          title: item.snippet.title,
        }));

        setVideosData(array);
      } catch (error) {}
    }
    fetchVideosData();
  }, [videoIds]);

  console.log(videosData);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-50 justify-items-center gap-30 p-10">
      {videosData.map((element) => (
        <li
          key={element.videoId}
          className="p-5 rounded-2xl bg-white/10 shadow-sm shadow-white/60 transition duration-200 ease-in-out hover:scale-103"
        >
          <a href={``}>
            <h1 className="text-center text-2xl md:text-3xl font-bold w-full h-25 mb-5 text-clip">
              {element.title}
            </h1>
            <img
              src={`https://img.youtube.com/vi/${element.videoId}/0.jpg`}
              className="rounded-2xl"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
