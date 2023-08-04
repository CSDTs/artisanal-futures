import MessagingOptIn from "@/components/MessagingOptIn";
import PageContainer from "@/components/UI/PageContainer";
import { FC, useState } from "react";

const RoutingOptInPage = () => {
	const handleOptInChange = (optedIn: boolean) => {
		// Handle the opt-in change here, e.g., send the new status to a server
		console.log(`Opted in: ${optedIn}`);
	};

	const pageInfo = {
		title: "Artisanal Futures Messaging Service",
	};
	return (
		<PageContainer {...pageInfo}>
			<MessagingOptIn onOptInChange={handleOptInChange} />
		</PageContainer>
	);
};

export default RoutingOptInPage;
