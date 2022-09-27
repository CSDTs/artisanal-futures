import { useParams } from "react-router-dom";

import { AboutMe, DetailsService, Header, Sidebar } from "../features/ArtisanProfile";

import { LoadContainer } from "../layout";

export default function ArtisanProfile() {
	const { name } = useParams();

	const { artisan, business, profile, profile_image, isLoading, isError } =
		DetailsService.getMemberInformationBySlug(name);

	return (
		<LoadContainer isLoading={isLoading} isError={isError}>
			<div className="main-content">
				<Header />
				<div className="container-fluid mt--7">
					{artisan && (
						<div className="row">
							<Sidebar artisan={artisan} profile_image={profile_image} business={business} profile={profile} />
							<AboutMe profile={profile} />
						</div>
					)}
				</div>
			</div>
		</LoadContainer>
	);
}
