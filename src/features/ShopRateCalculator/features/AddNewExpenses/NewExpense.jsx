import { chakra, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import EditableLabel from "./EditableLabel";

const NewExpense = (props) => {
	return props.expenseDetails.map((val, idx) => {
		let name = `name-${idx}`,
			price = `price-${idx}`;
		return (
			<div className="form-row" key={val.index}>
				<InputGroup mt={4} mb={4}>
					<chakra.span id={name} name="name" data-id={idx} w="50%">
						<EditableLabel />
					</chakra.span>

					<Input
						type="number"
						placeholder={`e.g  $59.99`}
						bg={"gray.100"}
						border={0}
						color={"gray.500"}
						_placeholder={{
							color: "gray.500",
						}}
						id={price}
						name="price"
						data-id={idx}
						w={"60%"}
					/>
					<InputRightElement onClick={() => props.delete(val)} children={<FaTrash color="gray.300" />} />
				</InputGroup>
			</div>
		);
	});
};
export default NewExpense;
