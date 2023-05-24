/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

const Card = (props) => {
	return(
		<Link
			href={{
				pathname: props.pathname,
				query: {
					id: props.id
				}
			}}
			as={props.as}
		>
			{props.children}
		</Link>
	);
};

export default Card;
