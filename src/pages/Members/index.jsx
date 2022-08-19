import StoreCard from "./StoreCard";
import { PuffLoader } from "react-spinners";

import { useState } from "react";
import { SimpleGrid, Container, Heading, Text } from "@chakra-ui/react";

import useSWR from "swr";
import axios from "axios";
import { useEffect } from "react";
import MemberService from "../../services/member.service";

const fetchStores = (url) => MemberService.getWPData(url);

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Members() {
	const [loading, setLoading] = useState(true);
	const stores = useSWR("/af_members/", fetchStores);

	useEffect(() => {
		console.log(stores.data);
	}, [stores]);

	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Artisans</Heading>
				<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
					Browse our featured artisans and discover their shops, profiles, and more
				</Text>
				{!stores.data && <PuffLoader color={"#000000"} loading={loading} cssOverride={override} size={150} />}
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacingX="40px" spacingY="20px">
					{stores.data &&
						stores.data.map((store) => (
							<section key={store.id}>
								<StoreCard {...store.acf} slug={store.slug} />
							</section>
						))}
				</SimpleGrid>
			</Container>
		</>
	);
}
