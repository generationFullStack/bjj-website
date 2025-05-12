"use client";
import { useEffect, useState } from "react";

export default function Category({ category }) {
  let categoryId;
  switch (category) {
    case "submissions":
      categoryId = 20;
      break;

    case "guard%20passing":
      categoryId = 19;
      break;

    case "defense":
      categoryId = 22;
      break;

    case "takedown":
      categoryId = 33;
      break;
  }

  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // fetch categories from database to show on the navbar --Gavin
    async function fetchVideos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${categoryId}`
        );
        const body = await response.json();
        setVideoList(body);
      } catch (error) {}
    }
    fetchVideos();
  }, []);

  console.log(videoList);
  let object = {};

  for (let i = 0; i < videoList.length; i++) {
    let categoryName = videoList[i]["name"];
    object.categoryName.push(videoList[i]["youtube_id"]);
  }

  console.log(object);

  return <div>{category}</div>;
}
