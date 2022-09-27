import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

const PanelNavigation = ({ handlePrev, handleNext, prevColor, isSubmit = false, handleSubmit = null }) => {
	const [loading, setLoading] = useState(false);
	return (
		<Flex justify={handlePrev ? "space-between" : "end"}>
			{handlePrev && (
				<Button
					variant="no-hover"
					bg={prevColor}
					alignSelf="flex-end"
					mt="24px"
					w={{ sm: "75px", lg: "100px" }}
					h="35px"
					onClick={handlePrev}>
					<Text fontSize="xs" color="gray.700" fontWeight="bold">
						PREV
					</Text>
				</Button>
			)}
			{handleNext && !isSubmit && (
				<Button
					variant="no-hover"
					bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
					alignSelf="flex-end"
					mt="24px"
					w={{ sm: "75px", lg: "100px" }}
					h="35px"
					onClick={isSubmit ? handleSubmit : handleNext}>
					<Text fontSize="xs" color="#fff" fontWeight="bold">
						{isSubmit ? "SUBMIT" : "NEXT"}
					</Text>
				</Button>
			)}

			{handleNext && isSubmit && (
				<Button
					variant="no-hover"
					bg="linear-gradient(81.62deg, #f13860 2.25%, #f51928 79.87%)"
					alignSelf="flex-end"
					mt="24px"
					w={{ sm: "75px", lg: "100px" }}
					h="35px"
					onClick={() => {
						setLoading(true);
						handleSubmit().then(() => setLoading(false));
					}}
					isLoading={loading}>
					<Text fontSize="xs" color="#fff" fontWeight="bold">
						SUBMIT
					</Text>
				</Button>
			)}
		</Flex>
	);
};

PanelNavigation.propTypes = {
	handlePrev: PropTypes.func,
	handleNext: PropTypes.func,
	prevColor: PropTypes.string,
	isSubmit: PropTypes.bool,
	handleSubmit: PropTypes.func,
};

export default PanelNavigation;
