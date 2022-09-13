import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
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
					{/* <ModalHeader>Modal Title</ModalHeader> */}
					<ModalCloseButton />
					<ModalBody>
						<PromptBody />
					</ModalBody>
					{/* <ModalFooter>
						<Button onClick={onClose} colorScheme="red">
							Cancel
						</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</>
	);
}
