import { BellIcon } from "@heroicons/react/16/solid";
import ICON_DISCORD from "../assets/discord.png";
import ICON_TWITTER from "../assets/twitter.png";
import ICON_YOUTUBE from "../assets/youtube.png";
import ICON_FACEBOOK from "../assets/facebook.png";
import ICON_INSTAGRAM from "../assets/instagram.png";
import ICON_REDDIT from "../assets/reddit.png";
import ICON_TELEGRAM from "../assets/telegram.png";

import React from "react";

const list = [
  { title: "Community" },
  { title: "About Us" },
  { title: "Products" },
  { title: "Business" },
  { title: "Service" },
];

const Footer = () => {
  return (
    <footer className="mt-12 flex justify-between">
      <section className="w-1/6">
        <span>Community</span>
        <div className="flex flex-col mt-4">
          <div className="flex space-x-5">
            <img src={ICON_DISCORD} alt="icon_discord" className="size-7" />
            <img src={ICON_TWITTER} alt="icon_discord" className="size-7" />
            <img src={ICON_YOUTUBE} alt="icon_discord" className="size-7" />
            <img src={ICON_FACEBOOK} alt="icon_discord" className="size-7" />
          </div>
          <div className="flex space-x-5 mt-4">
            <img src={ICON_INSTAGRAM} alt="icon_discord" className="size-7" />
            <img src={ICON_DISCORD} alt="icon_discord" className="size-7" />
            <img src={ICON_REDDIT} alt="icon_discord" className="size-7" />
            <img src={ICON_TELEGRAM} alt="icon_discord" className="size-7" />
          </div>
        </div>
      </section>
      <section className="w-1/6">
        <span>About us</span>
        <div className="flex"></div>
      </section>
      <section className="w-1/6">
        <span>Products</span>
      </section>
      <section className="w-1/6">
        <span>Business</span>
      </section>
      <section className="w-1/6">
        <span>Service</span>
      </section>
    </footer>
  );
};

export default Footer;
