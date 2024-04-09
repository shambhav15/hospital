// 'use clinet';
import { Button, Flex, Text } from "@radix-ui/themes";
// import Carousel from "./component/Carousel";
import Link from "next/link";
import prisma from "../../prisma/client";
import { EmblaCarousel } from "./component/EmblaCarousel";

export default async function Home() {
  // const hospitals = await prisma.hospital.findMany({
  //   orderBy: {
  //     H_No: "asc",
  //   },
  // });

  return (
    <>
      <EmblaCarousel  />
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
