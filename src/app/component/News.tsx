/* eslint-disable @next/next/no-img-element */
import { Box, Button, Flex, Grid, Table, Text } from "@radix-ui/themes";
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
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

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

  const toggleExpand = (index: number) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Table.Root variant="surface" className="p-10">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Some Latest News</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {news?.slice(0, 10).map((article, index) => (
            <Table.Row
              key={index}
              className={`${
                expandedArticle === index
                  ? "h-auto max-h-[500px] transition-[max-height] duration-300 ease-in-out"
                  : "h-[50px] max-h-[50px] transition-[max-height] duration-300 ease-in-out overflow-hidden"
              }`}
            >
              <Table.Cell>
                <Flex className="gap-4 justify-between items-center">
                  <Box>
                    <Text className="font-bold">{article.title}</Text>
                    {expandedArticle === index && (
                      <div className="my-4">
                        <Text
                          className="font-semibold"
                          style={{ font: "unset" }}
                        >
                          {article.description}
                        </Text>
                      </div>
                    )}
                  </Box>
                  <button
                    className="hover:scale-110 transition-all duration-300 hover:text-red-600 font-semibold ml-2"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedArticle === index ? (
                      <Link target="blank" href={article.url}>
                        Read more
                      </Link>
                    ) : (
                      "Expand"
                    )}
                  </button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default News;
