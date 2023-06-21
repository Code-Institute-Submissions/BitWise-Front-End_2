import React from "react";
import NoResults from "./NoResults";
import RecommendedCard from "./RecommendedCard";

const RecommendedList = (props) => {
  const { received_recommendations } = props;

  return (
    <>
      {received_recommendations.length ? (
        received_recommendations.map((recommendation) => (
          <RecommendedCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))
      ) : (
        <NoResults text={"No Recommended Articles Found!"} />
      )}
    </>
  );
};

export default RecommendedList;
