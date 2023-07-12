import { useNavigate } from "react-router-dom";
import HeroData from "./HeroData";
import HeroImage from "./HeroImage";
const Hero = () => {
	const navigate = useNavigate();

	return (
		<div className="relative mt-10 overflow-hidden bg-white">
			<HeroData
				title="Artisanal Futures"
				description="Shop worker-owned stores, share knowledge and tech, & participate in the transition to a decolonized circular economy."
				callToAction={{ text: "Browse Our Artisans", callback: () => navigate("/artisans") }}
			/>
			<HeroImage url="img/hero.jpg" alt="Hero image of man from African Futurist Collective" />
		</div>
	);
};

export default Hero;
