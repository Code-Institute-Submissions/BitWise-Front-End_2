import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

import { useSetProfileData } from "../contexts/ProfilesDataContext";

const useLanguageDelete = (id, setLanguages) => {
  const setProfile = useSetProfileData();

  const [errors, setErrors] = useState({});

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
    } catch (err) {
      console.log(err.response?.data);
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
