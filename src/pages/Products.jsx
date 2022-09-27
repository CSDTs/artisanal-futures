import { Container, Heading, Text } from "@chakra-ui/react";

import ProductSearch from "../features/ProductSearch";

const Products = () => {
	return (
		<Container maxW={"6xl"} mt={6}>
			<Heading mb={6}>Products</Heading>

			<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
				Search through all our artisans&apos; products and support small businesses
			</Text>

			<ProductSearch />
		</Container>
	);
};
export default Products;
