import React from "react";

import { Box } from '@chakra-ui/react';
import CounterOne from "./components/CounterOne";

export default function App() {
	return (
		<Box margin='1.2rem'>
			<Box>Counter 1</Box>
			<Box>
				<CounterOne/>
			</Box>
		</Box>
	)
}
