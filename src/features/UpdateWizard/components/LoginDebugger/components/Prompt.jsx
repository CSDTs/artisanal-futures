import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import PromptBody from "./PromptBody";

import { useEffect } from "react";
import WizardService from "../../../services/wizard.service";
export default function Prompt({ payload }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let token = "";

	const getToken = () => {
		onOpen();
		if (payload.password != "")
			WizardService.getToken(payload).then((data) => {
				console.log(data);
				let token2 = data;
				console.log(token2);
			});
	};

	return (
		<>
			<Button onClick={getToken}>Log Back In</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login Debugger</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Unable to submit changes. Incorrect / missing password.
						{/* <FormControl isDisabled>
							<FormLabel fontSize="xs" fontWeight="bold">
								Email Address
							</FormLabel>
							<Input
								borderRadius="15px"
								placeholder="eg. example@address.com"
								fontSize="xs"
								type="email"
								value={payload.username}
							/>
						</FormControl>
						<FormControl isDisabled>
							<FormLabel fontSize="xs" fontWeight="bold">
								Password
							</FormLabel>
							<Input
								borderRadius="15px"
								placeholder="eg. secret123"
								fontSize="xs"
								type="password"
								value={payload.password}
							/>
						</FormControl>
						{token}
						<FormControl>
							<FormLabel fontSize="xs" fontWeight="bold">
								Token
							</FormLabel>
							<Input borderRadius="15px" placeholder="eg. secret123" fontSize="xs" type="text" value={token} />
						</FormControl>
						<PromptBody /> */}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} colorScheme="red">
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
