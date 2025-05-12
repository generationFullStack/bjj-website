// src/app/page.js
import BjjGymBanner from "@/components/BjjGymBanner";
import Image from "next/image";
import Link from "next/link"; // 引入 Link 組件，用於跳轉

export default function Home() {
  return (
    <>
      <section className="home"></section>
      <div>
        <h2 className="myH2">Discover Brazilian Jiu-Jitsu (BJJ)</h2>
        <p className="myP">
          Brazilian Jiu-Jitsu (BJJ) is a martial art and combat sport that
          focuses on grappling and ground fighting. It empowers individuals of
          all sizes by teaching techniques to control and submit opponents
          through leverage and skill, rather than brute strength. Whether you
          are looking to improve your fitness, learn self-defense, or compete at
          the highest levels, BJJ offers a transformative journey for both body
          and mind.
        </p>
        <p className="myP">
          At BJJ Network, we are dedicated to helping you master this art with
          expert guidance, a supportive community, and world-class training
          resources. Join us to start your BJJ journey today!
        </p>
      </div>
      <BjjGymBanner />
    </>
  );
}
