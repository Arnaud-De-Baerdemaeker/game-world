/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState} from "react";

import Menu from "@/components/menu/Menu";

export default function Libraries() {
	const [isOnCollectionTab, setIsOnCollectionTab] = useState(true);

	const handleTabClicks = (click) => {
		// Check wich tab has been clicked
		if(click.target.id === "collection") {
			// Check if the tab is already active
			isOnCollectionTab === true ? null : setIsOnCollectionTab(true);
		}
		else {
			isOnCollectionTab === false ? null : setIsOnCollectionTab(false);
		}
	};

	return(
		<>
			<Head>
				<title>My libraries | Game World</title>
				<meta
					name="description"
					content="The page that lists the libraries of the user. Games and platforms can be saved either in the library or the wishlist."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<Menu />
			<main>
				<ul>
					<li
						id="collection"
						onClick={handleTabClicks}
					>
						My collection
					</li>
					<li
						id="wishlist"
						onClick={handleTabClicks}
					>
						My wishlist
					</li>
				</ul>

				{isOnCollectionTab
					? (
						<section>
							<h2>My collection</h2>
							<section>
								<h3>Games</h3>
							</section>

							<section>
								<h3>Platforms</h3>
							</section>
						</section>
					)
					: (
						<section>
							<h2>My wishlist</h2>
							<section>
								<h3>Games</h3>
							</section>

							<section>
								<h3>Platforms</h3>
							</section>
						</section>
					)
				}
			</main>
		</>
	);
}
