function combineTailwindClasses(...classes: any) {
	return classes.filter(Boolean).join(" ");
}
export default combineTailwindClasses;
