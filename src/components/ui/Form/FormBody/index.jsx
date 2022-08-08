import { Flex, Box, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function FormBody({ title, description, body }) {
	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						{title}
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						{description}
					</Text>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>{body}</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
