/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Image from "next/image";

import styles from "@/components/header/Header.module.scss";

const Header = (props) => {
	return(
		<header className={styles.header}>
			<hgroup className={styles.header__titles}>
				<h1>{props.mainTitle}</h1>
				<p>{props.subTitle}</p>
			</hgroup>
			<figure className={styles.header__wallpaper}>
				<Image
					src={props.imageSrc}
					alt={props.imageAlt}
					priority={true}
				/>
			</figure>
		</header>
	);
};

export default Header;
