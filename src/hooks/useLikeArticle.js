import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useLikeArticle = (id, likeId, likesCount, setArticles, article_title) => {
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

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
      setSuccessToast(`You liked the article titled: ${article_title}`);
    } catch (err) {
      setFailToast(
        `Unable to like this article (status: ${err.response?.status})`
      );
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
      setSuccessToast(`You unliked the article titled: ${article_title}`);
    } catch (err) {
      setFailToast(
        `Unable to unlike this article (status: ${err.response?.status})`
      );
    }
  };

  return { handleLike, handleUnlike };
};

export default useLikeArticle;
