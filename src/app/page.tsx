"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { EmblaCarousel } from "./component/EmblaCarousel";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get("https://medhive-backend.vercel.app/News");
      const data = await res.data;
      console.log(data);
    };
    fetchNews();
  }, []);

  return (
    <>
      <EmblaCarousel />
      <Flex className="max-w-20" direction="column" gap="2">
        {/* <Button className="outline-none">
          <Link href={`/Book/`}>Book</Link>
        </Button> */}
      </Flex>
      {/* <ul>
        {hospitals?.map((hospital) => (
          <>
            <li key={hospital.H_No}>{hospital.Hospital_Name}</li>
          </>
        ))}
      </ul> */}
    </>
  );
}
