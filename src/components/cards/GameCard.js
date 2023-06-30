/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

const GameCard = (props) => {
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
				<div>
					<figure>
						<img
							src={props.imageSrc}
							alt={props.imageAlt}
							className={props.imageClass}
						/>
					</figure>
					<h3 data-name={props.slug}>{props.gameName}</h3>
				</div>

				<menu>
					{/* <li></li> */}
				</menu>

				<dl>
					<dt>Platforms</dt>
					{props.gamePlatforms.length > 0
						? <>
							{props.gamePlatforms.map(item => (
								<dd
									key={item.platform.id}
									data-platform={item.platform.slug}
								>
									{item.platform.name}
								</dd>
							))}
						</>
						: <dd>N/A</dd>
					}

					<dt>Release</dt>
					{props.gameRelease
						? <dd>{props.gameRelease}</dd>
						: <dd>N/A</dd>
					}

					<dt>Genres</dt>
					{props.gameGenres.length > 0
						? <>
							{props.gameGenres.map(item => (
								<dd
									key={item.id}
									data-genre={item.slug}
								>
									{item.name}
								</dd>
							))}
						</>
						: <dd>N/A</dd>
					}
				</dl>
			</article>
		</Link>
	);
};

export default GameCard;
