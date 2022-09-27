import { Box, Icon, SimpleGrid } from "@chakra-ui/react";
import { FcGraduationCap, FcServices, FcShop } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import FeatureCard from "./FeatureCard";

const FEATURE_DATA = [
	{
		icon: FcShop,
		title: "Shop Our Stores",
		text: "Browse our artisans' shops and webpages",
		link: "/artisans",
	},
	{
		icon: FcGraduationCap,
		title: "Share Knowledge",
		text: "Share your artisanal knowledge with others",
		callback: () => {
			window.location.href = import.meta.env.VITE_FORUM_URL;
		},
	},
	{
		icon: FcServices,
		title: "Utilize Free Tools",
		text: "Use our collection of free tools",
		link: "/tools",
	},
];

const Features = () => {
	const navigate = useNavigate();

	const handleClick = (callback, link) => {
		if (callback) return callback();
		navigate(link ?? "/");
	};

	return (
		<Box p={4} bg={"gray.200"} mt={"3rem"}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, md: 10 }}>
				{FEATURE_DATA.map((feature, index) => (
					<Box key={"feature-" + index}>
						<FeatureCard
							icon={<Icon as={feature.icon} w={10} h={10} />}
							title={feature.title}
							text={feature.text}
							onClick={() => handleClick(feature?.callback, feature?.link)}
						/>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
};
export default Features;
