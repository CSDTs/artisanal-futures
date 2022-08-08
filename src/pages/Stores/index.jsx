import StoreCard from "./StoreCard";

import STORES from "../../data/stores.json";

import { SimpleGrid, Container, Heading } from "@chakra-ui/react";

export default function Stores() {
	return (
		<>
			<Container maxW={"container.lg"} mt={6}>
				<Heading mb={6}>Stores</Heading>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX="40px" spacingY="20px">
					{STORES && STORES.map((store) => <StoreCard {...store} />)}
				</SimpleGrid>
			</Container>
		</>
	);
}
