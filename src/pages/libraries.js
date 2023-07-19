/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import GameCard from "@/components/cards/GameCard";
import PlatformCard from "@/components/cards/PlatformCard";
import Footer from "@/components/footer/Footer";

export default function Libraries() {
	const [isOnCollectionTab, setIsOnCollectionTab] = useState(true);
	const [gamesCollection, setGamesCollection] = useState([]);
	const [platformsCollection, setPlatformsCollection] = useState([]);
	const [gamesWishlist, setGamesWishlist] = useState([]);
	const [platformsWishlist, setPlatformsWishlist] = useState([]);

	const handleTabClicks = (click) => {
		// Check wich tab has been clicked
		if(click.target.id === "collection") {
			// Check if the tab is already active
			if(isOnCollectionTab !== true) {
				setIsOnCollectionTab(true);
			}
		}
		else {
			if(isOnCollectionTab !== false) {
				setIsOnCollectionTab(false);
				getWishlistItems();
			}
		}
	};

	const getCollectionItems = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the Libraries object stores
			let stores = openedDatabase.transaction(["Games library", "Platforms library"], "readonly");
			let gamesLibraryStore = stores.objectStore("Games library");
			let platformsLibraryStore = stores.objectStore("Platforms library");

			let getAllFromGamesLibrary = gamesLibraryStore.getAll();
			getAllFromGamesLibrary.onsuccess = (event) => {
				setGamesCollection(event.target.result);
			};

			let getAllFromPlatformsLibrary = platformsLibraryStore.getAll();
			getAllFromPlatformsLibrary.onsuccess = (event) => {
				setPlatformsCollection(event.target.result);
			};
		}
	};

	const getWishlistItems = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the Wishlists object stores
			let stores = openedDatabase.transaction(["Games wishlist", "Platforms wishlist"], "readonly");
			let gamesWishlistStore = stores.objectStore("Games wishlist");
			let platformsWishlistStore = stores.objectStore("Platforms wishlist");

			let getAllFromGamesWishlist = gamesWishlistStore.getAll();
			getAllFromGamesWishlist.onsuccess = (event) => {
				setGamesWishlist(event.target.result);
			};

			let getAllFromPlatformsLibrary = platformsWishlistStore.getAll();
			getAllFromPlatformsLibrary.onsuccess = (event) => {
				setPlatformsWishlist(event.target.result);
			};
		}
	};

	useEffect(() => {
		if(isOnCollectionTab === true) {
			gamesCollection.length === 0 ? getCollectionItems() : null;
		}
	}, [isOnCollectionTab]);

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

								<div>
									{gamesCollection.length > 0
										? gamesCollection.map(entry => (
											<GameCard
												key={entry.id}
												id={entry.id}
												slug={entry.slug}
												pathname={"/game/[slug]"}
												as={`/game/${entry.slug}`}
												// dominantColor={entry.dominant_color}
												// saturatedColor={entry.saturated_color}
												// shortScreenshots={entry.short_screenshorts}
												// tags={entry.tags}
												imageSrc={entry.imageSrc}
												imageAlt={entry.imageAlt}
												imageClass=""
												gameName={entry.gameName}
												// gamePlatforms={entry.gamePlatforms}
												// gameRelease={entry.gameRelease}
												// gameGenres={entry.gameGenres}
												gamesCollection={gamesCollection}
												setGamesCollection={setGamesCollection}
												gamesWishlist={gamesWishlist}
												setGamesWishlist={setGamesWishlist}
											/>
										))
										: <p>You have not added any games to your collection yet</p>
									}
								</div>
							</section>

							<section>
								<h3>Platforms</h3>

								<div>
									{platformsCollection.length > 0
										? platformsCollection.map(entry => (
											<PlatformCard
												key={entry.id}
												id={entry.id}
												slug={entry.slug}
												pathname={"/platform/[slug]"}
												as={`/platform/${entry.slug}`}
												imageSrc={entry.imageSrc}
												imageAlt={entry.imageAlt}
												imageClass=""
												platformName={entry.platformName}
												// gamesCount={entry.gamesCount}
												// startYear={entry.startYear}
												// endYear={entry.endYear}
												platformsCollection={platformsCollection}
												setPlatformsCollection={setPlatformsCollection}
												platformsWishlist={platformsWishlist}
												setPlatformsWishlist={setPlatformsWishlist}
											/>
										))
										: <p>You have not added any platform to your collection yet</p>
									}
								</div>
							</section>
						</section>
					)
					: (
						<section>
							<h2>My wishlist</h2>

							<section>
								<h3>Games</h3>

								<div>
									{gamesWishlist.length > 0
										? gamesWishlist.map(entry => (
											<GameCard
												key={entry.id}
												id={entry.id}
												slug={entry.slug}
												pathname={"/game/[slug]"}
												as={`/game/${entry.slug}`}
												// dominantColor={entry.dominant_color}
												// saturatedColor={entry.saturated_color}
												// shortScreenshots={entry.short_screenshorts}
												// tags={entry.tags}
												imageSrc={entry.imageSrc}
												imageAlt={entry.imageAlt}
												imageClass=""
												gameName={entry.gameName}
												// gamePlatforms={entry.gamePlatforms}
												// gameRelease={entry.gameRelease}
												// gameGenres={entry.gameGenres}
												gamesCollection={gamesCollection}
												setGamesCollection={setGamesCollection}
												gamesWishlist={gamesWishlist}
												setGamesWishlist={setGamesWishlist}
											/>
										))
										: <p>You have no games in your wishlist</p>
									}
								</div>
							</section>

							<section>
								<h3>Platforms</h3>

								<div>
									{platformsWishlist.length > 0
										? platformsWishlist.map(entry => (
											<PlatformCard
												key={entry.id}
												id={entry.id}
												slug={entry.slug}
												pathname={"/platform/[slug]"}
												as={`/platform/${entry.slug}`}
												imageSrc={entry.imageSrc}
												imageAlt={entry.imageAlt}
												imageClass=""
												platformName={entry.platformName}
												// gamesCount={entry.gamesCount}
												// startYear={entry.startYear}
												// endYear={entry.endYear}
												platformsCollection={platformsCollection}
												setPlatformsCollection={setPlatformsCollection}
												platformsWishlist={platformsWishlist}
												setPlatformsWishlist={setPlatformsWishlist}
											/>
										))
										: <p>You have no platforms in your wishlist</p>
									}
								</div>
							</section>
						</section>
					)
				}
			</main>
			<Footer />
		</>
	);
}
