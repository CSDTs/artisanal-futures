import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import PromptBody from "./PromptBody";
export default function Prompt() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>Log Back In</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<PromptBody />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
