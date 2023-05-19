import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Show,
    Textarea,
    Select,
  } from '@chakra-ui/react';

const ArticleCreateForm = () => {
    return (
        <Stack minH={'calc(100vh - 100px)'} direction={'row'}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Post an Article</Heading>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="content">
                <FormLabel>Content</FormLabel>
                <Textarea h={250}  type="text-area" />
              </FormControl>

              <FormControl id="language">
                <FormLabel>Language</FormLabel>
                <Select placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
              </FormControl>
              <FormControl id="github_link">
                <FormLabel>GitHub Link</FormLabel>
                <Input type="text" />
              </FormControl>

              <Stack pt={5}>
                <Button 
                    colorScheme={'purple'} 
                    variant={'solid'}>
                  Submit Article
                </Button>
              </Stack>

            </Stack>
          </Flex>
          <Show above='lg'>
            <Flex 
                px='20px' 
                py='20px'
                maxHeight='calc(100vh)' 
                flex={1}>
                <Image
                    borderRadius={'20'}
                alt={'Login Image'}
                objectFit={'cover'}
                src={
                    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                }
                />
            </Flex>
          </Show>
        </Stack>
      );
}

export default ArticleCreateForm