import {
	Avatar,
	Link,
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Icon,
	Input,
	Stack,
	VisuallyHidden,
	chakra,
	Tab,
	TabList,
	Switch,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
	useDisclosure,
	FormHelperText,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState, useId } from "react";
export default function ImageUpload({ selectedFile, heading, fileType, setSelectedFile, updateOverride }) {
	const [preview, setPreview] = useState();

	useEffect(() => {
		setSelectedFile("preview", preview);
	}, [preview]);
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
				}}
			>
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
				rounded="md"
			>
				<Stack spacing={1} textAlign="center">
					{!selectedFile && !updateOverride && (
						<Icon
							mx="auto"
							boxSize={12}
							color="gray.400"
							_dark={{
								color: "gray.500",
							}}
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</Icon>
					)}
					{selectedFile && <img src={preview} />}
					{updateOverride && !preview && <img src={updateOverride} />}
					<Flex
						fontSize="sm"
						color="gray.600"
						_dark={{
							color: "gray.400",
						}}
						alignItems="baseline"
					>
						<chakra.label
							htmlFor={id}
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
							}}
						>
							{!selectedFile && <span>Upload a file</span>}
							<VisuallyHidden>
								<input id={id} name={id} type="file" onChange={onSelectFile} />
							</VisuallyHidden>
						</chakra.label>
						{!selectedFile && <Text pl={1}>or drag and drop</Text>}
					</Flex>
					<Text
						fontSize="xs"
						color="gray.500"
						_dark={{
							color: "gray.50",
						}}
					>
						PNG, JPG, GIF up to 10MB
					</Text>
				</Stack>
			</Flex>
		</FormControl>
	);
}
