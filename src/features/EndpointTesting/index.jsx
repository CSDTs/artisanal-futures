import React, { useState, useEffect } from "react";

import axios from "axios";

import { Button, Container, Box, Stack, Text, Heading } from "@chakra-ui/react";

export default function EndpointTesting() {
	const [artisanName, setArtisanName] = useState("");
	const [artisanResponses, setArtisanResponses] = useState({});
	const [fetchData, setFetchData] = useState([]);
	const [responseUpdate, setResponseUpdate] = useState("");

	const handleChange = (setType, event) => {
		setType(event.target.value);
	};

	const handleUpdate = (event) => {
		setResponseUpdate(event.target.value);
	};

	useEffect(() => {
		axios.get("/api/get_artisans").then((response) => {
			setFetchData(response.data);
		});
	}, []);

	const submitArtisan = () => {
		axios.post("/api/add_artisans", { setArtisanName, setArtisanResponses }).then(() => {
			alert("success post");
		});
		console.log(this.state);
		document.location.reload();
	};

	const deleteArtisan = (id) => {
		if (confirm("Do you want to delete? ")) {
			axios.delete(`/api/delete/${id}`);
			document.location.reload();
		}
	};

	const editArtisan = (id) => {
		axios.put(`/api/update/${id}`, { responseUpdate });
		document.location.reload();
	};

	return (
		<Container maxW={"container.lg"}>
			<Heading mb={6} mt={6}>
				Dockerized Fullstack React Application
			</Heading>
			<div className="form">
				<input
					name="setArtisanName"
					placeholder="Enter Artisan Name"
					onChange={(e) => handleChange(setArtisanName, e)}
				/>
				<input
					name="setArtisanResponses"
					placeholder="Enter Responses (JSON String)"
					onChange={(e) => handleChange(artisanResponses, e)}
				/>
			</div>
			<Button my={2} onClick={submitArtisan}>
				Submit
			</Button>{" "}
			<br />
			<br />
			<Container>
				<Stack>
					{fetchData.map((val, key) => (
						<Box>
							<Text>{val.book_name}</Text>
							<Text>{val.book_review}</Text>
							<input name="reviewUpdate" onChange={this.handleUpdate} placeholder="Update Review"></input>
							<Button
								onClick={() => {
									editArtisan(val.id);
								}}
							>
								Update
							</Button>
							<Button
								onClick={() => {
									deleteArtisan(val.id);
								}}
							>
								Delete
							</Button>
						</Box>
					))}
				</Stack>
			</Container>
		</Container>
	);
}
