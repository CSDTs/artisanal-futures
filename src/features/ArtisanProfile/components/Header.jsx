import { Box } from "@chakra-ui/react";
import "./CustomProfile.scss";
export default function Header() {
	return (
		<Box pt={8}>
			<div className="header pb-8 pt-0 d-flex align-items-center main-header">
				<span className="mask bg-gradient-default opacity-8"></span>

				<div className="container-fluid d-flex align-items-center">
					<div className="row"></div>
				</div>
			</div>
		</Box>
	);
}
