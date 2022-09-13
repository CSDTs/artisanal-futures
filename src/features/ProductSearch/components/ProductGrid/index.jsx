import { Box, Container, SimpleGrid } from "@chakra-ui/react";

import ProductDetailCard from "./ProductDetailCard";

export default function ProductGrid({ products }) {
	return (
		<Container maxWidth={"6xl"}>
			<SimpleGrid columns={[1, 2, 3]} spacing="20px" padding="1rem">
				{products &&
					products.map((product) => (
						<Box key={product.name}>
							<ProductDetailCard {...product} />
						</Box>
					))}
			</SimpleGrid>
		</Container>
	);
}
