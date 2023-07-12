const ProfileCard = ({ data }) => {
	return (
		<div className="w-10/12 flex items-center">
			<div className="w-8/12 h-full  flex flex-col bg-slate-200 p-4 ">
				<h1 className="font-semibold text-4xl">{data?.full_name}</h1>
				<h2 className="text-2xl">{data?.business?.name}</h2>

				<p>{data?.profile?.about_me}</p>
			</div>

			<img src={data?.profile_image_url} alt="" className="aspect-[3/4] object-cover w-4/12 " />
		</div>
	);
};
export default ProfileCard;
