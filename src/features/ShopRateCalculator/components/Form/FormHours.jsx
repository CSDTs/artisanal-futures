import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";

import { Ri24HoursFill } from "react-icons/ri";

export default function FormHours({ handleHours }) {
	return (
		<Stack mt={4}>
			<InputGroup>
				<InputLeftElement pointerEvents="none" children={<Ri24HoursFill color="gray.300" />} />
				<Input
					type="number"
					placeholder={"Number of hours (est.)"}
					bg={"gray.100"}
					border={0}
					color={"gray.500"}
					_placeholder={{
						color: "gray.500",
					}}
					onChange={(e) => handleHours(parseFloat(e.target.value))}
				/>
			</InputGroup>
		</Stack>
	);
}
