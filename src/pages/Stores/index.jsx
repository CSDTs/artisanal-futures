import StoreCard from "./StoreCard";
import { PuffLoader } from "react-spinners";

import { useState } from "react";
import { SimpleGrid, Container, Heading, Text } from "@chakra-ui/react";

import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";

const fetcher = (url) =>
	axios.get(url).then((res) =>
		res.data.map((store) => {
			return store.acf;
		})
	);

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Stores() {
	const [loading, setLoading] = useState(true);
	const stores = useSWR("https://fourm.artisanalfutures.org/wp-json/wp/v2/stores", fetcher);

	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Stores</Heading>
				<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
					Browse our featured artisans and discover their shops, profiles, and more
				</Text>
				{!stores.data && <PuffLoader color={"#000000"} loading={loading} cssOverride={override} size={150} />}
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
					{stores.data &&
						stores.data.map((store) => (
							<section key={store.business_name}>
								<StoreCard {...store} />
							</section>
						))}
				</SimpleGrid>
			</Container>
		</>
	);
}
