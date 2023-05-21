import { Routes, Route } from "react-router-dom";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./api/axiosDefaults";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import FeedPage from "./pages/FeedPage";
import ArticleCreateForm from "./pages/articles/ArticleCreateForm";
import ArticlePage from "./pages/articles/ArticlePage";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem position="fixed" top={0} w="100vw" zIndex={5} area="nav">
        <NavBar />
      </GridItem>

      <Show above="lg">
        <GridItem zIndex={0} pt="100px" height="100vh" bg="navy" area="aside">
          {" "}
          Profile Menu
        </GridItem>
      </Show>
      <GridItem pt="100px" area="main">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login/" element={<LoginPage />} />
          <Route exact path="/register/" element={<RegisterPage />} />
          <Route exact path="/feed/" element={<FeedPage />} />
          <Route
            exact
            path="/article/create/"
            element={<ArticleCreateForm />}
          />
          <Route exact path="/article/:id/" element={<ArticlePage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
