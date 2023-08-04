import axios from "axios";
import { useState } from "react";

const useImageUpload = () => {
	// const [imageURL, setImageURL] = useState<string | null>(null);

	const uploadImageToMedia = (imageUpload: File, callBack: (data: string) => void) => {
		const token = JSON.parse(localStorage.getItem("user") as string).token || null;
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
				console.log(response.data);
				callBack(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const deleteMediaLink = async (mediaId: number | null, token: string): Promise<void> => {
		if (!mediaId) return;

		const endpointUrl = `${import.meta.env.VITE_API_URL}wp/v2/media/${mediaId}?force=true`;

		try {
			const response = await axios.delete(endpointUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				console.log("Media link deleted successfully.");
			} else {
				console.log(`Failed to delete media link. Status code: ${response.status}`);
			}
		} catch (error) {
			console.error("An error occurred while deleting the media link:", error);
		}
	};

	return { uploadImageToMedia, deleteMediaLink };
};

export default useImageUpload;
