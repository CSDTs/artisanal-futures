import { Box, Button, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function ArtisanCard({ business, profile, slug }) {
	const navigate = useNavigate();

	return (
		<Box
			boxShadow="xl"
			bg={useColorModeValue("white", "gray.900")}
			role={"group"}
			p={6}
			maxW={{ base: "100%" }}
			w={"full"}
			rounded={"lg"}
			pos={"relative"}
			zIndex={0}>
			<Image
				rounded={"lg"}
				height={230}
				width={282}
				objectFit={"cover"}
				mx={"auto"}
				src={business.thumbnail_image}
				fallbackSrc="https://via.placeholder.com/360"
			/>
			<Heading fontSize="md" mt={3} textAlign="center">
				{business.name}
			</Heading>
			<Flex direction={"row"} mt={3} justifyContent="center">
				{profile && (
					<Button size="sm" colorScheme="blue" onClick={() => navigate(`/artisans/${slug}`)} mx={2}>
						<FaUserAlt />
					</Button>
				)}
				{business.website && (
					<Button size="sm" colorScheme="blue" onClick={() => window.open(business.website, "_blank").focus()} mx={2}>
						<FaStoreAlt />
					</Button>
				)}
			</Flex>
		</Box>
	);
}
