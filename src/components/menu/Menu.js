/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import styles from "./Menu.module.css";

const Menu = () => {
	const links = [
		{
			listItemClass: styles.listItem,
			href: "/",
			linkClass: styles.link,
			value: "Home"
		},
		{
			listItemClass: styles.listItem,
			href: "/publishers",
			linkClass: styles.link,
			value: "Publishers"
		},
		{
			listItemClass: styles.listItem,
			href: "/developers",
			linkClass: styles.link,
			value: "Developers"
		},
		{
			listItemClass: styles.listItem,
			href: "/library",
			linkClass: styles.link,
			value: "My Library"
		}
	];

	return(
		<nav className={styles.block}>
			<ul className={styles.list}>
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
			</ul>
		</nav>
	);
}

export default Menu;
