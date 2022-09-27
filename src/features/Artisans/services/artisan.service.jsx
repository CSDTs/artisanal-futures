import axios from "axios";
import useSWR from "swr";

const WP_HOST = import.meta.env.VITE_API_URL;

const fetchArtisans = () => {
	const address = `${WP_HOST}${import.meta.env.VITE_ARTISAN_ENDPOINT}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true,
	});

	const filteredData = data?.filter((artisan) => artisan.acf.business.name !== "");

	return {
		artisans: filteredData,
		isLoading: !error && !data,
		isError: error,
	};
};

const ArtisanService = {
	fetchArtisans,
};

export default ArtisanService;
