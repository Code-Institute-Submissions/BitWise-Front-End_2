import { IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

const ScrollToTopButton = () => {
  const custBgColor = useColorModeValue("#805AD5", "#B794F4");
  const custHoverColor = useColorModeValue("#B794F4", "#805AD5");

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    setShowScrollToTop(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showScrollToTop && (
        <IconButton
          icon={<FaArrowUp />}
          aria-label="Scroll to top"
          position="fixed"
          bottom="4"
          right="4"
          bg={custBgColor}
          _hover={{
            bg: custHoverColor,
          }}
          color="white"
          onClick={scrollToTop}
        />
      )}
    </>
  );
};

export default ScrollToTopButton;
