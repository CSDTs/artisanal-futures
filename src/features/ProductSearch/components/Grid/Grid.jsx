import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import { Box, SimpleGrid, Flex, Center, Text, Container, Spacer } from "@chakra-ui/react";

export default function ProductGrid({ products }) {
	return (
		<Container maxWidth={"container.xl"}>
			<SimpleGrid columns={[2, null, 3]} spacing="40px" maxH={"70vh"} overflowY={"scroll"} padding="2rem">
				{products &&
					products.map((product) => (
						<Box>
							<Card {...product} />
						</Box>
					))}
			</SimpleGrid>
		</Container>
	);
}
