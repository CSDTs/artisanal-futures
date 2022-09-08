import { Container, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import React from "react";
import Loading from "../components/Loading";
import FetchService from "../services/fetch.service";

import { ArtisanService, BusinessListings } from "../features/Artisans/";
export default function Artisans() {
	const { data: artisans, isLoading, isError } = ArtisanService.fetchArtisans();

	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Loading isLoading={isLoading} />
				{!isLoading && (
					<>
						<Heading mb={6}>Artisans</Heading>
						<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
							Browse our featured artisans and discover their shops, profiles, and more
						</Text>

						{artisans && artisans.length == 0 && (
							<>There seems to be an issue fetching the artisans. Please try refreshing the page, or try again later.</>
						)}

						<BusinessListings artisans={artisans} />
					</>
				)}
				{isError && <Text>There seems to be an issue connecting to the server. Please try again later.</Text>}
			</Container>
		</>
	);
}
