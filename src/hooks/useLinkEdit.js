import { useState, useEffect } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useLinkEdit = (
  id,
  link_title,
  link_brief,
  link_url,
  setLinks,
  setShowEditLink
) => {
  const [linkData, setLinkData] = useState({
    updated_link_brief: link_brief,
    updated_link_url: link_url,
  });
  const { updated_link_brief, updated_link_url } = linkData;

  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

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

    formData.append("link_brief", updated_link_brief);
    formData.append("link_url", updated_link_url);

    try {
      await axiosRes.put(`/links/${id}/`, formData);

      setLinks((prevLinks) => ({
        ...prevLinks,
        results: prevLinks.results.map((link) => {
          return link.id === id
            ? {
                ...link,
                link_title: link_title,
                link_brief: updated_link_brief,
                link_url: updated_link_url,
              }
            : link;
        }),
      }));

      setShowEditLink(false);
      setSuccessToast(`You have updated the link: ${link_title}`);
    } catch (err) {
      setFailToast(
        `Unable to update the link (status: ${err.response?.status})`
      );
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    updated_link_brief,
    updated_link_url,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLinkEdit;
