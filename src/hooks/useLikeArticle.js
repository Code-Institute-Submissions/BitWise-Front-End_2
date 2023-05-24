import { axiosRes } from "../api/axiosDefaults";

const useLikeArticle = (id, likeId, likesCount, setArticles) => {
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("likes/", { article: id });
      setArticles((prevArticles) => ({
        ...prevArticles,
        results: prevArticles.results.map((article) => {
          return article.id === id
            ? {
                ...article,
                likes_count: article.likes_count + 1,
                like_id: data.id,
              }
            : article;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`likes/${likeId}`);
      setArticles((prevArticles) => ({
        ...prevArticles,
        results: prevArticles.results.map((article) => {
          return article.id === id
            ? {
                ...article,
                likes_count: article.likes_count - 1,
                like_id: null,
              }
            : article;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return { handleLike, handleUnlike };
};

export default useLikeArticle;
