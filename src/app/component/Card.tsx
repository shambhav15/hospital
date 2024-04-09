// React-Next modules import
"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  Hospital_Name: string;
  Imagee: string;
};

// this card component will be called by the carousel component each time for the top hospitals
export default function Card({ Imagee, Hospital_Name }: Props) {
  return (
    <div className="card w-[28rem] h-[20rem] ">
      <div>
        <Link href={`/pages/Hospitals/${Hospital_Name}`}>
          <Image
            src={Imagee}
            alt="image"
            className=" h-[16rem] rounded-xl hover:scale-110 transition-all ease-in-out object-cover overflow-x-hidden "
            width={200}
            height={400}
          />
        </Link>
        <div className="flex justify-center text-base mt-4">
          <p className="text-black">{Hospital_Name}</p>
        </div>
      </div>
    </div>
  );
}
