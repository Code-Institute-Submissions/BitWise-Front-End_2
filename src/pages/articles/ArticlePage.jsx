import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: article }] = await Promise.all([
          axiosReq.get(`/articles/${id}`),
        ]);
        setArticle({ results: [article] });
        console.log(article);
      } catch (err) {}
    };

    handleMount();
  }, []);

  return (
    <Flex p={8} flex={1} align={"center"} justify={"center"}>
      <ArticleCard
        {...article.results[0]}
        setArticles={setArticle}
        articlePage
      />
    </Flex>
  );
};

export default ArticlePage;
