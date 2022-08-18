import styles from "./Alt.module.scss";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { Text, Heading, Box, Container, Image, Flex } from "@chakra-ui/react";

import AboutMe from "./AboutMe";
import SideInformation from "./SideInformation";
import axios from "axios";
import STORES from "../../../data/stores.json";
export default function Alt() {
	const { name } = useParams();
	const [artisan, setArtisan] = useState();
	const [store, setStore] = useState();

	useEffect(() => {
		axios.get("https://fourm.artisanalfutures.org/wp-json/wp/v2/artisans", { params: { slug: name } }).then((res) => {
			setArtisan(res.data[0].acf);
		});
	}, []);
	useEffect(() => {
		if (artisan)
			axios.get("https://fourm.artisanalfutures.org/wp-json/wp/v2/stores/" + artisan.store.ID).then((res) => {
				setStore(res.data.acf);
			});
	}, [artisan]);

	return (
		<div className={styles.mainContent}>
			<Box className={styles.aboutMeHeader}>
				<Container>
					<div className="row"></div>
				</Container>
			</Box>

			<Container maxW={"container.xl"} mt={7}>
				<Flex>
					{artisan && store && <AboutMe artisan={artisan} store={store} />}
					{artisan && store && <SideInformation artisan={artisan} store={store} />}
				</Flex>
			</Container>
		</div>
	);
}
