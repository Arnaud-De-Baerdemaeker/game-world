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
				<header>
					<figure>
						<img
							src={props.imageSrc}
							alt={props.imageAlt}
							className={props.imageClass}
						/>
					</figure>
					<h4>{props.companyName}</h4>
				</header>

				<dl>
					<dt>Games count</dt>
					<dd>{props.companyGames ? props.companyGames : "N/A"}</dd>
				</dl>
			</article>
		</Link>
	);
};

export default Card;
