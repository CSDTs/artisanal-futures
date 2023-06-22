import axios from "axios";
import { useState } from "react";

const useImageUpload = () => {
	// const [imageURL, setImageURL] = useState<string | null>(null);

	const uploadImageToMedia = (imageUpload: File, callBack: (data: string) => void) => {
		const token = JSON.parse(localStorage.getItem("user")).token || null;
		const formData = new FormData();
		formData.append("file", imageUpload);

		if (!token) throw new Error("No token found");

		axios
			.post("https://forum.artisanalfutures.org/wp-json/wp/v2/media", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				callBack(response.data.source_url);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return { uploadImageToMedia };
};

export default useImageUpload;
