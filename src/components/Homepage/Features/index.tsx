import { Icon } from "@chakra-ui/react";
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

	const handleClick = (link?: string, callback?: () => void) => {
		if (callback) return callback();
		navigate(link ?? "/");
	};

	return (
		<div className="p-4 mt-12 bg-slate-200">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10">
				{FEATURE_DATA.map((feature, index) => (
					<div key={"feature-" + index}>
						<FeatureCard
							icon={<Icon as={feature.icon} w={10} h={10} />}
							title={feature.title}
							text={feature.text}
							onClick={() => handleClick(feature?.link, feature?.callback)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export default Features;
