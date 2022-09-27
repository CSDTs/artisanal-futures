import { Flex, Icon, Tab, Text } from "@chakra-ui/react";

import { BsCircleFill } from "react-icons/bs";

import PropTypes from "prop-types";

const PanelTab = ({ tabRef, handleClick, next, current, isLast, textColor, title }) => {
	return (
		<Tab ref={tabRef} focus="none" w={{ sm: "120px", md: "250px", lg: "300px" }} onClick={handleClick}>
			<Flex
				direction="column"
				justify="center"
				align="center"
				position="relative"
				_before={{
					content: "''",
					width: { sm: "120px", md: "250px", lg: "300px" },
					height: "3px",
					bg: isLast ? "" : next ? textColor : "gray.200",
					left: { sm: "12px", md: "28px" },
					top: { sm: current ? "6px" : "4px", md: null },
					position: "absolute",
					bottom: current ? "40px" : "38px",
					zIndex: -1,
					transition: "all .3s ease",
				}}>
				<Icon
					as={BsCircleFill}
					color={current ? textColor : "gray.300"}
					w={current ? "16px" : "12px"}
					h={current ? "16px" : "12px"}
					mb="8px"
				/>
				<Text
					color={current ? { textColor } : "gray.300"}
					fontWeight={current ? "bold" : "normal"}
					transition="all .3s ease"
					fontSize="sm"
					_hover={{ color: textColor }}
					display={{ sm: "none", md: "block" }}>
					{title}
				</Text>
			</Flex>
		</Tab>
	);
};

PanelTab.propTypes = {
	tabRef: PropTypes.object,
	handleClick: PropTypes.func,
	next: PropTypes.bool,
	current: PropTypes.bool,
	isLast: PropTypes.bool,
	textColor: PropTypes.string,
	title: PropTypes.string,
};

export default PanelTab;
