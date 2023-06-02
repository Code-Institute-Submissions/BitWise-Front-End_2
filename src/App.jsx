import { Routes, Route } from "react-router-dom";
import { Grid, GridItem, Show, Box, Card } from "@chakra-ui/react";
import "./api/axiosDefaults";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ErrorPage from "./pages/errors/ErrorPage";
import ArticleCreateForm from "./pages/articles/ArticleCreateForm";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticleEditForm from "./pages/articles/ArticleEditForm";
import ProfilesListPage from "./pages/profiles/ProfilesListPage";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SideGrid from "./components/SideGrid";
import ProfilePage from "./pages/profiles/ProfilePage";
import LoggedIn from "./components/LoggedIn";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <>
      <Box position="fixed" top={0} w="100vw" zIndex={5} area="nav">
        <NavBar />
      </Box>

      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem minH={"100vh"} zIndex={0} pt="70px" area="aside">
            <Card pt={30} px={5} h="100%">
              <SideGrid />
            </Card>
          </GridItem>
        </Show>
        <GridItem pt="80px" area="main">
          <Show below="lg">
            <Box pt="5" pl="5">
              <LoggedIn />
            </Box>
          </Show>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <HomePage message={"No Results Fount! Check filters."} />
              }
            />
            <Route
              exact
              path="/feed/"
              element={
                <HomePage
                  message={
                    "No Results Found! Ensure you are following at least one profile and check your filters."
                  }
                  routeFilter={`owner__followed__owner__profile=${profile_id}`}
                />
              }
            />
            <Route exact path="/login/" element={<LoginPage />} />
            <Route exact path="/register/" element={<RegisterPage />} />
            <Route
              exact
              path="/article/create/"
              element={<ArticleCreateForm />}
            />
            <Route
              exact
              path="/article/edit/:id/"
              element={<ArticleEditForm />}
            />
            <Route exact path="/article/:id/" element={<ArticlePage />} />
            <Route
              exact
              path="/profiles/"
              element={
                <ProfilesListPage
                  message={"No Results Found! Check filters."}
                />
              }
            />
            <Route exact path="/profile/:id" element={<ProfilePage />} />
            <Route
              exact
              path="/profile/edit/:id"
              element={<ProfileEditForm />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GridItem>
      </Grid>
      <ScrollToTopButton />
    </>
  );
}

export default App;
