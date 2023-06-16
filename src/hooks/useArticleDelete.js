import React, { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";
import { useNavigate } from "react-router-dom";

const useArticleDelete = (pk, setArticles) => {
  const [error, setError] = useState(null);
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axiosRes.delete(`/articles/${pk}/`);
      if (
        window.location.pathname === "" ||
        window.location.pathname === "/" ||
        window.location.pathname.startsWith("/profile/")
      ) {
        setArticles((prevArticles) => ({
          ...prevArticles,
          results: prevArticles.results.filter((article) => article.id !== pk),
        }));
      } else {
        navigate("/");
      }
      setSuccessToast("Article Deleted");
      setIsOpen(false);
    } catch (err) {
      setError(err);
      setFailToast(
        `Unable to delete article (status: ${err.response?.status})`
      );
      setIsOpen(false);
    }
  };

  return {
    handleDelete,
    onClose,
    handleDeleteConfirmation,
    error,
    isOpen,
  };
};

export default useArticleDelete;
