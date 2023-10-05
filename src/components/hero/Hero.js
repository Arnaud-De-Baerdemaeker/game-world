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
				<h2 className={heroStyles.hero__title}>{props.title}</h2>
				{typeof props.catchword == "string"
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
				}
			</hgroup>
		</div>
	);
};

export default Hero;
