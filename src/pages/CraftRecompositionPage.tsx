import ImageUpload from "@/components/ImageUpload";
import PageContainer from "@/components/PageContainer";
import processImage from "@/features/apps/CraftRecomposition/mock";
import { FC, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

type MockAPIResponse = {
	materials: Array<string>;
	processes: Array<string>;
};
const CraftRecompositionPage: FC = () => {
	const pageInfo = {
		title: "Craft Recomposition",
		subtitle: "Break down an image into its bill of materials, remix the results",
	};
	const imageUpload = useRef<any>(null);
	const breakdownEdit = useRef<any>(null);
	const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

	const [breakdown, setBreakdown] = useState<MockAPIResponse | null>(null);

	const [editMode, setEditMode] = useState<boolean>(false);

	const handleFileUpload = () => {
		if (!selectedImage) return;

		// TODO: Replace with actual API call
		processImage(selectedImage?.toString()).then((data) => {
			console.log(data);
			setBreakdown(data);
		});
	};

	const handleEditUpload = () => {
		setBreakdown({
			...(breakdown || { materials: [], processes: [] }),
			materials: breakdownEdit?.current?.value.split("\n"),
		});

		setEditMode(false);
	};

	return (
		<PageContainer {...pageInfo}>
			<section className=" mt-6">
				<p className="mt-8 text-lg">
					To help imagine and re-imagine your craft, please choose what groups and kinds of materials could play a role.
					Groups include Artisanal Futures associated collectives, regional businesses, and minority businesses. New
					kinds of materials include other metals, fabrics, adhesives, and so forth. Try our example to learn more!
				</p>

				<div className="flex flex-col gap-3 my-5 md:flex-row">
					<div className="md:aspect-square md:w-1/2 aspect-video">
						<ImageUpload
							id={"file-upload"}
							label={"Image Upload"}
							ref={imageUpload}
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
						/>
					</div>
					<div className="bg-slate-100 w-full text-center items-center flex justify-center border-double border border-slate-500 aspect-video md:aspect-auto">
						<div className=" "></div>
						{breakdown && (
							<div className="flex flex-col gap-4 w-full items-center">
								<h3 className="text-slate-800 font-bold text-lg flex ">
									Materials Used &nbsp;
									<FiEdit className="text-indigo-500 " size={24} onClick={() => setEditMode(true)} />
									<span className="relative flex h-3 w-3">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
									</span>
								</h3>
								{!editMode && (
									<ul>
										{breakdown.materials.map((material, index) => (
											<li key={index}>{material}</li>
										))}
									</ul>
								)}
								{editMode && (
									<div className="w-full flex flex-col items-center ">
										<textarea
											ref={breakdownEdit}
											name="breakdown"
											id="breakdown"
											className="w-3/4 rounded-md p-2 shadow"
											rows={4}
											defaultValue={breakdown.materials.join("\n")}></textarea>
										<p className="text-base  mt-4 max-w-md font-normal text-slate-500">
											Enter each material on its own line.
										</p>
										<button
											onClick={handleEditUpload}
											className="mt-2 bg-indigo-500 text-white px-2 font-medium text-base py-1 rounded hover:bg-indigo-700 active:bg-indigo-800">
											Upload Changes
										</button>
									</div>
								)}{" "}
								{breakdown && !editMode && (
									<p className="text-base  mt-4 max-w-md font-normal text-slate-500">
										Not how it is supposed to be? Alter and upload the results to better predict products in the future!
									</p>
								)}
							</div>
						)}

						{!breakdown && <p className="text-slate-800 font-bold text-lg">Analyze image to see results</p>}
					</div>
				</div>
				<button
					onClick={handleFileUpload}
					className="bg-slate-500 text-white px-2 font-semibold text-lg py-1 rounded hover:bg-slate-700 active:bg-slate-800">
					Analyze Image
				</button>
			</section>
		</PageContainer>
	);
};
export default CraftRecompositionPage;
