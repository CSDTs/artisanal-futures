import { Flex, FormControl, FormLabel, Stack, Switch, Text } from "@chakra-ui/react";

import { useEffect } from "react";

import { AiFillSetting } from "react-icons/ai";

import { FaCube } from "react-icons/fa";

import PropTypes from "prop-types";
import OptInIcon from "../OptInIcon";

const OptInPanel = ({ optInPayload, setOptInPayload, checkboxes, setCheckboxes, textColor }) => {
	const labelProps = {
		color: textColor,
		fontWeight: "bold",
		fontSize: "md",
	};
	useEffect(() => {
		setOptInPayload({ ...optInPayload, ...{ fourm: checkboxes } });
	}, [checkboxes]);

	return (
		<>
			<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
				ArtisanalFutures includes a forum for discussion with other businesses and customers like you. Please indicate
				the kinds of forums you are interested in joining:
			</Text>
			<Stack
				direction={{ sm: "column", md: "row" }}
				spacing={{ sm: "20px", lg: "35px" }}
				alignSelf="center"
				justifySelf="center"
				mb="24px">
				<Flex direction="column" align="center">
					<OptInIcon
						isSelected={optInPayload.fourm.unmonitored}
						handleOnChange={setCheckboxes}
						CheckIcon={AiFillSetting}
						checkName={"unmonitored"}
					/>

					<Text {...labelProps}>Unmonitored, publicly visible and open to the public</Text>
				</Flex>
				<Flex direction="column" align="center">
					<OptInIcon
						isSelected={optInPayload.fourm.monitored}
						handleOnChange={setCheckboxes}
						CheckIcon={FaCube}
						checkName={"monitored"}
					/>

					<Text {...labelProps}>Monitored, publicly visible, and open to the public</Text>
				</Flex>
				<Flex direction="column" align="center">
					<OptInIcon
						isSelected={optInPayload.fourm.privately_visible}
						handleOnChange={setCheckboxes}
						CheckIcon={FaCube}
						checkName={"privately_visible"}
					/>

					<Text {...labelProps}>Privately visible and open to approved members only</Text>
				</Flex>
				<Flex direction="column" align="center">
					<OptInIcon
						isSelected={optInPayload.fourm.invisible}
						handleOnChange={setCheckboxes}
						CheckIcon={FaCube}
						checkName={"invisible"}
					/>

					<Text {...labelProps}>Invisible and open to invited members only</Text>
				</Flex>
			</Stack>
			<Text color="gray.600" fontWeight="normal" fontSize="sm" mb={4}>
				Supply chains provide materials and resources critical for your work. We want to use collective bargaining by
				identifying alternative and multiple sources and help network you and other businesses. To do this we need more
				supply chain conversations. To help do this we need periodic input from you. If you agree, then from time to
				time we will ask you to mention what supplies and materials you are currently using. Our AI technology will help
				suggest materials and processes upfront to save you time and effort. What the AI technology learns helps us
				identify outside price dips for groups of materials useful to groups of ArtisanalFutures businesses. It also
				helps us identify alternative and new sources.
			</Text>
			<FormControl display="flex" alignItems="center">
				<FormLabel htmlFor="email-alerts" mb="0">
					I agree to be a part of our supply chain conversations service
				</FormLabel>
				<Switch
					id="email-alerts"
					onChange={(e) => setOptInPayload({ ...optInPayload, ...{ supply_chain: e.target.checked } })}
					isChecked={optInPayload.supply_chain}
				/>
			</FormControl>
		</>
	);
};

OptInPanel.propTypes = {
	optInPayload: PropTypes.object,
	setOptInPayload: PropTypes.func,
	checkboxes: PropTypes.object,
	setCheckboxes: PropTypes.func,
	textColor: PropTypes.string,
};
export default OptInPanel;
