/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import menuStyles from "@/components/menu/Menu.module.scss";

const Menu = (props) => {
	const links = [
		{
			listItemClass: menuStyles.menu__listItem,
			href: "/",
			linkClass: menuStyles.menu__link,
			value: "Home"
		},
		{
			listItemClass: menuStyles.menu__listItem,
			href: "/publishers",
			linkClass: menuStyles.menu__link,
			value: "Publishers"
		},
		{
			listItemClass: menuStyles.menu__listItem,
			href: "/developers",
			linkClass: menuStyles.menu__link,
			value: "Developers"
		},
		{
			listItemClass: menuStyles.menu__listItem,
			href: "/platforms",
			linkClass: menuStyles.menu__link,
			value: "Platforms"
		},
		{
			listItemClass: menuStyles.menu__listItem,
			href: "/library",
			linkClass: menuStyles.menu__link,
			value: "My Library"
		}
	];

	return(
		<nav className={props.isMenuOpen ? menuStyles["menu--open"] : menuStyles["menu--closed"]}>
			<menu className={menuStyles.menu__list}>
				{links.map(entry => (
					<li
						key={entry.value}
						className={entry.listItemClass}
					>
						<Link
							href={entry.href}
							className={entry.linkClass}
						>
							{entry.value}
						</Link>
					</li>
				))}
			</menu>
		</nav>
	);
}

export default Menu;
