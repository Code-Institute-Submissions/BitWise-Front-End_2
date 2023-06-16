import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useCommentDelete = (id, setArticle, setComments) => {
  const [error, setError] = useState(null);
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count - 1,
            current_user_comments_count:
              prevArticle.results[0].current_user_comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setSuccessToast("Comment Deleted");
    } catch (err) {
      setError(err);
      setFailToast(
        `Unable to delete comment (status: ${err.response?.status})`
      );
    }
  };

  return { handleDelete, error };
};

export default useCommentDelete;
