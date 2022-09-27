import { ArtisanListings, ArtisanService } from "../features/Artisans/";
import { LoadContainer, PageHeading } from "../layout";

export default function Artisans() {
	const { artisans, isLoading, isError } = ArtisanService.fetchArtisans();

	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			<PageHeading
				title={"Artisans"}
				subtitle={"Browse our featured artisans and discover their online stores, profiles, and more"}
			/>

			<ArtisanListings artisans={artisans} />
		</LoadContainer>
	);
}
