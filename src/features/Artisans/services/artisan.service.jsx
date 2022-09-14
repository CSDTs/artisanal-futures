import axios from "axios";
import useSWR from "swr";

const WP_ENDPOINT = `${import.meta.env.VITE_API_URL}wp/v2`;

const fetchArtisans = () => {
	const address = `${WP_ENDPOINT}/af_members/`;
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
