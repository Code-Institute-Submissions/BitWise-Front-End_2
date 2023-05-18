import axios from "axios";

const handleSignOut = (setCurrentUser, navigate) => {
  axios
    .post("dj-rest-auth/logout/")
    .then((response) => {
      setCurrentUser(null);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default handleSignOut;