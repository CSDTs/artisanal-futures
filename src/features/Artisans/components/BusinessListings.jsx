import React from "react";

import { SimpleGrid } from "@chakra-ui/react";

import BusinessCard from "./BusinessCard";

export default function BusinessListings({ artisans }) {
	return (
		<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
			{artisans &&
				artisans.map((store) => (
					<React.Fragment key={store.id}>
						{store.acf.business.name && (
							<section>
								<BusinessCard {...store.acf} slug={store.slug} />
							</section>
						)}
					</React.Fragment>
				))}
		</SimpleGrid>
	);
}
