import { Artisan, Attribute, Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const API_ENDPOINT = "api/ecodata.json";
const SORT_ENDPOINT = "https://api.";

const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [artisans, setArtisans] = useState<Artisan[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchProducts = async () => {
		try {
			const response = await fetch(API_ENDPOINT);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();

			const formattedProducts: Product[] = data.map((product: Product, key: number) => {
				return {
					...product,
					the_artisan: product.the_artisan.toLowerCase(),
					principles: product.principles.toLowerCase(),
					id: key,
				};
			});
			const formattedArtisans: Artisan[] = Array.from(
				new Set(data.map((product: Product) => product.the_artisan.toLowerCase()))
			);
			const formattedAttributes: Attribute[] = Array.from(
				new Set(
					data
						.flatMap((product: Product) => product.principles.toLowerCase().split(","))
						.filter((attribute: string) => attribute.trim() !== "")
				)
			);
			setProducts(formattedProducts);
			setArtisans(formattedArtisans);
			setAttributes(formattedAttributes);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const sortWithAI = async (keyword: string) => {
		const payload = {
			query: {
				content: keyword,
			},
			response_model: [
				{
					name: "",
					description: "",
					principles: "",
					the_artisan: "",
					url: "",
					image: "",
					craftID: "",
					assessment: [],
				},
			],
		};
		const address = import.meta.env.VITE_PRODUCT_API_URL;

		return axios.post(address, payload).then((res) => {
			return res.data;
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return { products, artisans, attributes, isLoading, isError, sortWithAI };
};

export default useProducts;
