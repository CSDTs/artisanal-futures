import { Box, Heading, Text, Image, Icon, Stack, Button } from "@chakra-ui/react";
import { FaStoreAlt, FaFacebook } from "react-icons/fa";
import { LoremIpsum } from "react-lorem-ipsum";
import { useNavigate } from "react-router-dom";

export default function StoreCard({ name, thumbnail, socials, url }) {
	const navigate = useNavigate();

	const SocialIcon = (icon) => {
		switch (icon) {
			case "Store":
				return <FaStoreAlt />;
			case "Facebook":
				return <FaFacebook />;
			default:
				return <FaStoreAlt />;
		}
	};
	return (
		<Box
			boxShadow="xl"
			bg="white"
			role={"group"}
			p={6}
			maxW={"330px"}
			w={"full"}
			rounded={"lg"}
			pos={"relative"}
			zIndex={0}
			onClick={() => navigate(`/vendors/${url}`)}
		>
			<Image
				rounded={"lg"}
				height={230}
				width={282}
				objectFit={"cover"}
				src={thumbnail}
				cursor={"pointer"}
				fallbackSrc="https://via.placeholder.com/360"
			/>
			<Heading fontSize="lg">{name}</Heading>

			<Stack direction={"row"}>
				{socials && socials.map((social) => <Button colorScheme="blue">{SocialIcon(social)}</Button>)}
			</Stack>
		</Box>
	);
}
