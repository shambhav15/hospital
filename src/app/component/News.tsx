/* eslint-disable @next/next/no-img-element */
import { Box, Button, Grid, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type Articles = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type NewsItem = {
  status: string;
  totalResults: number;
  articles: Articles[];
};
const News = () => {
  const [news, setNews] = useState<Articles[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get<NewsItem>(
          "https://medhive-backend.vercel.app/News"
        );
        setNews(res.data.articles);
        console.log("News fetched:", res.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  return (
    <Grid
      mt={"9"}
      style={{
        gap: 20,
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {news.map((article, index) => (
        <Box key={index} style={{ padding: 20, border: "1px solid #ccc" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {article.title}
          </Text>
          <Text style={{ fontSize: 16 }}>{article.description}</Text>
          <Text style={{ fontSize: 12 }}>
            {new Date(article.publishedAt).toDateString()}
          </Text>
          <Button>
            <Link href={article.url} target="blank">
              Read More
            </Link>
          </Button>

          {article.urlToImage && (
            <img src={article.urlToImage} width={100} height={100} alt="" />
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default News;
