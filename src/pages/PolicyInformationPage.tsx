import PageContainer from "@/components/PageContainer";

const policies = {
	"terms-of-service": {
		name: "Terms of Service",
		data: "/terms-of-service",
	},
	privacy: {
		name: "Privacy Policy",
		data: "/privacy",
	},
	faq: {
		name: "Frequently Asked Questions",
		data: "/frequently-asked",
	},
};
const PolicyInformationPage = () => {
	const pageInfo = {
		title: "Artisanal Futures Legal Policies",
		subtitle: "Take a look at our policies and guidelines",
	};

	return (
		<PageContainer {...pageInfo}>
			<ul className="space-y-4 list-disc list-inside text-blue-500   my-5">
				{Object.keys(policies).map((policy) => (
					<li key={policy} className="hover:text-blue-600 hover:underline transition-all ">
						<a href={`/policies/${policy}`}>{policies[policy as keyof typeof policies].name}</a>
					</li>
				))}
			</ul>
		</PageContainer>
	);
};

export default PolicyInformationPage;
