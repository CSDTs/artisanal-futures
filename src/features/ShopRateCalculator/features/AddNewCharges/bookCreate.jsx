import React from "react";

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
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineHomeWork, MdOutlineElectricalServices, MdLocalGasStation, MdNewReleases } from "react-icons/md";
const BookList = (props) => {
	return props.bookDetails.map((val, idx) => {
		let name = `name-${idx}`,
			author = `author-${idx}`,
			dateOfPublish = `dateOfPublish-${idx}`,
			type = `type-${idx}`,
			price = `price-${idx}`;
		return (
			<div className="form-row" key={val.index}>
				{/* <div className="col">
					<label>Name</label>
					<input type="text" className="form-control required" placeholder="Name" name="name" data-id={idx} id={name} />
				</div>
				<div className="col">
					<label>Author</label>
					<input
						type="text"
						className="form-control required"
						placeholder="Author"
						name="author"
						id={author}
						data-id={idx}
					/>
				</div>
				<div className="col">
					<label>Type</label>
					<select className="form-control" name="type" id={type} data-id={idx}>
						<option>Select</option>
						<option>Biography</option>
						<option>Cooking</option>
						<option>Computer Programming</option>
						<option>Dictionary</option>
						<option>Fiction</option>
						<option>Horror</option>
						<option>Journalism</option>
					</select>
				</div>
				<div className="col">
					<label>Date of Publish</label>
					<input
						type="date"
						className="form-control"
						placeholder="Enter Date"
						name="dateOfPublish"
						id={dateOfPublish}
						data-id={idx}
					/>
				</div>
				<div className="col">
					<label>Price</label>
					<input type="text" className="form-control" placeholder="Price" name="price" id={price} data-id={idx} />
				</div>
				<div className="col p-4">
					{idx === 0 ? (
						<button onClick={() => props.add()} type="button" className="btn btn-primary text-center">
							<i className="fa fa-plus-circle" aria-hidden="true" />
							Add
						</button>
					) : (
						<button className="btn btn-danger" onClick={() => props.delete(val)}>
							<i className="fa fa-minus" aria-hidden="true" />
							Delete
						</button>
					)}
				</div> */}{" "}
				<InputGroup mt={4} mb={4}>
					<InputLeftElement pointerEvents="none" children={<MdNewReleases color="gray.300" />} />
					<Input
						type="text"
						placeholder={`Name of Expense: `}
						bg={"gray.100"}
						border={0}
						color={"gray.500"}
						_placeholder={{
							color: "gray.500",
						}}
						id={name}
						name="name"
						data-id={idx}
						// handleCost={(e) => console.log(e)}
						// onChange={(e) => {
						// 	element.value = parseFloat(e.target.value);
						// }}
						// defaultValue={element.value}
					/>
					<Input
						type="number"
						placeholder={`Cost  ${idx}`}
						bg={"gray.100"}
						border={0}
						color={"gray.500"}
						_placeholder={{
							color: "gray.500",
						}}
						id={price}
						name="price"
						data-id={idx}
						// handleCost={(e) => console.log(e)}
						// onChange={(e) => {
						// 	element.value = parseFloat(e.target.value);
						// }}
						// defaultValue={element.value}
					/>
					<InputRightElement onClick={() => props.delete(val)} children={<FaTrash color="gray.300" />} />
				</InputGroup>
			</div>
		);
	});
};
export default BookList;
