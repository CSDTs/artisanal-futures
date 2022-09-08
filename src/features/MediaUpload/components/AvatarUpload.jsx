import { Avatar, Box, chakra, Flex, FormControl, FormLabel, Stack, Text, VisuallyHidden } from "@chakra-ui/react";

import { useEffect, useId, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

export default function AvatarUpload({ selectedFile, heading, fileType, setSelectedFile, updateOverride }) {
	const [preview, setPreview] = useState();
	const id = useId();
	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(fileType, undefined);
			return;
		}

		// I've kept this example simple by using the first image instead of multiple
		setSelectedFile(fileType, e.target.files[0]);
	};

	return (
		<FormControl>
			<FormLabel
				fontSize="sm"
				fontWeight="md"
				color="gray.700"
				_dark={{
					color: "gray.50",
				}}>
				{heading}
			</FormLabel>
			<Flex
				mt={1}
				justify="center"
				px={6}
				pt={5}
				pb={6}
				borderWidth={2}
				_dark={{
					color: "gray.500",
				}}
				borderStyle="dashed"
				rounded="md">
				<Stack spacing={1} textAlign="center" cursor={"pointer"}>
					<chakra.label
						htmlFor="file-upload"
						cursor="pointer"
						rounded="md"
						fontSize="md"
						color="brand.600"
						_dark={{
							color: "brand.200",
						}}
						pos="relative"
						_hover={{
							color: "brand.400",
							_dark: {
								color: "brand.300",
							},
						}}>
						<Box w={"100%"} justifyContent="center" display={"flex"}>
							{!selectedFile && !updateOverride && (
								<Avatar bg="gray.300" icon={<FaUserAlt fontSize="2.5rem" />} size="xl" />
							)}
							{selectedFile && <Avatar bg="gray.300" src={preview} size="xl" />}
							{updateOverride && !preview && <Avatar bg="gray.300" src={updateOverride} size="xl" />}
							{/* <FaUserAlt mx="auto" fontSize={48} /> */}
						</Box>

						<Flex
							fontSize="sm"
							color="gray.600"
							_dark={{
								color: "gray.400",
							}}
							alignItems="baseline">
							<VisuallyHidden>
								<input id="file-upload" name="file-upload" type="file" onChange={onSelectFile} />
							</VisuallyHidden>
						</Flex>
						{!selectedFile && (
							<Text
								fontSize="xs"
								color="gray.500"
								_dark={{
									color: "gray.50",
								}}>
								PNG, JPG, GIF up to 10MB
							</Text>
						)}
					</chakra.label>
				</Stack>
			</Flex>
		</FormControl>
	);
}
