import StoreCard from "./StoreCard";

import STORES from "../../data/stores.json";

import { SimpleGrid, Container, Heading } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import axios from "axios";
export default function Stores() {
	const [stores, setStores] = useState();

	useEffect(() => {
		axios.get("https://fourm.artisanalfutures.org/wp-json/wp/v2/stores").then((res) => {
			setStores(
				res.data.map((store) => {
					return store.acf;
				})
			);
		});
	}, []);

	useEffect(() => {
		console.log(stores);
	}, [stores]);

	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Stores</Heading>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacingX="40px" spacingY="20px">
					{stores && stores.map((store) => <StoreCard {...store} />)}
				</SimpleGrid>
			</Container>
		</>
	);
}
