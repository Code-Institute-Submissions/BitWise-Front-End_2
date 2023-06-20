import { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";
import { useParams } from "react-router-dom";

const useRecommendCreate = () => {
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const { id } = useParams();

  const [recommendData, setRecommendData] = useState({
    recommended_to: "",
  });

  const { recommended_to } = recommendData;

  const handleChange = (event) => {
    setRecommendData({
      ...recommendData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("article", parseInt(id));
    formData.append("recommended_to", recommended_to);

    try {
      const { data } = await axiosReq.post("/recomendations/add/", formData);
      setSuccessToast("Recommended Succesfully");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        if (
          err.response?.data.non_field_errors &&
          err.response.data.non_field_errors.includes(
            "The fields article, recommended_to must make a unique set."
          )
        ) {
          setFailToast(
            "This profile has already had this article recommended."
          );
        } else {
          setFailToast(
            `Unable to recommend article (status: ${err.response?.status})`
          );
        }
      }
    }
  };

  return {
    recommended_to,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useRecommendCreate;
