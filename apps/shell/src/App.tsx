import React from "react";

import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
const CounterOne = React.lazy(() => import("counter1/CounterOne"));
const Footer = React.lazy(() => import("./modules/Footer"));

// const VERSION = process.env.BUILD_DATE;

export default function App() {
  return (
    <>
      <Center
        height="100vh"
        width="100vw"
        backgroundColor="#1B1A29"
        margin="0"
        p="0"
        flexDirection="column"
      >
        <Box
          color="#fff"
          position="fixed"
          right="0"
          top="0"
          mr="2rem"
          mt="2rem"
        >
          Latest build date <Text>{"1.1.1"}</Text>
        </Box>
        <Heading color="#fff">SHELL</Heading>
        <Flex direction="row" justifyContent="space-around">
          <React.Suspense fallback={<Spinner size="xl" />}>
            <Box
              p="2rem"
              border="1px solid #aeaeae"
              borderRadius="1rem"
              backgroundColor="#fff"
            >
              <Heading color="#6F60EA">Counter 1</Heading>
              <CounterOne />
            </Box>
          </React.Suspense>
        </Flex>
      </Center>
      <React.Suspense fallback={<Spinner size="xl" />}>
        <Footer></Footer>
      </React.Suspense>
    </>
  );
}
