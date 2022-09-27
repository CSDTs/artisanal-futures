/**
 * Simple update function for individual payloads involved with the wizard.
 *
 * @param {string} key
 * @param {string} value
 * @param {function} setPayload State function to update a given payload
 */
export default function setPayload(setPayload, key, value) {
	setPayload((data) => {
		return {
			...data,
			[key]: value,
		};
	});
}
