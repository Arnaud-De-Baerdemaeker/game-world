/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import heroStyles from "@/components/hero/Hero.module.scss";

const Hero = (props) => {
	return(
		<div className={heroStyles.hero}>
			{props.imageSrc
				? (
					<img
						src={props.imageSrc}
						alt={props.imageAlt}
						className={heroStyles.hero__backgroundImage}
					/>
				)
				: null
			}
			<hgroup className={heroStyles.hero__group}>
				<h2 className={heroStyles.hero__title}>{props.title}</h2>
				{typeof props.catchword == "string"
					? (
						<p className={heroStyles.hero__catchword}>{props.catchword}</p>
					)
					: (
						props.catchword.map(item => (
							<p className={heroStyles.hero__catchword}>{item.name}</p>
						))
					)
				}
			</hgroup>
		</div>
	);
};

export default Hero;
