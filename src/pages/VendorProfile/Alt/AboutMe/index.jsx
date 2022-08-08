import styles from "./AboutMe.module.scss";

import { Text, Heading, Box, Container, Image } from "@chakra-ui/react";

export default function AboutMe(props) {
	const { artisan, gen_location, avatar, brief, address, phone, email, description } = props.profile;
	const { name, store_url, thumbnail } = props;
	return (
		<div className="col-xl-8 order-xl-1">
			<div className="card bg-secondary shadow">
				<div className="card-body">
					<div className="col-12 col-sm-8 col-lg-8">
						<div className="form-group focused">
							<div className={`${styles.avatar} single_advisor_profile wow fadeInUp`} data-wow-delay="0.2s">
								<div className={styles.aboutMeHeading}>
									<Image src={thumbnail} w={"100%"} alt="" objectFit={"cover"} h={"450px"} />
								</div>

								<div className={styles.aboutMeTextContainer}>
									<Heading className={styles.aboutMeTitle} fontSize={"md"}>
										About Me
									</Heading>
									<Text className={styles.aboutMeText} fontWeight={500}>
										{description}
									</Text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
