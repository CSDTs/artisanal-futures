import TextInput from "@/components/Form/TextInput";
import { FormattedData } from "@/types";
import getFormValues from "@/utils/getFormValues";
import { FC, createRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface IProps {
	artisanData: FormattedData;
}
const EditAccountInfo: FC<IProps> = ({ artisanData }) => {
	const accountForm = createRef<HTMLFormElement>();

	const [edit, setEdit] = useState(false);

	const handleOnChange = () => {
		const accountFormData = getFormValues(accountForm);
		console.log(accountFormData);
	};

	const toggleEdit = () => {
		setEdit(!edit);
	};
	return (
		<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
			<div className="flex justify-between w-full items-center px-2">
				<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Account Information</h2>

				<button
					onClick={toggleEdit}
					className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
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
				</button>
			</div>
			<form className="w-full flex flex-col md:flex-row  gap-y-5 flex-wrap" onChange={handleOnChange} ref={accountForm}>
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">First Name</p>
					{!edit && (
						<p className="block text-lg font-semibold text-slate-700">
							{artisanData.first_name || (
								<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
									<FaExclamationCircle className="lg:text-xl text-6xl" />
									Add your first name
								</span>
							)}
						</p>
					)}

					{edit && (
						<TextInput
							hasLabel={false}
							name="first_name"
							title="First name"
							value={artisanData.first_name}
							ref={accountForm?.current?.first_name}
						/>
					)}
				</div>
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">Last Name</p>
					{!edit && (
						<p className="block text-lg font-semibold text-slate-700">
							{artisanData.last_name || (
								<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
									<FaExclamationCircle className="lg:text-xl text-6xl" />
									Add your last name
								</span>
							)}
						</p>
					)}
					{edit && (
						<TextInput
							hasLabel={false}
							name="last_name"
							title="Last Name"
							value={artisanData.last_name}
							ref={accountForm?.current?.last_name}
						/>
					)}
				</div>
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">Username</p>
					{!edit && <p className="block text-lg font-semibold text-slate-700">{artisanData.username}</p>}

					{edit && (
						<TextInput
							hasLabel={false}
							name="username"
							title="Username"
							value={artisanData.username}
							ref={accountForm?.current?.username}
						/>
					)}
				</div>
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">Email</p>
					{!edit && <p className="block text-lg font-semibold text-slate-700">{artisanData.email}</p>}

					{edit && (
						<TextInput
							hasLabel={false}
							name="email"
							title="Email"
							value={artisanData.email}
							ref={accountForm?.current?.email}
						/>
					)}
				</div>{" "}
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">Forum's interested in</p>
					{!edit && (
						<p className="block text-lg font-semibold  text-slate-700 ">
							[
							{artisanData.moderated_forum && (
								<span>
									Moderated
									{[artisanData.unmoderated_forum, artisanData.private_forum, artisanData.hidden_forum].some(
										(forum) => forum
									) && ", "}
								</span>
							)}
							{artisanData.unmoderated_forum && (
								<span>
									Unmoderated
									{[artisanData.private_forum, artisanData.hidden_forum].some((forum) => forum) && ", "}
								</span>
							)}
							{artisanData.private_forum && <span>Private{artisanData.hidden_forum && ", "}</span>}
							{artisanData.hidden_forum && <span>Hidden</span>}
							{!artisanData.moderated_forum &&
								!artisanData.unmoderated_forum &&
								!artisanData.private_forum &&
								!artisanData.hidden_forum &&
								"None selected"}
							]
						</p>
					)}{" "}
					{edit && (
						<div className="mt-2 space-y-6">
							<div className="relative flex gap-x-3">
								<div className="flex h-6 items-center">
									<input
										id="moderated_forum"
										name="moderated_forum"
										type="checkbox"
										defaultChecked={artisanData.moderated_forum}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
								</div>
								<div className="text-sm leading-6">
									<label htmlFor="moderated_forum" className="font-medium text-gray-900">
										Moderated
									</label>
									<p className="text-gray-500">Monitored, publicly visible, and open to the public</p>
								</div>
							</div>
							<div className="relative flex gap-x-3">
								<div className="flex h-6 items-center">
									<input
										id="unmoderated_forum"
										name="unmoderated_forum"
										type="checkbox"
										defaultChecked={artisanData.unmoderated_forum}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
								</div>
								<div className="text-sm leading-6">
									<label htmlFor="unmoderated_forum" className="font-medium text-gray-900">
										Unmoderated
									</label>
									<p className="text-gray-500">Unmonitored, publicly visible, and open to the public</p>
								</div>
							</div>
							<div className="relative flex gap-x-3">
								<div className="flex h-6 items-center">
									<input
										id="private_forum"
										name="private_forum"
										type="checkbox"
										defaultChecked={artisanData.private_forum}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
								</div>
								<div className="text-sm leading-6">
									<label htmlFor="private_forum" className="font-medium text-gray-900">
										Private
									</label>
									<p className="text-gray-500">Privately visible and open to approved members only</p>
								</div>
							</div>
							<div className="relative flex gap-x-3">
								<div className="flex h-6 items-center">
									<input
										id="hidden_forum"
										name="hidden_forum"
										type="checkbox"
										defaultChecked={artisanData.hidden_forum}
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
								</div>
								<div className="text-sm leading-6">
									<label htmlFor="hidden_forum" className="font-medium text-gray-900">
										Hidden
									</label>
									<p className="text-gray-500">Invisible and open to invited members only</p>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="basis-1/2 px-2">
					<p className="text-slate-400 text-base font-semibold">Supply Chain</p>
					{!edit && (
						<p className="block text-lg font-semibold  text-slate-700">
							{artisanData.supply_chain
								? "Yes, I am interested in the supply chain"
								: "No, I am not interested in the supply chain"}
						</p>
					)}

					{edit && (
						<div className="flex items-center gap-x-3 mt-2">
							<input
								id="supply_chain"
								name="supply_chain"
								type="checkbox"
								defaultChecked={artisanData.supply_chain}
								className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label htmlFor="supply_chain" className=" mb-0 flex text-sm font-medium  text-gray-900">
								I agree to be a part of our supply chain conversations service
							</label>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};
export default EditAccountInfo;
