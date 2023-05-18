import { Grid, GridItem, Show } from "@chakra-ui/react";


function App() {
  return (
    <>

      <Grid templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`
        }}>
          <GridItem area='nav' bg="red">Add Navbar</GridItem>

          <Show above='lg'>
            <GridItem area='aside' bg="green">Sign Up Profile Menu</GridItem>
          </Show>
          <GridItem area='main' bg="blue" p={5}>Main Body</GridItem>
      </Grid>
    </>
  ); 
}

export default App
