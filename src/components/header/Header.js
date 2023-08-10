/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import headerStyles from "@/components/header/Header.module.scss";

const Header = (props) => {
	return(
		<header className={headerStyles.header}>
			<hgroup className={headerStyles.header__titles}>
				<h1>{props.mainTitle}</h1>
				<p>{props.subTitle}</p>
			</hgroup>
		</header>
	);
};

export default Header;
