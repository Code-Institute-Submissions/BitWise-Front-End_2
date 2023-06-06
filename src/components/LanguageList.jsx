import React from "react";
import useLanguages from "../hooks/useLanguages";
import { Spinner, Text } from "@chakra-ui/react";

const LanguageList = (props) => {
  const { endpoint } = props;
  const { languages, setLanguages, error, loaded } = useLanguages(endpoint);

  return (
    <>
      {loaded ? (
        languages.results.length ? (
          languages.results.map((language) => (
            <Text key={language.id}>{language.language}</Text>
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
