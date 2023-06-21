import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

import { useSetProfileData } from "../contexts/ProfilesDataContext";

const useRecommendDelete = (id) => {
  const [error, setError] = useState(null);
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const [isOpen, setIsOpen] = useState(false);

  const setProfileData = useSetProfileData();

  const handleDelete = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axiosRes.delete(`/recomendations/remove/${id}/`);

      setProfileData((prevState) => ({
        ...prevState,

        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => ({
            ...profile,
            received_recommendations: profile.received_recommendations.filter(
              (recommendation) => recommendation.id !== id
            ),
          })),
        },
      }));

      setSuccessToast("Recommendation Removed");
      setIsOpen(false);
    } catch (err) {
      setError(err);
      setFailToast(
        `Unable to delete recommendation (status: ${err.response?.status})`
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

export default useRecommendDelete;
