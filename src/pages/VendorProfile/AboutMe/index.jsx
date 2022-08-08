import { Text, Heading, Box, Image, Container, Stack } from "@chakra-ui/react";
import styles from "./AboutMe.styles.scss";
export default function AboutMe(props) {
	const { thumbnail } = props;
	const { description } = props.profile;
	return (
		<Box w={"100%"}>
			<Box className={`${styles.avatar} `} p={4}>
				<div className={styles.aboutMeHeading}>
					<Image src={thumbnail} w={"100%"} alt="" />
				</div>

				<div className={styles.aboutMeTextContainer}>
					<Heading className={styles.aboutMeTitle} fontSize={"md"}>
						About Me
					</Heading>
					<Text className={styles.aboutMeText} fontWeight={500}>
						AKOMA was founded by Mandisa Smith, art-based workshop leader, community educator, and founder and former
						co-owner of Detroit Fiber Works, a fiber art studio in Detroit. Detroit Fiber Works (2013-2019) was a place
						for Detroit artists to show and sell their work, some for the very first time. AKOMA continues in that
						tradition, with an emphasis on women artists. AKOMA’s logo is the Akoma Adinkra symbol. This Adinkra symbol
						represents love, unity, endurance, patience, goodwill, tolerance, faithfulness, understanding.
						<br />
						<br />
						Madison started this initative to showcase a collective of black women artists and makers in Detroit who are
						brought in together for the purpose of helping one another to excel in our respective crafts, while at the
						same time, striving to make a positive difference in our community through art.
					</Text>
				</div>
			</Box>
		</Box>
	);
}
