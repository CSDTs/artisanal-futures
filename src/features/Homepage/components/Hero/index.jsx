import { Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeroData from "./HeroData";
import HeroImage from "./HeroImage";
export default function Hero() {
	const navigate = useNavigate();
	const bg = useColorModeValue("white", "gray.800");
	return (
		<Box pos="relative" overflow="hidden" bg={bg} mt={10}>
			<HeroData
				title="Artisanal Futures"
				description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
				fugiat veniam occaecat fugiat aliqua."
				bg={bg}
				callToAction={{ text: "Browse Our Artisans", callback: () => navigate("/artisans") }}
			/>
			<HeroImage url="img/hero.jpg" alt="Hero image of man from African Futurist Collective" />
		</Box>
	);
}
