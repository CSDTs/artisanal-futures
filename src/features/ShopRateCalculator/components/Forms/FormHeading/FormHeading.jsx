import { Stack, Heading, Text } from "@chakra-ui/react";

export default function FormHeading({ title, text }) {
	return (
		<Stack spacing={4} marginTop="1rem">
			<Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
				{title}
			</Heading>
			<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
				{text}
			</Text>
		</Stack>
	);
}
