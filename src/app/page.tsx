"use client";
import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { EmblaCarousel } from "./component/EmblaCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import News from "./component/News";

export default function Home() {
  return (
    <>
      <Box mb={"9"}>
        <EmblaCarousel />
      </Box>
      <News />
    </>
  );
}
