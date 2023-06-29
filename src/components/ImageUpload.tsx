import { PhotoIcon } from "@heroicons/react/24/solid";
import {
	ChangeEvent,
	ComponentPropsWithRef,
	DragEvent,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

interface ImageUploadProps {
	id?: string;
	label?: string;
	selectedImage: string | ArrayBuffer | null;
	setSelectedImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>((props, ref) => {
	const [visibleImage, setVisibleImage] = useState<string | ArrayBuffer | null>(null);
	const { selectedImage, setSelectedImage } = props;
	// const inputRef = useRef<any>(null);
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setVisibleImage(reader.result);
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		handleFileChange({
			target: {
				files: e.dataTransfer.files,
			},
		} as ChangeEvent<HTMLInputElement>);
	};

	return (
		<>
			<label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900 sr-only">
				{props.label}
			</label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className=" flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 h-full flex-col text-center">
				<div className="m-2 aspect-square object-cover mx-auto my-auto flex w-3/4 h-3/4 p-5 overflow-hidden">
					{visibleImage ? (
						<img src={String(visibleImage)} alt="Selected" className=" mx-auto aspect-square w-full h-full my-auto" />
					) : (
						<PhotoIcon className="mx-auto h-12 w-12 text-gray-300 my-auto" aria-hidden="true" />
					)}
				</div>
				<div className="">
					<div className="!pt-2 items-center flex text-sm leading-6 text-gray-600 text-center justify-center gap-0 w-full ">
						<label
							htmlFor={props.id}
							className=" !my-0  relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 ">
							<span>Upload a file</span>
							<input
								id={props.id}
								name={props.id}
								type="file"
								className="sr-only"
								onChange={handleFileChange}
								ref={ref}
							/>
						</label>
						<p className="pl-1 !my-0">or drag and drop</p>
					</div>{" "}
					<p className="text-xs leading-5 text-gray-600 mt-0">PNG, JPG, GIF up to 10MB</p>
				</div>
			</div>
		</>
	);
});

export default ImageUpload;
