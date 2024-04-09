"use client";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HospitalApi from "../../hospitalData";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Card from "./Card";
import Link from "next/link";

type Hospital = {
  Hospital_Name: string;
  Image: string;
};

import hospitalsData from "../../hospitalData";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 2000,
      stopOnUserInteraction: true,
    }),
  ]);

  return (
    <>
      <div className="overflow-hidden object-contain" ref={emblaRef}>
        <div className="flex">
          {hospitalsData.map((hospital, index) => (
            <div key={index} className="w-1/5 flex-shrink-0">
              <Link href={`/${hospital.H_No}/book`}>
                <Image
                  className="rounded-lg object-cover h-[200px]"
                  width={200}
                  height={200}
                  src={hospital.Image}
                  alt={hospital.Hospital_Name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
