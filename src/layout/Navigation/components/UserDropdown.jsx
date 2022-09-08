import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../../services/auth.service";

export default function UserDropdown({ username }) {
	const profileImage = AuthService.getCurrentUser().profile_image;
	const navigate = useNavigate();
	return (
		<Menu>
			<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
				<Avatar
					size={"sm"}
					src={profileImage ? profileImage : `https://avatars.dicebear.com/api/identicon/${username}.svg`}
				/>
			</MenuButton>
			<MenuList alignItems={"center"} zIndex={2}>
				<br />
				<Center>
					<Avatar
						size={"2xl"}
						src={profileImage ? profileImage : `https://avatars.dicebear.com/api/identicon/${username}.svg`}
					/>
				</Center>
				<br />
				<Center>
					<p>{username}</p>
				</Center>
				<br />
				<MenuDivider />
				<MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
				{/* <MenuItem>Account Settings</MenuItem> */}
				<MenuItem onClick={AuthService.logout}>Logout</MenuItem>
			</MenuList>
		</Menu>
	);
}
