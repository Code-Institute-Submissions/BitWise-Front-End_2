import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

import { axiosRes } from "../api/axiosDefaults";

const useProfilePasswordEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    if (currentUser?.profile_id?.toString() !== id) {
      navigate("/");
    }

    return () => controller.abort();
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
      setSuccessToast("Password Updated");
    } catch (err) {
      setErrors(err.response?.data);
      setFailToast(
        `Unable to update password (status: ${err.response?.status})`
      );
    }
  };

  return {
    new_password1,
    new_password2,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useProfilePasswordEdit;
