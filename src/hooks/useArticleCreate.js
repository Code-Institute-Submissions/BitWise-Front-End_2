import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import languageOptions from "../constants/languageOptions";

const useArticleCreate = () => {
  const [errors, setErrors] = useState({});

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    language: "",
    github_link: "",
  });

  const { title, content, language, github_link } = articleData;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("article_title", title);
    formData.append("article_content", content);
    formData.append("primary_language", language);
    formData.append("github_link", github_link);

    try {
      const { data } = await axiosReq.post("/articles/", formData);
      navigate(`/article/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    title,
    content,
    language,
    github_link,
    errors,
    handleChange,
    handleSubmit,
    languageOptions,
  };
};

export default useArticleCreate;
