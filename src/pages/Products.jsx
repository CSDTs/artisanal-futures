import { Container, Heading, Text } from "@chakra-ui/react";

import ProductSearch from "../features/ProductSearch";

export default function Products() {
	return (
		<Container maxW={"6xl"} mt={6}>
			<Heading mb={6}>Products</Heading>

			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				Search through all our artisans' products and support small businesses
			</Text>

			<ProductSearch />
		</Container>
	);
}
