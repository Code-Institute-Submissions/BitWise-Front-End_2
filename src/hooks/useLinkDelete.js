import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useLinkDelete = (id, setLinks) => {
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.delete(`/links/${id}/`);

      setLinks((prevLinks) => ({
        ...prevLinks,
        results: prevLinks.results.filter((link) => link.id !== id),
      }));

      setSuccessToast("You have deleted a link");
    } catch (err) {
      setFailToast(`Unable to delete link (status: ${err.response?.status})`);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    handleDelete,
    errors,
  };
};

export default useLinkDelete;
