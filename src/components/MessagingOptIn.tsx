import React, { useState } from "react";

// Define the Props type for the component
interface OptInMessagingProps {
	onOptInChange?: (optedIn: boolean) => void;
}

const MessagingOptIn: React.FC<OptInMessagingProps> = ({ onOptInChange }) => {
	// State to keep track of whether the user has opted in or not
	const [optedIn, setOptedIn] = useState(false);

	// Handler for when the checkbox is toggled
	const handleOptInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newOptedIn = event.target.checked;
		setOptedIn(newOptedIn);

		// Call the onOptInChange prop if provided
		if (onOptInChange) {
			onOptInChange(newOptedIn);
		}
	};

	return (
		<article className="prose lg:prose-xl">
			<p>
				Opt-in to receive delivery updates and routing information from business owners. You can still use the routing
				app normally without opting in.
			</p>

			<p>
				By opting into the messaging service for Artisanal Futures Routing, you agree to receive delivery updates,
				routing information, and other relevant communications from business owners associated with Artisanal Futures.
				Opting into this service is voluntary, and you can continue to use the routing application as normal without
				opting in.
			</p>

			<p>
				By opting in, you consent to the collection, storage, and processing of your contact information for the purpose
				of receiving the messaging service. You represent and warrant that you have the legal authority to provide this
				consent and that you will comply with all applicable laws related to your use of the service, including privacy
				laws, telecommunications regulations, and data protection statutes.
			</p>

			<p>
				Artisanal Futures reserves the right to use, disclose, and transfer the information collected through the
				messaging service as required by law, as part of a merger or acquisition, or as specified in our Privacy Policy.
				We take appropriate measures to protect your information and use it only for the purposes for which it was
				collected.
			</p>

			<p>
				You may opt-out of the messaging service at any time through the Artisanal Futures Routing application or by
				contacting our support team. Upon opting out, you will no longer receive messages through this service, but your
				previous data may be retained in accordance with our data retention policies.
			</p>

			<p>
				We reserve the right to modify, suspend, or terminate the messaging service at any time without notice. Any
				changes to the terms of service, including this opt-in agreement, will be communicated through the Artisanal
				Futures Routing application or other appropriate means. Your continued use of the messaging service following
				any changes constitutes your acceptance of the updated terms.
			</p>

			<p>
				Failure to comply with these terms may result in termination of your access to the messaging service and other
				remedies as available under applicable law. By opting into this service, you agree to indemnify and hold
				harmless Artisanal Futures and its affiliates, officers, agents, and employees from any claims, damages, losses,
				or expenses, including reasonable attorneys' fees, arising from your use of the service or violation of these
				terms.
			</p>
			<label>
				<input type="checkbox" checked={optedIn} onChange={handleOptInChange} />
				Opt in to Messaging Service
			</label>
		</article>
	);
};

export default MessagingOptIn;
