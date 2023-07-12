import { FormattedData } from "@/types";
import { FC } from "react";
import { FaUser } from "react-icons/fa";

interface IProps {
	isLoading: boolean;
	user: FormattedData;
}
const ProfileCard: FC<IProps> = ({ isLoading, user }) => {
	return (
		<>
			<div className=" flex flex-col md:flex-row  items-center border border-slate-200 rounded-lg p-4 gap-4 w-full">
				<div className="md:w-1/6 w-full">
					{user.profile_image_url && (
						<img
							src={user.profile_image_url}
							alt=""
							className="rounded-full w-92 h-92 object-cover aspect-square shadow-md"
						/>
					)}

					{!user.profile_image_url && (
						<div className="rounded-full bg-slate-400 h-92 w-92 aspect-square shadow-md flex items-center justify-center text-5xl text-slate-200">
							<FaUser />
						</div>
					)}
				</div>{" "}
				<div className="md:w-5/6 w-full flex justify-between">
					<div>
						<p className="block text-lg font-bold text-slate-700">{user.full_name}</p>
						{user.biz_name && <p className="block text-base font-medium text-slate-500">Owner of {user.biz_name}</p>}

						<p className="block text-base font-medium">@ {user.username}</p>
					</div>

					{/* TODO - Add dedicated update page */}
					{/* <button className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow  h-10">
						Edit{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
					</button> */}
				</div>{" "}
			</div>
		</>
	);
};
export default ProfileCard;
