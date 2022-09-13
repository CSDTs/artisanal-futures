import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
	ButtonGroup,
	Center,
	Editable,
	EditableInput,
	EditablePreview,
	EditableTextarea,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Tooltip,
	useColorModeValue,
	useEditableControls,
} from "@chakra-ui/react";

function EditableControls() {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

	return isEditing ? (
		<ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
			<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
			<IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
		</ButtonGroup>
	) : null;
}

export default function EditableLabel() {
	return (
		<Editable
			defaultValue={`New Expense  ✏️`}
			isPreviewFocusable={true}
			selectAllOnFocus={true}
			textAlign="left"
			w={"100%"}
		>
			<Tooltip label="Click to edit">
				<Center>
					<EditablePreview
						py={2}
						px={4}
						_hover={{
							background: useColorModeValue("gray.100", "gray.700"),
						}}
						w={"100%"}
					></EditablePreview>
				</Center>
			</Tooltip>
			<Input as={EditableInput} />
			<EditableControls />
		</Editable>
	);
}
