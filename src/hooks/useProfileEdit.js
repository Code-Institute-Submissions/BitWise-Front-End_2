import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

const useProfileEdit = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    bio: "",
    image: "",
  });

  const { bio, image } = profileData;

  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const getProfileData = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`, {
            signal: controller.signal,
          });
          const { bio, image } = data;
          setProfileData({
            bio,
            image,
          });
          setLoaded(true);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoaded(true);
        }
      } else {
        navigate("/");
      }
    };

    setLoaded(false);
    getProfileData();

    return () => controller.abort();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      navigate(`/profile/${id}/`);

      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        profile_image: data.image,
      }));
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return {
    profileData,
    imageFile,
    error,
    loaded,
    handleChange,
    handleSubmit,
  };
};

export default useProfileEdit;
