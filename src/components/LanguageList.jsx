import React from "react";
import useLanguages from "../hooks/useLanguages";
import { Spinner, Text } from "@chakra-ui/react";
import LanguageCard from "./LanguageCard";
import LanguageCreate from "./LanguageCreate";

const LanguageList = (props) => {
  const { profile, endpoint } = props;
  const { languages, setLanguages, error, loaded } = useLanguages(endpoint);

  return (
    <>
      <LanguageCreate profile={profile} setLanguages={setLanguages} />

      {loaded ? (
        languages.results.length ? (
          languages.results.map((language) => (
            <LanguageCard key={language.id} {...language} />
          ))
        ) : (
          <Text>No Languages Recorded</Text>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LanguageList;
