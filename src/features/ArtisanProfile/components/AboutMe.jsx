import { Image } from "@chakra-ui/react";

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
									<Image
										w={"100%"}
										maxH={"350px"}
										alt="Artisan cover image"
										src={
											profile?.cover_image ||
											"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
										}
									/>
								</div>

								<div className="single_advisor_details_info">
									<h6 className="heading-small">About Me</h6>
									<label className="form-control form-control-alternative about_me_control">
										{profile?.about_me ||
											" Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum."}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
