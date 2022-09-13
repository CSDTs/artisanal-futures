const formatPrice = (num) => {
	return `$${num.toFixed(2)}`;
};

const calculateMonthly = (initialTotal, additionalCosts) => {
	return {
		hourly: ((initialTotal + additionalCosts) / 2000) * 12 || 0,
		total: initialTotal + additionalCosts || 0,
	};
};

const calculateMaterial = (initialTotal, additionalCosts, rate) => {
	let total = initialTotal + additionalCosts;
	let hourly = (initialTotal + additionalCosts) / rate || 0;

	return {
		hourly: isFinite(hourly) ? hourly : 0,
		total: isFinite(total) ? total : 0,
	};
};

const calculateLabor = (laborTotal) => {
	if (isFinite(laborTotal)) return laborTotal;
	return 0;
};

const calculateHourlyRatio = (cost, hours) => {
	let calc = (cost / hours) * 100;

	if (isFinite(calc)) return calc;
	return 0;
};

const CalculateUtil = {
	formatPrice,
	calculateMonthly,
	calculateMaterial,
	calculateLabor,
	calculateHourlyRatio,
};

export default CalculateUtil;
