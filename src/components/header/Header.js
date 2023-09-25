/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import Button from "../button/Button";
import Icon from "../icon/Icon";

import headerStyles from "@/components/header/Header.module.scss";
import buttonStyles from "@/components/button/Button.module.scss";

const Header = (props) => {
	return(
		<header className={headerStyles.header}>
			<div className={headerStyles.header__container}>
				<Button
					buttonType="button"
					buttonAction={props.toggleMenu}
					buttonClass={buttonStyles.button__menu}
				>
					<Icon
						icon="menu"
						isMenuOpen={props.isMenuOpen}
					/>
				</Button>
				<h1 className={headerStyles.header__title}>
					<Link
						href="/"
						className={headerStyles.header__link}
					>
						Game World
					</Link>
				</h1>
			</div>
		</header>
	);
};

export default Header;
