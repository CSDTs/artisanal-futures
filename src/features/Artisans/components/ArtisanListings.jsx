import { SimpleGrid, Text } from "@chakra-ui/react";
import { Fragment } from "react";

import PropTypes from "prop-types";
import BusinessCard from "./ArtisanCard";

const ArtisanListings = ({ artisans }) => {
	return (
		<>
			{artisans?.length === 0 ? (
				<Text>
					There seems to be an issue fetching the artisans. Please try refreshing the page, or try again later.
				</Text>
			) : (
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
					{artisans.map((store) => (
						<Fragment key={store.id}>
							{store.acf.business.name && (
								<section>
									<BusinessCard {...store.acf} slug={store.slug} />
								</section>
							)}
						</Fragment>
					))}
				</SimpleGrid>
			)}
		</>
	);
};

ArtisanListings.propTypes = {
	artisans: PropTypes.array,
};

export default ArtisanListings;
