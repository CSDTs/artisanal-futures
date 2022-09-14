import { Button, chakra, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { MdOutlineEmail, MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import "./CustomProfile.scss";
export default function Sidebar({ artisan, profile_image, business, profile }) {
	return (
		<div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
			<div className="card card-profile shadow">
				<div className="row justify-content-center">
					<div className="col-lg-3 order-lg-2">
						<div className="card-profile-image">
							<a href="#">
								<Image
									src={profile_image}
									className="rounded-circle"
									fallbackSrc={`https://avatars.dicebear.com/api/identicon/${artisan.full_name}.svg`}
									boxSize="180px"
								/>
							</a>
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
								{/* TODO: Add title description field to WP_JSON */}
								{profile.business_information}
								{/* Owner of {business.name} */}
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

						<div hidden>
							<div className="col-4 left">
								<span className="btn btn-sm btn-info">Connect & Follow</span>
							</div>
							<Text>Coming Soon</Text>
							<Flex hidden>
								<Text p={"15"}>
									<a href="#">
										<FaFacebook />
									</a>
								</Text>
								<Text p={"15"}>
									<a href="#">
										<FaTwitter />
									</a>
								</Text>
								<Text p={"15"}>
									<a href="#">
										<FaLinkedin />
									</a>
								</Text>
								<Text p={"15"}>
									<a href="#">
										<FaInstagram />
									</a>
								</Text>
							</Flex>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
