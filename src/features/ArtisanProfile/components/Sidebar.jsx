//Sidebar.jsx
import { chakra, Flex, Image, Link, Text } from "@chakra-ui/react";
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";

import PropTypes from "prop-types";

import "./CustomProfile.scss";

/**
 * This component is responsible for rendering the artisan's public and business information in their profile.
 */

/**
 * Props:
 * -artisan: artisan object from WP_JSON
 * -profile_image: a url to their profile image
 * -business: business object from WP_JSON
 * -profile: profile object from WP_JSON
 */

const Sidebar = ({ artisan, profile_image, business, profile }) => {
	return (
		<div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
			<div className="card card-profile shadow">
				<div className="row justify-content-center">
					<div className="col-lg-3 order-lg-2">
						<div className="card-profile-image">
							<Link href={business?.website || "#"}>
								<Image
									src={profile_image}
									className="rounded-circle"
									alt={"A logo or profile shot of the artisan"}
									fallbackSrc={`https://avatars.dicebear.com/api/identicon/${artisan.full_name}.svg`}
									boxSize="180px"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="card-body spacing">
					<div className="text-center">
						<div>{artisan.full_name}</div>
						<div className="h5 font-weight-300">
							<i className="ni location_pin mr-2"></i>
							{artisan.general_location || "Earth"}
						</div>
						<div className="h5 mt-4">
							<i className="ni business_briefcase-24 mr-2">
								{/**
								 * TODO: Add title description field to WP_JSON
								 */}
								{profile.business_information}
							</i>
						</div>
						{business.website && (
							<div>
								<chakra.a className="ni education_hat mr-2" fontSize={"sm"} href={business.website}>
									{business.website || "TBD"}
								</chakra.a>
							</div>
						)}

						<hr className="my-4" />
					</div>
					<div>
						<div className="col-4 left" hidden>
							<Text className="btn btn-sm btn-info" textAlign={"center"}>
								Business Information
							</Text>
						</div>
						<div className="left">{business.name}</div>

						<Flex gap="2">
							<MdOutlineLocationOn />
							<div className="h5 font-weight-600">{business.address || "Earth"}</div>
						</Flex>

						{business.phone_number && (
							<Flex gap="2">
								<MdOutlinePhone />
								<div className="h5 font-weight-600">{business.phone_number}</div>
							</Flex>
						)}
						{business.email && (
							<Flex gap="2">
								<MdOutlineEmail />
								<div className="h5 font-weight-600">{business.email}</div>
							</Flex>
						)}
						<hr className="my-4" />
					</div>
					<div>
						{profile.misc_information && (
							<>
								<div className="col-4 left">
									<Text className="btn btn-sm btn-primary" textAlign={"center"}>
										Headlines
									</Text>
								</div>

								<div className="h5 font-weight-600">{profile.misc_information}</div>

								<hr className="my-4" />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

Sidebar.propTypes = {
	artisan: PropTypes.object,
	profile: PropTypes.object,
	business: PropTypes.object,
	profile_image: PropTypes.string,
};
