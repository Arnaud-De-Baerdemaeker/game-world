/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Image from "next/image";

const Header = (props) => {
	return(
		<header>
			<hgroup>
				<h1>{props.mainTitle}</h1>
				<p>{props.subTitle}</p>
			</hgroup>
			<figure>
				<Image
					src={props.imageSrc}
					alt={props.imageAlt}
					priority={true}
					className={props.imageClass}
				/>
			</figure>
		</header>
	);
};

export default Header;
