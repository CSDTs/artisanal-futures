import { Flex, Image, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AboutMe, DetailsService, Header, Sidebar } from "../features/ArtisanProfile";

export default function ArtisanProfile() {
	const { name } = useParams();

	const { artisan, business, profile, profile_image, isLoading, isError } =
		DetailsService.getMemberInformationBySlug(name);

	return (
		<>
			<Loading isLoading={isLoading} />

			{!isLoading && (
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
			)}
		</>
	);
}
