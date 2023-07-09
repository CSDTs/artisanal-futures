import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import { FC } from "react";
import EditableLabel from "./EditableLabel";

type ExpenseDetail = {
	index: number;
	name: string;
	price: string;
};

interface IProps {
	expenseDetails: ExpenseDetail[];
	deleteCost: (record: ExpenseDetail) => void;
	handleChange: (e: any) => void;
}
const NewExpense: FC<IProps> = ({ expenseDetails, deleteCost, handleChange }) => {
	return expenseDetails.map((val, idx) => {
		let name = `name-${idx}`,
			price = `price-${idx}`;
		return (
			<div className="form-row" key={val.index}>
				<InputGroup mt={4} mb={4}>
					<span id={name} data-id={idx} className="w-6/12">
						<EditableLabel />
					</span>

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
						onChange={handleChange}
					/>
					<InputRightElement onClick={() => deleteCost(val)} children={<FaTrash color="gray.300" />} />
				</InputGroup>
			</div>
		);
	});
};
export default NewExpense;
