import axios from "axios";
import { useEffect, useState } from "react";
const useLogInToWP = (payload) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const headers = {
		"Content-Type": "application/json",
	};
	useEffect(() => {
		axios
			.post("https://fourm.artisanalfutures.org/wp-json/jwt-auth/v1/token", payload, { headers })
			.then((response) => {
				console.log(response);
				if (response.data.token) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			})
			.then((data) => {
				setError(data.error);
				setData(data);
				setLoading(false);
			});
	}, [payload]);

	return { data, loading, error };
};

export default useLogInToWP;
