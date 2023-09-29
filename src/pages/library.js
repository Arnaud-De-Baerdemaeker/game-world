/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import useToggler from "@/hooks/useToggler";

import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Menu from "@/components/menu/Menu";
import Button from "@/components/button/Button";
import GameCard from "@/components/cards/GameCard";
import PlatformCard from "@/components/cards/PlatformCard";
import Footer from "@/components/footer/Footer";

import libraryStyles from "@/pages/Library.module.scss";
import buttonStyles from "@/components/button/Button.module.scss";

const Library = () => {
	const [isMenuOpen, toggleMenu] = useToggler(false);
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
			const openedDatabase = event.target.result;

			// Open a transaction and access the Libraries object stores
			const stores = openedDatabase.transaction(["Games library", "Platforms library"], "readonly");
			const gamesLibraryStore = stores.objectStore("Games library");
			const platformsLibraryStore = stores.objectStore("Platforms library");

			const getAllFromGamesLibrary = gamesLibraryStore.getAll();
			getAllFromGamesLibrary.onsuccess = (event) => {
				setGamesCollection(event.target.result);
			};

			const getAllFromPlatformsLibrary = platformsLibraryStore.getAll();
			getAllFromPlatformsLibrary.onsuccess = (event) => {
				setPlatformsCollection(event.target.result);
			};
		}
	};

	const getWishlistItems = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			const openedDatabase = event.target.result;

			// Open a transaction and access the Wishlists object stores
			const stores = openedDatabase.transaction(["Games wishlist", "Platforms wishlist"], "readonly");
			const gamesWishlistStore = stores.objectStore("Games wishlist");
			const platformsWishlistStore = stores.objectStore("Platforms wishlist");

			const getAllFromGamesWishlist = gamesWishlistStore.getAll();
			getAllFromGamesWishlist.onsuccess = (event) => {
				setGamesWishlist(event.target.result);
			};

			const getAllFromPlatformsLibrary = platformsWishlistStore.getAll();
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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title="Library"
				catchword="Find here all the games and platforms you saved"
			/>
			<main className={libraryStyles.library}>
				<div className={libraryStyles.library__tabsOuterContainer}>
					<div className={libraryStyles.library__tabsInnerContainer}>
						<menu className={libraryStyles.library__tabsMenu}>
							<li className={libraryStyles.library__tab}>
								<Button
									buttonType="button"
									buttonId="collection"
									buttonAction={handleTabClicks}
									buttonClass={isOnCollectionTab ? buttonStyles["button__tab--active"] : buttonStyles["button__tab--inactive"]}
								>
									My collection
								</Button>
							</li>
							<li className={libraryStyles.library__tab}>
								<Button
									buttonType="button"
									buttonId="wishlist"
									buttonAction={handleTabClicks}
									buttonClass={isOnCollectionTab ? buttonStyles["button__tab--inactive"] : buttonStyles["button__tab--active"]}
								>
									My wishlist
								</Button>
							</li>
						</menu>
					</div>
				</div>

				<section className={libraryStyles.library__gallery}>
					<h2 className={libraryStyles.library__title}>
						{isOnCollectionTab
							? "My collection"
							: "My wishlist"
						}
					</h2>

					<div className={libraryStyles.library__games}>
						<h3 className={libraryStyles.library__gamesTitle}>Games</h3>

						<div className={libraryStyles.library__gamesList}>
							{isOnCollectionTab
								? gamesCollection.length > 0
									? gamesCollection.map(entry => (
										<GameCard
											key={entry.id}
											id={entry.id}
											slug={entry.slug}
											pathname={"/game/[slug]"}
											as={`/game/${entry.slug}`}
											imageSrc={entry.imageSrc}
											imageAlt={`${entry.name} cover image`}
											gameName={entry.gameName}
											gameParentPlatforms={entry.gameParentPlatforms}
											gameRelease={entry.gameRelease}
											gamesCollection={gamesCollection}
											setGamesCollection={setGamesCollection}
											gamesWishlist={gamesWishlist}
											setGamesWishlist={setGamesWishlist}
										/>
									))
									: <p className={libraryStyles.library__noEntry}>You have not added any games to your collection yet</p>
								: gamesWishlist.length > 0
									? gamesWishlist.map(entry => (
										<GameCard
											key={entry.id}
											id={entry.id}
											slug={entry.slug}
											pathname={"/game/[slug]"}
											as={`/game/${entry.slug}`}
											imageSrc={entry.imageSrc}
											imageAlt={`${entry.name} cover image`}
											gameName={entry.gameName}
											gameParentPlatforms={entry.gameParentPlatforms}
											gameRelease={entry.gameRelease}
											gamesCollection={gamesCollection}
											setGamesCollection={setGamesCollection}
											gamesWishlist={gamesWishlist}
											setGamesWishlist={setGamesWishlist}
										/>
									))
									: <p className={libraryStyles.library__noEntry}>You have no games in your wishlist yet</p>
							}
						</div>
					</div>

					<div className={libraryStyles.library__platforms}>
						<h3 className={libraryStyles.library__platformsTitle}>Platforms</h3>

						<div className={libraryStyles.library__platformsList}>
							{isOnCollectionTab
								? (platformsCollection.length > 0
									? platformsCollection.map(entry => (
										<PlatformCard
											key={entry.id}
											id={entry.id}
											slug={entry.slug}
											pathname={"/platform/[slug]"}
											as={`/platform/${entry.slug}`}
											imageSrc={entry.imageSrc}
											imageAlt={`${entry.name} cover image`}
											platformName={entry.platformName}
											gamesCount={entry.gamesCount}
											startYear={entry.startYear}
											endYear={entry.endYear}
											platformsCollection={platformsCollection}
											setPlatformsCollection={setPlatformsCollection}
											platformsWishlist={platformsWishlist}
											setPlatformsWishlist={setPlatformsWishlist}
										/>
									))
									: <p className={libraryStyles.library__noEntry}>You have not added any platform to your collection yet</p>
								)
								: (
									platformsWishlist.length > 0
									? platformsWishlist.map(entry => (
										<PlatformCard
											key={entry.id}
											id={entry.id}
											slug={entry.slug}
											pathname={"/platform/[slug]"}
											as={`/platform/${entry.slug}`}
											imageSrc={entry.imageSrc}
											imageAlt={`${entry.name} cover image`}
											platformName={entry.platformName}
											gamesCount={entry.gamesCount}
											startYear={entry.startYear}
											endYear={entry.endYear}
											platformsCollection={platformsCollection}
											setPlatformsCollection={setPlatformsCollection}
											platformsWishlist={platformsWishlist}
											setPlatformsWishlist={setPlatformsWishlist}
										/>
									))
									: <p className={libraryStyles.library__noEntry}>You have no platforms in your wishlist yet</p>
								)
							}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Library;
