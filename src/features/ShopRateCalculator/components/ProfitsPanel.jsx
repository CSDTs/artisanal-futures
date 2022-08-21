import {
	Box,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Stack,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ProfitsPanel({ sliderValue, setSliderValue }) {
	const [showTooltip, setShowTooltip] = useState(false);
	return (
		<>
			<Stack spacing={4} marginTop="1rem">
				<Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
					Percentage Profit
				</Heading>
				<Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
					None of the previous fields gives you a profit, so adjust the percentage to get one.
				</Text>
			</Stack>
			<Box as={"form"} mt={10}>
				<Slider
					id="slider"
					defaultValue={0}
					min={0}
					max={100}
					colorScheme="teal"
					onChange={(v) => setSliderValue(v)}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
				>
					<SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
						25%
					</SliderMark>
					<SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
						50%
					</SliderMark>
					<SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
						75%
					</SliderMark>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<Tooltip hasArrow bg="teal.500" color="white" placement="top" isOpen={showTooltip} label={`${sliderValue}%`}>
						<SliderThumb />
					</Tooltip>
				</Slider>
			</Box>
		</>
	);
}
