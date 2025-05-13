"use client";

import BjjGymBanner from "@/components/BjjGymBanner";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player("youtube-player", {
          videoId: "SXtu_8K2osk",
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: "SXtu_8K2osk",
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
      />

      <section className="home flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          Welcome to <br /> BJJ.JPG
        </h1>
      </section>
      <div></div>
      {/* 視頻和 BjjGymBanner 垂直排列 */}
      <section className="banner-section py-10 bg-[#111] flex flex-col items-center gap-10">
        {/* 視頻同文字嘅水平容器 */}
        <div className="video-text-container w-full max-w-7xl flex flex-col md:flex-row items-start justify-center gap-10">
          {/* 視頻 */}
          <div className="video-container w-full max-w-4xl relative">
            <div
              id="youtube-player"
              className="w-full rounded-lg aspect-video pointer-events-none"
            />
            <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
          </div>
          {/* 文字 */}
          <div className="text-container w-full max-w-md text-white p-6">
            <p className="text-3xl leading-relaxed">
              Its techniques and strategies are based on in-depth research into
              ground fighting. Jiu-jitsu practitioners excel at bringing
              opponents to the ground and then gaining dominant positions.
              Brazilian Jiu-Jitsu techniques primarily focus on positional
              control and various submission holds.
            </p>
          </div>
        </div>
        {/* BjjGymBanner 全寬 */}
        <div className="banner-container w-full">
          <BjjGymBanner />
        </div>
      </section>
    </>
  );
}
