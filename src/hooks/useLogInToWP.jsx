import { useEffect, useState } from "react";
import axios from "axios";
const useLogInToWP = (payload) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const headers = {
		"Content-Type": "application/json",
	};
	useEffect(() => {
		axios
			.post("http://52.4.17.133/wp-json/jwt-auth/v1/token", payload, { headers })
			.then((res) => res.json())
			.then((data) => {
				setError(data.error);
				setData(data);
				setLoading(false);
			});
	}, [payload]);

	return { data, loading, error };
};

export default useLogInToWP;
