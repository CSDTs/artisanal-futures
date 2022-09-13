import axios from "axios";
import useSWR from "swr";

const getLocalProductList = (address) => {
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const getSortedProductResult = (keyword, setIsLoading) => {
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

	setIsLoading(true);
	return axios.post(address, payload).then((res) => {
		setIsLoading(false);
		return res.data;
	});
};

const formatProductPrinciples = (products) => {
	return [
		...new Set(
			products.reduce((accum, product) => {
				return [...accum, ...product.principles.split(",")];
			}, [])
		),
	].filter((attribute) => attribute !== "");
};

const formatProductArtisans = (products) => {
	return [
		...new Set(
			products.map((product) => {
				return product.the_artisan;
			})
		),
	];
};
const ProductService = {
	getLocalProductList,
	getSortedProductResult,
	formatProductPrinciples,
	formatProductArtisans,
};

export default ProductService;
