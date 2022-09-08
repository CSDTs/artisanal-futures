import { Flex, Image, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./CustomProfile.scss";
export default function AboutMe({ profile }) {
	return (
		<div className="col-xl-8 order-xl-1">
			<div className="card bg-secondary shadow">
				<div className="card-body">
					<div className="col-12 col-sm-8 col-lg-8">
						<div className="form-group focused">
							<div className="single_advisor_profile wow fadeInUp wow_default" data-wow-delay="0.2s">
								<div className="advisor_thumb">
									<Image w={"100%"} alt="Artisan cover image" src={profile.cover_image} />
								</div>

								<div className="single_advisor_details_info">
									<h6 className="heading-small">About Me</h6>
									<label className="form-control form-control-alternative about_me_control">{profile.about_me}</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
