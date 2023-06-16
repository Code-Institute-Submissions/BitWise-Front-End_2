import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { FilterProvider } from "./contexts/FilterContext";
import { ProfileDataProvider } from "./contexts/ProfilesDataContext";
import { ArticleFollowProvider } from "./contexts/ArticleFollowUpdate";
import { AlertToastProvider } from "./contexts/AlertToasts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CurrentUserProvider>
          <ProfileDataProvider>
            <FilterProvider>
              <ArticleFollowProvider>
                <AlertToastProvider>
                  <App />
                </AlertToastProvider>
              </ArticleFollowProvider>
            </FilterProvider>
          </ProfileDataProvider>
        </CurrentUserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
