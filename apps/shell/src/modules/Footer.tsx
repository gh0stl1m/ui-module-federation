import React, { useEffect, useRef } from "react";
import { Footer } from "footer/FooterModule";
import { Box } from "@chakra-ui/react";

function FooterModule() {
  const ref = useRef(null);

  useEffect(() => {
    Footer(ref.current);
  }, []);

  return (
    <Box
      color="#fff"
      position="fixed"
      bottom="0"
      mr="2rem"
      mt="2re"
      width="100vw"
      className="footer-module"
      ref={ref}
    />
  );
}

export default FooterModule;
