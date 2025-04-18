"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import hero from "@/assets/hero3.png"
import create from "@/assets/CreateHero.png"
import comment from "@/assets/CommentHero.png"

import Image from "next/image";

const slides = [
  "/assets/hero3.png",
  "/assets/CreateHero.png",
  "/assets/CommentHero.png",
];

export default function AutoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      opts={{ startIndex: activeIndex }}
      className="w-[90%] max-w-xl mx-auto "
    >
      <CarouselContent>
        {slides.map((item, index) => (
          <CarouselItem key={index} className="flex justify-center items-center h-70 text-2xl font-bold bg-gray-100">
            <Image src={item} alt="image" height={500} width={600} className="rounded-2xl"/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
  <CarouselNext />
    </Carousel>
  );
}
