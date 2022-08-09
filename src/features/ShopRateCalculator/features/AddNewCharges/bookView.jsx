import React from "react";
import BookList from "./bookCreate";

import { FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineHomeWork, MdOutlineElectricalServices, MdLocalGasStation, MdNewReleases } from "react-icons/md";

import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Container,
	Input,
	Button,
	SimpleGrid,
	Avatar,
	AvatarGroup,
	useBreakpointValue,
	Icon,
	TabPanel,
	TabPanels,
	Tab,
	Tabs,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	TabList,
	List,
	ListIcon,
	ListItem,
	FormControl,
	Slider,
	SliderMark,
	Tooltip,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

class BookView extends React.Component {
	state = {
		bookDetails: [
			{
				index: Math.random(),
				name: "",
				author: "",
				type: "",
				dateOfPublish: "",
				price: "",
			},
		],
	};
	handleChange = (e) => {
		if (["name", "author", "type", "dateOfPublish", "price"].includes(e.target.name)) {
			let bookDetails = [...this.state.bookDetails];
			bookDetails[e.target.dataset.id][e.target.name] = e.target.value;
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}

		// console.log(
		// 	[...this.state.bookDetails].reduce((accum, current) => {
		// 		return accum + parseFloat(current.price || 0);
		// 	}, 0)
		// );

		this.props.handleCost(
			[...this.state.bookDetails].reduce((accum, current) => {
				return accum + parseFloat(current.price || 0);
			}, 0)
		);
	};
	addNewRow = (e) => {
		this.setState((prevState) => ({
			bookDetails: [
				...prevState.bookDetails,
				{
					index: Math.random(),
					name: "",
					author: "",
					type: "",
					dateOfPublish: "",
					price: "",
				},
			],
		}));
	};

	deteteRow = (index) => {
		this.setState({
			bookDetails: this.state.bookDetails.filter((s, sindex) => index !== sindex),
		});
	};

	clickOnDelete(record) {
		this.setState({
			bookDetails: this.state.bookDetails.filter((r) => r !== record),
		});
	}

	// componentDidUpdate() {
	// 	this.props.handleCost(
	// 		[...this.state.bookDetails].reduce((accum, current) => {
	// 			return accum + parseFloat(current.price || 0);
	// 		}, 0)
	// 	);
	// 	console.log(
	// 		[...this.state.bookDetails].reduce((accum, current) => {
	// 			return accum + parseFloat(current.price || 0);
	// 		}, 0)
	// 	);
	// }
	render() {
		let { bookDetails } = this.state;
		return (
			<>
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<BookList
						add={this.addNewRow}
						delete={this.clickOnDelete.bind(this)}
						bookDetails={bookDetails}
						handleChange={this.props.handleChange}
					/>
				</form>

				<Stack direction={["row"]} spacing="24px" w={"100%"} justifyItems="center">
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
			</>
		);
	}
}
export default BookView;
