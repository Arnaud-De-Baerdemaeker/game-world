/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

const SVG = (props) => {
	return(
		<svg
			id={props.svgId}
			viewBox={props.svgViewBox}
			xmlns="http://www.w3.org/2000/svg"
			className={props.svgClass}
		>
			{props.children}
		</svg>
	);
};

export default SVG;
