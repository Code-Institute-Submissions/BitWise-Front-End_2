import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import languageOptions from "../constants/languageOptions";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useArticleCreate = () => {
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    language: "",
  });

  const { title, content, language } = articleData;
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setIsLoading(true);
      const { data } = await axiosReq.post("/articles/", formData);
      navigate(`/article/${data.id}`);
      setSuccessToast("Article Added");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        setFailToast(`Unable to add article (status: ${err.response?.status})`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    content,
    language,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    languageOptions,
  };
};

export default useArticleCreate;
