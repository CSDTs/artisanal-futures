import { Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeroData from "./HeroData";
import HeroImage from "./HeroImage";

const Hero = () => {
	const navigate = useNavigate();
	const bg = useColorModeValue("white", "gray.800");
	return (
		<Box pos="relative" overflow="hidden" bg={bg} mt={10}>
			<HeroData
				title="Artisanal Futures"
				description="Shop worker-owned stores, share knowledge and tech, & participate in the transition to a decolonized circular economy."
				bg={bg}
				callToAction={{ text: "Browse Our Artisans", callback: () => navigate("/artisans") }}
			/>
			<HeroImage url="img/hero.jpg" alt="Hero image of man from African Futurist Collective" />
		</Box>
	);
};

export default Hero;
