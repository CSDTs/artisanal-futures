import { Heading, Text } from "@chakra-ui/react";

export default function PageHeading({ title, subtitle }) {
	return (
		<>
			<Heading mb={6}>{title}</Heading>
			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				{subtitle}
			</Text>
		</>
	);
}
