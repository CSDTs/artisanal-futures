import { Container, Heading, Text } from "@chakra-ui/react";

import PageContainer from "@/components/PageContainer";

import ProductSearch from "../features/ProductSearch";
const ProductsPage = () => {
	const pageInfo = {
		title: "Products",
		subtitle: "Search through all our artisans' products and support small businesses",
	};

	return (
		<PageContainer {...pageInfo}>
			<ProductSearch />
		</PageContainer>
	);
};
export default ProductsPage;
