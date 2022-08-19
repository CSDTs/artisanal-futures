import styles from "./Alt.module.scss";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { Text, Heading, Box, Container, Image, Flex } from "@chakra-ui/react";

import AboutMe from "./AboutMe";
import SideInformation from "./SideInformation";
import axios from "axios";
import MemberService from "../../services/member.service";

export default function ArtisanDetails() {
	const { name } = useParams();

	const { artisan, isLoading, isError } = MemberService.getMemberInformationBySlug(name);

	return (
		<div className={styles.mainContent}>
			<Box className={styles.aboutMeHeader}>
				<Container>
					<div className="row"></div>
				</Container>
			</Box>

			<Container maxW={"container.xl"} mt={7}>
				<Flex>
					{artisan && (
						<>
							<AboutMe {...artisan} />
							<SideInformation {...artisan} />
						</>
					)}
				</Flex>
			</Container>
		</div>
	);
}
