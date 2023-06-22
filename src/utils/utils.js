import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    const updatedResults = data.results.reduce((acc, cur) => {
      return acc.some((accResult) => accResult.id === cur.id)
        ? acc
        : [...acc, cur];
    }, resource.results);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: updatedResults,
    }));

    setTimeout(() => {
      const container = document.getElementById("article-grid-container");
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  } catch (err) {}
};

export const fetchMoreProfileData = async (resource, setProfileData) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    const updatedResults = data.results.reduce((acc, cur) => {
      return acc.some((accResult) => accResult.id === cur.id)
        ? acc
        : [...acc, cur];
    }, resource.results);
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      searchPageProfiles: {
        ...prevProfileData.searchPageProfiles,
        next: data.next,
        results: updatedResults,
      },
    }));

    setTimeout(() => {
      const container = document.getElementById("article-grid-container");
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  } catch (err) {}
};
