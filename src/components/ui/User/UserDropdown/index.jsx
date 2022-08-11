import { Button, Menu, Center, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import AuthService from "../../../../services/auth.service";
export default function UserDropdown({ username }) {
	const logUserOut = () => {
		AuthService.logout();
		window.location.reload();
	};
	return (
		<Menu>
			<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
				<Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
			</MenuButton>
			<MenuList alignItems={"center"}>
				<br />
				<Center>
					<Avatar size={"2xl"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
				</Center>
				<br />
				<Center>
					<p>{username}</p>
				</Center>
				<br />
				<MenuDivider />

				<MenuItem>Account Settings</MenuItem>
				<MenuItem onClick={logUserOut}>Logout</MenuItem>
			</MenuList>
		</Menu>
	);
}
