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
    github_link: "",
  });

  const { article_title, article_content, primary_language, github_link } =
    articleData;

  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/${id}/`);
        const {
          article_title,
          article_content,
          primary_language,
          github_link,
          is_owner,
        } = data;

        if (is_owner) {
          setArticleData({
            article_title,
            article_content,
            primary_language,
            github_link,
          });
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
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
    formData.append("github_link", github_link);

    try {
      await axiosReq.put(`/articles/${id}/`, formData);
      navigate(`/article/${id}`);
      setSuccessToast("Article Updated");
    } catch (err) {
      console.log(err);
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
