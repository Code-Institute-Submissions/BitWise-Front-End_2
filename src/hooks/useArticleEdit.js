import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useArticleEdit = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const [articleData, setArticleData] = useState({
    article_title: "",
    article_content: "",
    primary_language: "",
  });

  const { article_title, article_content, primary_language } = articleData;

  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/${id}/`);
        const { article_title, article_content, primary_language, is_owner } =
          data;

        if (is_owner) {
          setArticleData({
            article_title,
            article_content,
            primary_language,
          });
        } else {
          navigate("/");
        }
      } catch (err) {
        // add console log to for dev testing if neccessary
      }
    };

    handleMount();
  }, [navigate, id]);

  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("article_title", article_title);
    formData.append("article_content", article_content);
    formData.append("primary_language", primary_language);

    try {
      await axiosReq.put(`/articles/${id}/`, formData);
      navigate(`/article/${id}`);
      setSuccessToast("Article Updated");
    } catch (err) {
      // add console log to for dev testing if neccessary
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      setFailToast(
        `Unable to update article (status: ${err.response?.status})`
      );
    }
  };

  return {
    articleData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useArticleEdit;
