import { ArtisanListings, ArtisanService } from "../features/Artisans/";
import { LoadContainer, PageHeading } from "../layout";
import FetchService from "../services/fetch.service";

export default function Artisans() {
	const address = `${import.meta.env.VITE_API_URL}wp/v2/af_members/`;

	// const { artisans, isLoading, isError } = ArtisanService.fetchArtisans();
	const { data, isLoading, isError } = FetchService.fetchData(address);
	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			<PageHeading
				title={"Artisans"}
				subtitle={"Browse our featured artisans and discover their online stores, profiles, and more"}
			/>

			<ArtisanListings artisans={data} />
		</LoadContainer>
	);
}
