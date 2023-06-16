import React, { useState } from "react";
import useLanguages from "../hooks/useLanguages";
import { Spinner, Text, Button } from "@chakra-ui/react";
import LanguageCard from "./LanguageCard";
import LanguageCreate from "./LanguageCreate";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import NoResults from "./NoResults";

const LanguageList = (props) => {
  const { profile, endpoint } = props;
  const { languages, setLanguages, error, loaded } = useLanguages(endpoint);
  const [addLanguage, setAddLanguage] = useState(false);
  const { id } = useParams();
  const currentUser = useCurrentUser();

  return (
    <>
      {id == currentUser?.profile_id && (
        <Button
          w={155}
          colorScheme={addLanguage ? "gray" : "purple"}
          mb={5}
          onClick={() => setAddLanguage(!addLanguage)}
        >
          {addLanguage ? "Close" : "Add Language"}
        </Button>
      )}
      {addLanguage && (
        <LanguageCreate
          setAddLanguage={setAddLanguage}
          profile={profile}
          setLanguages={setLanguages}
        />
      )}

      {loaded ? (
        languages.results.length ? (
          languages.results.map((language) => (
            <LanguageCard
              setLanguages={setLanguages}
              key={language.id}
              {...language}
            />
          ))
        ) : (
          <NoResults text={"No Languages Recorded by this profile!"} />
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LanguageList;
