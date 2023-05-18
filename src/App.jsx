import { Outlet, Routes, Route } from 'react-router-dom';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import './api/axiosDefaults';

import NavBar from "./components/NavBar";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import FeedPage from './pages/FeedPage';


function App() {
  return (
    <Grid templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`
      }}>
      <GridItem area='nav'><NavBar /></GridItem>

      <Show above='lg'>
        <GridItem bg='navy' area='aside'> Profile Menu</GridItem>
      </Show>
      <GridItem area='main' >

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login/" element={<LoginPage />} />
          <Route exact path="/register/" element={<RegisterPage />} />
          <Route exact path="/feed/" element={<FeedPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

      </GridItem>
    </Grid>
  );
};

export default App
