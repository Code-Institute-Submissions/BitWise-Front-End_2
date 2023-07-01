import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Select,
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
} from "@chakra-ui/react";
import useLanguageCreate from "../hooks/useLanguageCreate";
import { RiMailSendLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import languageOptions from "../constants/languageOptions";

const LanguageCreate = (props) => {
  const { profile, setLanguages, setAddLanguage } = props;

  const {
    language,
    confidence,
    used_since,
    errors,
    handleChange,
    handleSubmit,
  } = useLanguageCreate(profile, setLanguages, setAddLanguage);

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
            <FormControl id="language">
              <FormLabel>Language</FormLabel>

              <Select
                placeholder="Select option"
                name="language"
                onChange={handleChange}
                aria-label="Select Language"
              >
                {languageOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.language && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.language[0]}
                </Alert>
              )}
              {errors.detail && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.detail[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl mt={5} id="confidence">
              <FormLabel>Confidence</FormLabel>

              <Flex>
                <NumberInput
                  maxW="100px"
                  mr="2rem"
                  value={confidence}
                  onChange={(value) =>
                    handleChange({ target: { name: "confidence", value } })
                  }
                  aria-label="Confidence Number Input"
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
                  name="confidence"
                  value={confidence}
                  onChange={(value) =>
                    handleChange({ target: { name: "confidence", value } })
                  }
                  aria-label="Confidence Slider"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={confidence}
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

            <FormControl mt={5} id="date">
              <FormLabel>Used Language Since</FormLabel>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                name="used_since"
                value={used_since}
                onChange={handleChange}
                aria-label="Used Language Since Input"
              />
            </FormControl>

            <Flex mt={2} justifyContent={"end"}>
              <Button
                mr={1}
                onClick={() => setAddLanguage(false)}
                aria-label="Cancel Button"
              >
                <RxCross2 />
              </Button>
              <Button type="submit" aria-label="Submit Button">
                <RiMailSendLine />
              </Button>
            </Flex>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default LanguageCreate;
