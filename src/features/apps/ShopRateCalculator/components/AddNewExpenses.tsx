import React, {
	ChangeEvent,
	Dispatch,
	FC,
	FormEvent,
	FormEventHandler,
	SetStateAction,
	useCallback,
	useState,
} from "react";
import NewExpense from "./Form/NewExpense";

import { FaPlus } from "react-icons/fa";

import { Button, Stack, Text } from "@chakra-ui/react";

type ExpenseDetail = {
	index: number;
	name: string;
	price: string;
};

interface Props {
	handleCost: Dispatch<SetStateAction<number>>;
}

const AddNewExpenses: FC<Props> = ({ handleCost }) => {
	const [expenseDetails, setExpenseDetails] = useState<ExpenseDetail[]>([]);

	const calculateCost = useCallback((costs: ExpenseDetail[]) => {
		handleCost(
			[...costs].reduce((acc, current) => {
				return acc + parseFloat(`${current.price || 0}`);
			}, 0)
		);
	}, []);

	const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as typeof e.target & HTMLInputElement;
		if (["name", "price"].includes(target.name)) {
			const newExpenseDetails = [...expenseDetails];
			const id = Number(target.dataset.id);
			if (!isNaN(id)) {
				newExpenseDetails[id] = { ...newExpenseDetails[id], [target.name]: target.value };
				calculateCost(newExpenseDetails); // Calculate cost with newExpenseDetails
				setExpenseDetails(newExpenseDetails);
			}
		}
	};

	const addNewRow = () => {
		setExpenseDetails((prevState) => [
			...prevState,
			{
				index: Math.random(),
				name: "",
				price: "",
			},
		]);
	};

	const clickOnDelete = (record: ExpenseDetail) => {
		const newExpenseDetails = expenseDetails.filter((r) => r !== record);
		calculateCost(newExpenseDetails);
		setExpenseDetails(newExpenseDetails);
	};

	return (
		<>
			<Stack direction={["row"]} spacing="24px" w={"100%"} justifyItems="center" py={4}>
				<Text
					w={"100%"}
					textAlign="right"
					display={"inline-flex"}
					alignItems={"center"}
					justifyContent={"end"}
					fontWeight="semibold">
					Additional Charges
				</Text>
				<Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"} onClick={addNewRow}>
					<FaPlus color="gray.300" />
				</Button>
			</Stack>

			<form>
				<NewExpense deleteCost={clickOnDelete} expenseDetails={expenseDetails} handleChange={handleStateChange} />
			</form>
		</>
	);
};

export default AddNewExpenses;
