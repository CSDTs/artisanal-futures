import { Box, Container, Heading, Image } from "@chakra-ui/react";

import { Features, Hero } from "../features/Homepage";

export default function Homepage() {
	return (
		<Container maxW={"6xl"}>
			<Hero />
			<Features />

			<Box textAlign="center">
				<Heading mt={"3rem"}>Artisanal Technologies for Generative Justice</Heading>
				<Image src="/img/flowchart.png" w={"100%"} loading="lazy"></Image>
			</Box>
		</Container>
	);
}

// TODO: Verify the need for a CSDTs link (similar to AfricanFuturist )
// TODO: Verify the need for featured products (or artisans / stores)
