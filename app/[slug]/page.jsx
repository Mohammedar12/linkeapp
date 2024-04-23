"use client";
import { UserAuthForm } from "@/components/Auth/login";
import { Button } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate, Transition } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import bnnar from "@/assets/9114923 1.png";
import bnnar2 from "@/assets/bann2.png";
import avatar from "@/assets/avatar.jpg";

import { FaInstagram, FaWhatsapp, FaTelegram } from "react-icons/fa";

import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "@/components/ui/typewriter-effect";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Login() {
  const params = useParams();

  const [data, setData] = useState();

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.base_url}/sites/site/${params.slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const container = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    getUser();
    console.log(params.slug);
  }, []);

  const name = [
    {
      text: "Design",
    },
    {
      text: "Agency.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const des = `    Custom templates for your brand. Engaging designs for websites,
emails, and social media, ensuring seamless user experiences..
`;

  return (
    <div className="flex flex-col">
      {data?.status !== false ? (
        <>
          <div className="head relative">
            <Image
              src={bnnar}
              className=" max-w-full shadow-md "
              style={{
                height: "auto",
              }}
            />
            <Image
              src={avatar}
              className=" shadow-lg w-[100px] rounded-[50%] translate-x-[50%]  absolute right-[50%] -bottom-[43px] "
              style={{
                height: "auto",
              }}
            />
          </div>
          <div className="about mt-16 text-center ">
            <div>
              <h3>
                <TypewriterEffect words={name} />
              </h3>

              <div>
                <TextGenerateEffect words={des} />
              </div>
            </div>
            <div className="flex justify-center my-3">
              <Button className="!min-w-[unset]">
                <FaInstagram className="text-black" />
              </Button>
              <Button className="!min-w-[unset]">
                <FaWhatsapp className="text-black" />
              </Button>
              <Button className="!min-w-[unset]">
                <FaTelegram className="text-black" />
              </Button>
            </div>
          </div>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="links flex flex-col gap-5 my-10 items-center text-center"
          >
            {data?.links?.map((link) => (
              <motion.li
                key={link._id}
                variants={item}
                className="!bg-[#ffb85c] w-[90%] rounded-md"
              >
                <Button className="!text-black w-[100%]" href={link.link}>
                  {link.link}
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        </>
      ) : (
        notFound()
        // ""
      )}
    </div>
  );
}
