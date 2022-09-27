import { SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import BusinessCard from "./ArtisanCard";

export default function ArtisanListings({ artisans }) {
	return (
		<>
			{artisans?.length === 0 ? (
				<Text>
					There seems to be an issue fetching the artisans. Please try refreshing the page, or try again later.
				</Text>
			) : (
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
					{artisans.map((store) => (
						<React.Fragment key={store.id}>
							{store.acf.business.name && (
								<section>
									<BusinessCard {...store.acf} slug={store.slug} />
								</section>
							)}
						</React.Fragment>
					))}
				</SimpleGrid>
			)}
		</>
	);
}
