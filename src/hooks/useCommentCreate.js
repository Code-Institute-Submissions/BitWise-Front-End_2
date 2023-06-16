import { useState, useEffect } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useCommentCreate = (article, setArticle, setComments) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  useEffect(() => {
    setErrors({});
  }, [body]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        article,
        body,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count + 1,
            current_user_comments_count:
              prevArticle.results[0].current_user_comments_count + 1,
          },
        ],
      }));
      setBody("");
      setSuccessToast("Comment Added");
    } catch (err) {
      setErrors(err.response?.data);
      setFailToast(`Unable to add comment (status: ${err.response?.status})`);
    }
  };

  return { body, errors, handleChange, handleSubmit };
};

export default useCommentCreate;
