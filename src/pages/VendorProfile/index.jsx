import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, SimpleGrid, Box, Container, Text, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";

import SideInformation from "./SideInformation";
import AboutMe from "./AboutMe";
// import Alt from "./Alt";

import STORES from "../../data/stores.json";
export default function VendorProfile() {
	const { name } = useParams();
	return (
		<>
			{/* <Container maxW={"container.lg"}>
				<Box background={"gray.500"} h={20} zIndex={0} position="absolute" maxW={"1024px"} w={"100%"}></Box>
				<Flex>
					<AboutMe
						{...STORES.filter((store) => {
							return store.url == name;
						})[0]}
					/>

					<SideInformation
						{...STORES.filter((store) => {
							return store.url == name;
						})[0]}
					/>
				</Flex>
			</Container> */}

			<Container maxW={"container.lg"} background={"gray.100"} mt={4}>
				{/* <Alt /> */}
			</Container>
		</>
	);
}
