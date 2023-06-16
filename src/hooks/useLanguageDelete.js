import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

import { useSetProfileData } from "../contexts/ProfilesDataContext";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useLanguageDelete = (id, setLanguages) => {
  const setProfile = useSetProfileData();

  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.delete(`/languages/${id}/`);

      setLanguages((prevLanguages) => ({
        ...prevLanguages,
        results: prevLanguages.results.filter((language) => language.id !== id),
      }));

      setProfile((prevProfile) => {
        const updatedPageProfile = {
          ...prevProfile.pageProfile.results[0],
          languages_count:
            prevProfile.pageProfile.results[0].languages_count - 1,
        };

        return {
          ...prevProfile,
          languages_count: prevProfile.languages_count - 1,
          pageProfile: {
            results: [updatedPageProfile],
          },
        };
      });
      setSuccessToast("You have deleted a language");
    } catch (err) {
      setFailToast(
        `Unable to delete language (status: ${err.response?.status})`
      );
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

export default useLanguageDelete;
