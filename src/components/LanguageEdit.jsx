import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
} from "@chakra-ui/react";
import useLanguageEdit from "../hooks/useLanguageEdit";
import { RiMailSendLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const LanguageEdit = (props) => {
  const {
    language,
    confidence,
    used_since,
    setLanguages,
    id,
    setShowEditLanguage,
  } = props;

  const {
    languageConfidence,
    languageUsed_since,
    errors,
    handleChange,
    handleSubmit,
  } = useLanguageEdit(
    id,
    language,
    confidence,
    used_since,
    setLanguages,
    setShowEditLanguage
  );

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack pb={3} w="100%">
          <Box
            borderRadius={5}
            p={2}
            border={"1px solid"}
            borderRight={"2px solid "}
            borderBottom={"2px solid"}
            borderColor="purple.300"
            w="100%"
          >
            <Heading mt={5} size="md">
              {language} Update
            </Heading>
            <FormControl mt={5} id="languageConfidence">
              <FormLabel htmlFor="languageConfidence">Confidence</FormLabel>

              <Flex>
                <NumberInput
                  maxW="100px"
                  mr="2rem"
                  value={languageConfidence}
                  name="languageConfidence"
                  onChange={(value) =>
                    handleChange({
                      target: { name: "languageConfidence", value },
                    })
                  }
                  aria-label="Confidence"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Slider
                  flex="1"
                  colorScheme=""
                  focusThumbOnChange={false}
                  name="languageConfidence"
                  value={languageConfidence}
                  onChange={(value) =>
                    handleChange({
                      target: { name: "languageConfidence", value },
                    })
                  }
                  aria-label="Confidence"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={languageConfidence}
                  />
                </Slider>
              </Flex>
              {errors.confidence && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.confidence[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl mt={5} id="languageUsed_since">
              <FormLabel htmlFor="languageUsed_since">
                Used Language Since
              </FormLabel>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                name="languageUsed_since"
                value={languageUsed_since}
                onChange={handleChange}
                aria-label="Used Language Since"
              />
            </FormControl>

            <Flex mt={2} justifyContent={"end"}>
              <Button mr={1} onClick={() => setShowEditLanguage(false)}>
                <RxCross2 />
              </Button>
              <Button type="submit" aria-label="Submit Language Edit">
                <RiMailSendLine />
              </Button>
            </Flex>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default LanguageEdit;
