import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import { FC, useState } from "react";

interface IProps {
	sliderValue: number;
	setSliderValue: (v: number) => void;
}
const ProfitsPanel: FC<IProps> = ({ sliderValue, setSliderValue }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	return (
		<>
			<div className="flex flex-col gap-4 mt-4">
				<h2 className="text-2xl font-semibold leading-5 text-slate-800 sm:text-3xl md:text-4xl">Percentage Profit</h2>
				<p className="text-base text-slate-500">
					None of the previous fields gives you a profit, so adjust the percentage to get one.
				</p>
			</div>
			<form className="mt-10">
				<Slider
					id="slider"
					defaultValue={0}
					min={0}
					max={100}
					colorScheme="teal"
					onChange={(v) => setSliderValue(v)}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}>
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
			</form>
		</>
	);
};

export default ProfitsPanel;
