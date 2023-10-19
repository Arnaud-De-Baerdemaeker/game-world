/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Image from "next/image";

import heroStyles from "@/components/hero/Hero.module.scss";

const Hero = (props) => {
	return(
		<div className={heroStyles.hero}>
			{props.imageSrc
				? (
					<Image
						src={props.imageSrc}
						alt={props.imageAlt}
						width={500}
						height={500}
						responsive="true"
						className={heroStyles.hero__backgroundImage}
					/>
				)
				: null
			}
			<hgroup className={heroStyles.hero__group}>
				<h2 className={props.catchword != null ? heroStyles["hero__title--withPseudoElement"] : heroStyles["hero__title--withoutPseudoElement"]}>{props.title}</h2>
				{props.catchword != null
					? typeof props.catchword == "string"
						? (
							<p className={heroStyles.hero__catchword}>{props.catchword}</p>
						)
						: (
							props.catchword.map(item => (
								<p
									key={item.id}
									className={heroStyles.hero__catchword}
								>
									{item.name}
								</p>
							))
						)
					: null
				}
			</hgroup>
		</div>
	);
};

export default Hero;
