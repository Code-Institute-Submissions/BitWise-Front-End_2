import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

const useCommentCreate = (article, setArticle, setComments) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

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
          },
        ],
      }));
      setBody("");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return { body, errors, handleChange, handleSubmit };
};

export default useCommentCreate;
