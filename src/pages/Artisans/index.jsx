import { PuffLoader } from "react-spinners";
import StoreCard from "./ArtisanCard";

import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import FetchService from "../../services/fetch.service";

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Artisans() {
	const { data: artisans, isLoading, isError } = FetchService.fetchArtisans();

	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Artisans</Heading>
				<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
					Browse our featured artisans and discover their shops, profiles, and more
				</Text>
				<PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
					{artisans &&
						artisans.map((store) => (
							<section key={store.id}>
								<StoreCard {...store.acf} slug={store.slug} />
							</section>
						))}
				</SimpleGrid>
				{isError && <Text>There seems to be an issue connecting to the server. Please try again later.</Text>}
			</Container>
		</>
	);
}
