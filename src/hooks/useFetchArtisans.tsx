import formatWordPressData from "@/utils/formatWordPressData";
import axios from "axios";
import { useQuery } from "react-query";

const WP_HOST = import.meta.env.VITE_API_URL;

// const useFetchArtisans = async () => {
// 	const address = `${WP_HOST}${import.meta.env.VITE_ARTISAN_ENDPOINT}`;
// 	const fetcher = async (url: string) =>
// 		await axios.get(url).then((res) => {
// 			return res?.data?.map((artisan: any) => {
// 				return formatWordPressData(artisan);
// 			});
// 		});

// 	const { data, error } = await useSWR(address, fetcher, {
// 		revalidateOnFocus: true,
// 	});

// 	// const filteredData = await data?.filter((artisan: any) => artisan.biz_name !== "");

// 	return {
// 		artisans: data,
// 		isLoading: !error && !data,
// 		isError: error,
// 	};
// };
const fetchData = async (): Promise<any[]> => {
	const response = await fetch(`${WP_HOST}${import.meta.env.VITE_ARTISAN_ENDPOINT}`);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data: any[] = await response.json();
	return data.map(formatWordPressData); // map each data object
};

const useFetchArtisans = () => {
	return useQuery<any[], Error>("data", fetchData);
};

export default useFetchArtisans;
