import React, { useState, useEffect } from "react";

import axios from "axios";

import { Button, Container, Box, Stack, Text, Heading } from "@chakra-ui/react";

export default function EndpointTesting() {
	// const [artisanName, setArtisanName] = useState("");
	// const [artisanResponses, setArtisanResponses] = useState({});
	// const [fetchData, setFetchData] = useState([]);
	// const [responseUpdate, setResponseUpdate] = useState("");

	const [artisanState, setArtisanState] = useState({
		artisanName: "",
		artisanResponses: "",
		fetchData: [],
		responseUpdate: "",
	});

	const handleChange = (event) => {
		let nam = event.target.name;
		let val = event.target.value;

		setArtisanState({ ...artisanState, [nam]: val });
	};

	const handleUpdate = (event) => {
		console.log(event.target.value);
		setArtisanState({ ...artisanState, responseUpdate: event.target.value });
	};

	useEffect(() => {
		axios.get("/api/get_artisans").then((response) => {
			setArtisanState({ ...artisanState, fetchData: response.data });
		});
	}, []);

	useEffect(() => {
		console.log(artisanState);
	}, [artisanState]);

	const submitArtisan = () => {
		axios.post("/api/add_artisans", artisanState).then(() => {
			alert("success post");
		});

		document.location.reload();
	};

	const deleteArtisan = (id) => {
		console.log(id);
		if (confirm("Do you want to delete? ")) {
			axios.delete(`/api/delete/${id}`);
			document.location.reload();
		}
	};

	const editArtisan = (id) => {
		axios.put(`/api/update/${id}`, artisanState);
		document.location.reload();
	};

	return (
		<Container maxW={"container.lg"}>
			<Heading mb={6} mt={6}>
				Dockerized Fullstack React Application
			</Heading>
			<div className="form">
				<input name="artisanName" placeholder="Enter Artisan Name" onChange={(e) => handleChange(e)} />
				<input name="artisanResponses" placeholder="Enter Responses (JSON String)" onChange={(e) => handleChange(e)} />
			</div>
			<Button my={2} onClick={submitArtisan}>
				Submit
			</Button>{" "}
			<br />
			<br />
			<Container>
				<Stack>
					{artisanState.fetchData.map((val, key) => (
						<Box>
							<Text>{val.artisan_name}</Text>
							<Text>{val.artisan_responses}</Text>
							<input name="reviewUpdate" onChange={(e) => handleUpdate(e)} placeholder="Update Review"></input>
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
