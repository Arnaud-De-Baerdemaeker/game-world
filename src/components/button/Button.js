/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

const Button = (props) => {
	return(
		<button
			type={props.buttonType}
			onClick={props.buttonAction ? props.buttonAction : null}
			className={props.buttonClass}
		>
			{props.children}
		</button>
	);
}

export default Button;
