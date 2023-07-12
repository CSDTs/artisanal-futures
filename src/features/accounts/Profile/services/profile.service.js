import axios from "axios";

import AuthService from "../../../services/auth.service";

const createMembershipId = () => {
	const address = "https://forum.artisanalfutures.org/wp-json/wp/v2/af_members";

	return axios
		.post(
			address,
			{ title: AuthService.getCurrentUser().user_display_name, fields: { user: AuthService.getCurrentUser().user_id } },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + AuthService.getCurrentUserToken(),
				},
			}
		)
		.then((response) => {
			if (response.data.id) AuthService.updateCurrentUser({ membership_id: response.data.id });
			return response.data;
		});
};

const ProfileService = {
	createMembershipId,
};

export default ProfileService;
