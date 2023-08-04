import PageContainer from "@/components/UI/PageContainer";
import ShopRateCalculator from "@/features/apps/ShopRateCalculator";

const ShopRatePage = () => {
	const pageInfo = {
		title: "Shop Rate Calculator",
		subtitle: "Calculate the cost of your shop per hour",
	};
	return (
		<PageContainer {...pageInfo}>
			<ShopRateCalculator />
		</PageContainer>
	);
};

export default ShopRatePage;
