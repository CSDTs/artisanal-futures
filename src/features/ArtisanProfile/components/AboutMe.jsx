import { Image } from "@chakra-ui/react";

import "./CustomProfile.scss";

import PropTypes from "prop-types";
const AboutMe = ({ profile }) => {
	return (
		<div className="col-xl-8 order-xl-1">
			<div className="card bg-secondary shadow">
				<div className="card-body">
					<div className="col-12 col-sm-8 col-lg-8">
						<div className="form-group focused">
							<div className="single_advisor_profile wow fadeInUp wow_default" data-wow-delay="0.2s">
								<div className="advisor_thumb">
									<Image
										w={"100%"}
										maxH={"350px"}
										alt="Background of artisan's business"
										fallbackSrc="img/background-fallback.jpg"
										src={profile?.cover_image}
									/>
								</div>

								<div className="single_advisor_details_info">
									<h6 className="heading-small">About Me</h6>
									<label className="form-control form-control-alternative about_me_control">
										{profile?.about_me ||
											"This user has not set up their About Me section. In the meantime, check out their awesome work on their site!"}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

AboutMe.propTypes = {
	profile: PropTypes.object,
};

export default AboutMe;
