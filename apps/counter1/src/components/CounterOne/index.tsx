import React, { useState }from "react";

import { Text, Flex, Button } from '@chakra-ui/react';

export default function CounterOne() : React.ReactElement {

	const [counter, setCounter] = useState(0);

	const clickHandler = () => setCounter(counter + 1);

	return (
		<Flex color="#000" gap="1rem" direction="column" >
			<Text> Add by one each click <strong>Counter 1</strong></Text>
			<Text>Click counter: {counter}</Text>
			<Button onClick={clickHandler}>Click me</Button>
		</Flex>
	)
}