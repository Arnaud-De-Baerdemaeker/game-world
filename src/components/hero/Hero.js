/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import heroStyles from "@/components/hero/Hero.module.scss";

const Hero = (props) => {
	return(
		<div className={heroStyles.hero}>
			<hgroup className={heroStyles.hero__group}>
				<h2 className={heroStyles.hero__title}>{props.title}</h2>
				<p className={heroStyles.hero__catchword}>{props.catchword}</p>
			</hgroup>
		</div>
	);
};

export default Hero;
