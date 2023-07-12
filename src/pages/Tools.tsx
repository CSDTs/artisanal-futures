import ToolCard from "@/components/Cards/ToolCard";
import PageContainer from "@/components/UI/PageContainer";

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
			image: "img/shop_rate.png",
			callback: () => navigate("/shop-rate-calculator"),
		},
		{
			title: "Optimize Routing",
			subtitle: "Optimize your delivery route",
			type: "Logistics",
			image: "img/route_optimization.png",
			callback: () => window.open("https://af-routing-app.vercel.app/"),
		},
		{
			title: "Craft Recomposition",
			subtitle: "Break down an image into its bill of materials",
			type: "Logistics",
			image: "img/craft_composition.png",
			callback: () => navigate("/craft-recomposition"),
		},
		{
			title: "AI for Cloth",
			subtitle: "Generate cloth patterns using AI",
			type: "Design",
			image: "img/ai_cloth.png",
			callback: () => navigate("/pattern-generator"),
		},
	];

	return (
		<PageContainer {...pageInfo}>
			<div className="flex flex-col md:flex-row md:flex-wrap h-fit">
				{tools.map((tool, index) => (
					<div className="basis-full md:basis-1/2 lg:basis-1/4 flex p-4 " key={index}>
						<ToolCard {...tool} />
					</div>
				))}
			</div>
		</PageContainer>
	);
};
export default ToolsPage;
