import PageContainer from "@/components/UI/PageContainer";
import MeasurementBox from "@/features/apps/PatternGenerator/components/MeasurementBox";

const PatternGenerator = () => {
	const pageInfo = {
		title: "Pattern Generator",
		subtitle: "Generate a clothing pattern for your next project",
	};
	return (
		<PageContainer {...pageInfo}>
			<section className="mx-auto">
				<MeasurementBox />
			</section>
		</PageContainer>
	);
};

export default PatternGenerator;
