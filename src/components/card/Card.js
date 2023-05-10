/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

const Card = (props) => {
	return(
		<article>
			<div>
				<img src={props.backgroundImage} alt="" className="" />
				<h3 data-name={props.slug}>{props.name}</h3>
			</div>
			<menu>
				{/* <li></li> */}
			</menu>
			<dl>
				<dt>Platforms</dt>
				{props.platforms.length > 0
					? <>
						{props.platforms.map(entry => (
							<dd data-platform={entry.platform.slug}>{entry.platform.name}</dd>
						))}
					</>
					: <dd>TBA</dd>
				}

				<dt>Release</dt>
				{props.released
					? <dd>{props.released}</dd>
					: <dd>TBA</dd>
				}

				<dt>Genres</dt>
				{props.genres.length > 0
					? <>
						{props.genres.map(entry => (
							<dd data-genre={entry.slug}>{entry.name}</dd>
						))}
					</>
					: <dd>TBA</dd>
				}
			</dl>
		</article>
	);
};

export default Card;
