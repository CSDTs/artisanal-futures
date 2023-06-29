import PageContainer from "@/components/PageContainer";
import ToolCard from "@/components/ToolCard";

import { useNavigate } from "react-router-dom";

const ToolsPage = () => {
	const navigate = useNavigate();

	const pageInfo = {
		title: "Utilize Our Tools",
		subtitle: "Browse our current selection of free and open source tools to power up your business workflow",
	};

	const tools = [
		{
			title: "Shop Rate ",
			subtitle: "Calculates per hour cost of your shop",
			type: "Finance",
			image: "img/shoprate.png",
			callback: () => navigate("/shop-rate-calculator"),
		},
		{
			title: "Optimize Routing",
			subtitle: "Optimize your delivery route",
			type: "Logistics",
			image: "img/routing.png",
			callback: () => navigate("/tools/routing"),
		},
		{
			title: "Craft Recomposition",
			subtitle: "Break down an image into its bill of materials",
			type: "Logistics",
			image: "img/routing.png",
			callback: () => navigate("/craft-recomposition"),
		},
	];

	return (
		<PageContainer {...pageInfo}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{tools.map((tool, index) => (
					<ToolCard key={index} {...tool} />
				))}
			</div>
		</PageContainer>
	);
};
export default ToolsPage;
