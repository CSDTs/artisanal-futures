import { Box, Heading, Text, Image, Icon, Stack, Button, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import { FaStoreAlt, FaFacebook, FaInstagram, FaUserAlt } from "react-icons/fa";
import { LoremIpsum } from "react-lorem-ipsum";
import { useNavigate } from "react-router-dom";

export default function StoreCard({ business, profile, slug }) {
	const navigate = useNavigate();

	const SocialIcon = (social) => {
		const [icon, url] = social;

		let SocialIcon = "";

		switch (icon) {
			case "Store":
				if (url) SocialIcon = <FaStoreAlt />;
				break;
			case "facebook":
				if (url) SocialIcon = <FaFacebook />;
				break;
			case "instagram":
				if (url) SocialIcon = <FaInstagram />;
				break;
			default:
				break;
		}

		if (SocialIcon)
			return (
				<Button size="sm" colorScheme="blue" onClick={() => window.open(url, "_blank").focus()} mx={2}>
					{SocialIcon}
				</Button>
			);
	};
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
			zIndex={0}

			// onClick={() => navigate(`/vendors/${url}`)}
		>
			<Image
				rounded={"lg"}
				height={230}
				width={282}
				objectFit={"cover"}
				mx={"auto"}
				src={business.thumbnail_image}
				cursor={"pointer"}
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

				<Button size="sm" colorScheme="blue" onClick={() => window.open(website, "_blank").focus()} mx={2}>
					<FaStoreAlt />
				</Button>

				{/* {social_media && Object.entries(social_media).map((social) => <span key={social}>{SocialIcon(social)}</span>)} */}
			</Flex>
		</Box>
	);
}
