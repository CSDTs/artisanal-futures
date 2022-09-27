import { Checkbox, Flex, FormLabel, Icon, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useId } from "react";

const OptInIcon = ({ isSelected, handleOnChange, CheckIcon, checkName }) => {
	const iconColor = useColorModeValue("gray.300", "gray.700");
	const id = useId();
	return (
		<FormLabel htmlFor={id} w="150px" h="150px" cursor="pointer" mb="16px">
			<Flex
				w="100%"
				h="100%"
				borderRadius="12px"
				justify="center"
				transition=".5s all ease"
				border="1px solid lightgray"
				align="center"
				bg={isSelected ? "teal.300" : "#fff"}>
				<Checkbox
					id={id}
					isChecked={isSelected}
					onChange={() =>
						handleOnChange((checkboxes) => {
							return {
								...checkboxes,
								[checkName]: !checkboxes[checkName],
							};
						})
					}
					display="none"
				/>
				<Icon as={CheckIcon} w="54px" h="54px" color={isSelected ? "#fff" : iconColor} />
			</Flex>
		</FormLabel>
	);
};

OptInIcon.propTypes = {
	isSelected: PropTypes.bool,
	handleOnChange: PropTypes.func,
	CheckIcon: PropTypes.func,
	checkName: PropTypes.string,
};

export default OptInIcon;
