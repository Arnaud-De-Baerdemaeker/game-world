/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {usePathname} from "next/navigation";

import Link from "next/link";

import menuStyles from "@/components/menu/Menu.module.scss";

const Menu = (props) => {
	const pathname = usePathname();

	const links = [
		{
			href: "/",
			value: "Home"
		},
		{
			href: "/publishers",
			value: "Publishers"
		},
		{
			href: "/developers",
			value: "Developers"
		},
		{
			href: "/platforms",
			value: "Platforms"
		},
		{
			href: "/library",
			value: "My Library"
		}
	];

	return(
		<nav className={props.isMenuOpen ? menuStyles["menu--open"] : menuStyles["menu--closed"]}>
			<menu className={menuStyles.menu__list}>
				{links.map(entry => {
					const isActive = pathname === entry.href;

					return(
						<li
							key={entry.value}
							className={menuStyles.menu__listItem}
						>
							<Link
								href={entry.href}
								className={isActive ? menuStyles["menu__link--active"] : menuStyles.menu__link}
							>
								{entry.value}
							</Link>
						</li>
					);
				})}
			</menu>
		</nav>
	);
}

export default Menu;
