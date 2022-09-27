// SocialBar.jsx

import PropTypes from "prop-types";

/**
 * This component is responsible for rendering an artisan's social media via a toolbar of links
 */

/**
 * Props:
 * -facebook: a link to their Facebook account
 * -twitter: a link to their Twitter account
 * -linkedin: a link to their LinkedIn account
 * -instagram: a link to their Instagram account
 */

//implement the component here
const SocialBar = () => {
	//destructure the props

	return (
		<section>
			<div className="col-4 left">
				<span className="btn btn-sm btn-info">Connect & Follow</span>
			</div>
			{/**
			 * Want to display a row of icons for each social url received and spread evenly across.
			 * Note: it is completely possible that no props are provided, in which case, component shouldn't render to the screen.
			 */}
		</section>
	);
};

//declare the component's prop types here
SocialBar.propTypes = {
	facebook: PropTypes.string,
	twitter: PropTypes.string,
	linkedin: PropTypes.string,
	instagram: PropTypes.string,
};
// export component as default
export default SocialBar;
