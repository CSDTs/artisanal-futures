import { Box, Container, Heading, Image } from "@chakra-ui/react";

import { Features, Hero } from "../features/Homepage";
const Homepage = () => {
	return (
		<Container maxW={"6xl"}>
			<Hero />
			<Features />

			<Box textAlign="center">
				<Heading mt={"3rem"}>Artisanal Technologies for Generative Justice</Heading>
				<Image
					src="/img/flowchart.png"
					w={"100%"}
					loading="lazy"
					alt={"Flowchart showing the generative nature of artisanal technologies"}
				/>
			</Box>
		</Container>
	);
};

export default Homepage;
