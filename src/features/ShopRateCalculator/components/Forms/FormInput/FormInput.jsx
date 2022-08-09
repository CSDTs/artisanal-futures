import { InputGroup, InputLeftElement, InputRightElement, Input } from "@chakra-ui/react";
export default function FormInput({ title, Icon, handleCost }) {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none" children={<Icon color="gray.300" />} />
			<Input
				type="number"
				placeholder={title}
				bg={"gray.100"}
				border={0}
				color={"gray.500"}
				_placeholder={{
					color: "gray.500",
				}}
				onKeyUp={(e) => {
					handleCost(parseInt(e.target.value) || 0);
				}}
			/>
		</InputGroup>
	);
}
