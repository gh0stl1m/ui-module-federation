import React from "react";

import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
const CounterOne = React.lazy(() => import("counter1/CounterOne"));
const Footer = React.lazy(() => import("./modules/Footer"));

const BUILD_DATE: string = process.env.BUILD_DATE || "";
const VERSION: string = process.env.VERSION || "";

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
        <Flex
          position="fixed"
          right="0"
          top="0"
          direction="row"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Box mr="2rem" mt="2rem">
            Latest build date <Text>{BUILD_DATE}</Text>
          </Box>
          <Box mr="2rem" mt="2rem">
            Latest version <Text>{VERSION}</Text>
          </Box>
        </Flex>
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
