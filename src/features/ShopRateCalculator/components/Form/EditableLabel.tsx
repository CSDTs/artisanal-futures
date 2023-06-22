import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
	ButtonGroup,
	Center,
	Editable,
	EditableInput,
	EditablePreview,
	IconButton,
	Input,
	Tooltip,
	useEditableControls,
} from "@chakra-ui/react";

function EditableControls() {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls();

	return isEditing ? (
		<ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
			<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="Approve Change" />
			<IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} aria-label="Deny Change" />
		</ButtonGroup>
	) : null;
}

const EditableLabel = () => {
	return (
		<Editable
			defaultValue={`New Expense  ✏️`}
			isPreviewFocusable={true}
			selectAllOnFocus={true}
			textAlign="left"
			w={"100%"}>
			<Tooltip label="Click to edit">
				<Center>
					<EditablePreview
						py={2}
						px={4}
						_hover={{
							background: "gray.100",
						}}
						w={"100%"}></EditablePreview>
				</Center>
			</Tooltip>
			<Input as={EditableInput} />
			<EditableControls />
		</Editable>
	);
};
export default EditableLabel;
