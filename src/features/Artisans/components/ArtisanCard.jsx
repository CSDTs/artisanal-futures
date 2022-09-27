import { Box, Button, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const ArtisanCard = ({ business, profile, slug }) => {
	const navigate = useNavigate();

	const handleProfileClick = () => navigate(`/artisans/${slug}`);
	const handleStoreClick = () => window.open(business.website, "_blank").focus();

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
				alt={`Cover for ${business.name}`}
				fallbackSrc="https://via.placeholder.com/360"
			/>
			<Heading fontSize="md" mt={3} textAlign="center">
				{business.name}
			</Heading>
			<Flex direction={"row"} mt={3} justifyContent="center">
				{profile && (
					<Button size="sm" colorScheme="blue" onClick={handleProfileClick} mx={2}>
						<FaUserAlt />
					</Button>
				)}
				{business.website && (
					<Button size="sm" colorScheme="blue" onClick={handleStoreClick} mx={2}>
						<FaStoreAlt />
					</Button>
				)}
			</Flex>
		</Box>
	);
};

ArtisanCard.propTypes = {
	business: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
};
export default ArtisanCard;
