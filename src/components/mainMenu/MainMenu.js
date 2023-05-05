/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import styles from "./MainMenu.module.css";

const MainMenu = () => {
	return(
		<nav className={styles.block}>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Link
						href="/"
						className={styles.link}
					>
						Home
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link
						href="/library"
						className={styles.link}
					>
						My Library
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MainMenu;
