import styles from "./Alt.module.scss";
import { useParams } from "react-router-dom";
import { Text, Heading, Box, Container, Image, Flex } from "@chakra-ui/react";

import AboutMe from "./AboutMe";
import SideInformation from "./SideInformation";

import STORES from "../../../data/stores.json";
export default function Alt() {
	const { name } = useParams();
	return (
		<div className={styles.mainContent}>
			<Box className={styles.aboutMeHeader}>
				<Container>
					<div className="row"></div>
				</Container>
			</Box>

			<Container maxW={"container.xl"} mt={7}>
				<Flex>
					<AboutMe
						{...STORES.filter((store) => {
							return store.url == name;
						})[0]}
					/>
					<SideInformation
						{...STORES.filter((store) => {
							return store.url == name;
						})[0]}
					/>
				</Flex>
			</Container>
		</div>
	);
}
