import { Box, Container, SimpleGrid } from "@chakra-ui/react";

import { FC } from "react";
import ProductCard from "./ProductCard";

interface IProps {
	products: Array<any>;
}
const ProductGrid: FC<IProps> = ({ products }) => {
	return (
		<section className="flex flex-col md:flex-row md:flex-wrap md:w-3/4 w-full mx-auto">
			{products &&
				products.map((product) => (
					<div className="basis-full md:basis-1/2 lg:basis-1/3 items-stretch flex p-4 mx-auto " key={product.name}>
						<ProductCard {...product} />
					</div>
				))}
		</section>
	);
};
export default ProductGrid;
