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
			<article>
				<img
					src={props.imageSrc}
					alt={props.imageAlt}
					className={props.imageClass}
				/>

				<h3>{props.companyName}</h3>

				<dl>
					<dt>Games count</dt>
					<dd>{props.companyGames ? props.companyGames : "N/A"}</dd>
				</dl>
			</article>
		</Link>
	);
};

export default Card;
