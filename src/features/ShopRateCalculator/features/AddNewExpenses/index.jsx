import NewCost from "./NewExpense";

import { FaPlus } from "react-icons/fa";

import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

class AddNewExpenses extends React.Component {
	state = {
		expenseDetails: [],
	};
	handleChange = (e) => {
		if (["name", "price"].includes(e.target.name)) {
			let expenseDetails = [...this.state.expenseDetails];
			expenseDetails[e.target.dataset.id][e.target.name] = e.target.value;
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}

		this.props.handleCost(
			[...this.state.expenseDetails].reduce((accum, current) => {
				return accum + parseFloat(current.price || 0);
			}, 0)
		);
	};
	addNewRow = (e) => {
		this.setState((prevState) => ({
			expenseDetails: [
				...prevState.expenseDetails,
				{
					index: Math.random(),
					name: "",
					price: "",
				},
			],
		}));
	};

	clickOnDelete = (record) => {
		this.props.handleCost(
			[...this.state.expenseDetails.filter((r) => r !== record)].reduce((accum, current) => {
				return accum + parseFloat(current.price || 0);
			}, 0)
		);

		this.setState({
			expenseDetails: this.state.expenseDetails.filter((r) => r !== record),
		});
	};

	render() {
		let { expenseDetails } = this.state;
		return (
			<>
				<Stack direction={["row"]} spacing="24px" w={"100%"} justifyItems="center" py={4}>
					<Text
						w={"100%"}
						textAlign="right"
						display={"inline-flex"}
						alignItems={"center"}
						justifyContent={"end"}
						fontWeight="semibold"
					>
						Additional Charges
					</Text>
					<Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"} onClick={this.addNewRow}>
						<FaPlus color="gray.300" />
					</Button>
				</Stack>

				<form onChange={this.handleChange}>
					<NewCost
						add={this.addNewRow}
						delete={this.clickOnDelete.bind(this)}
						expenseDetails={expenseDetails}
						handleChange={this.props.handleChange}
					/>
				</form>
			</>
		);
	}
}

export default AddNewExpenses;
