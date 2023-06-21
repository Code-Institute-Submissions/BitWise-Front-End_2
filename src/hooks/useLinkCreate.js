import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";
import { useParams } from "react-router-dom";

const useLinkCreate = (article, setLinks, setAddLink) => {
  const [linkData, setLinkData] = useState({
    link_title: "",
    link_brief: "",
    link_url: "",
  });
  const { link_title, link_brief, link_url } = linkData;

  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const article_id = article.results[0].id;

  useEffect(() => {
    setErrors({});
  }, [linkData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLinkData({
      ...linkData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("article", parseInt(article_id));
    formData.append("link_title", link_title);
    formData.append("link_brief", link_brief);
    formData.append("link_url", `https://${link_url}.com`);

    try {
      const { data } = await axiosReq.post("/links/", formData);

      setLinks((prevLinks) => ({
        ...prevLinks,
        results: [data, ...prevLinks.results],
      }));

      setAddLink(false);
      setSuccessToast(`You have added a new link: ${link_title}`);
    } catch (err) {
      setFailToast(`Unable to add link (status: ${err.response?.status})`);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    link_title,
    link_brief,
    link_url,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLinkCreate;
