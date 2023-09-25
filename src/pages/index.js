/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import SearchField from "@/components/searchField/SearchField";
import SearchResults from "@/components/searchResults/SearchResults";
import LatestReleasesResults from "@/components/latestReleasesResults/LatestReleasesResults";
import Footer from "@/components/footer/Footer";

import {getLatestReleases} from "@/api/games/getLatestReleases";
import {searchGames} from "@/api/games/searchGames";

import homeStyles from "./Home.module.scss";

const Home = (props) => {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [isSearchInUse, setIsSearchInUse] = useState(false);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleSearchQuery = async (event) => {
		event.preventDefault();

		const query = event.target[0].value;
		setSearchQuery(query);

		await searchGames({query})
		.then(results => {
			setIsSearchInUse(true);
			setSearchResults(results.data);

			if(results.data.next != null) {
				setHasFollowingCallsMoreResults(true);
				setHasFirstCallMoreResults(null);
			}
			else {
				setHasFollowingCallsMoreResults(false);
				setHasFirstCallMoreResults(null);
			}
		});
	};

	const resetAll = () => {
		setIsSearchInUse(false);
		setSearchQuery(null);
		setSearchResults(null);
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		props.latestReleases.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);

		// Check if the browser supports IndexedDB
		if(!("indexedDB" in window)) {
			alert("This browser doesn't support IndexedDB.");
			return;
		}

		// Initialize the database if necessary
		const openDatabase = window.indexedDB.open("game-world-database", 1);

		openDatabase.onupgradeneeded = (event) => {
			const database = event.target.result;
			console.log(event);

			// Create the Games library object store
			const createGamesLibrary = database.createObjectStore("Games library", {keyPath: "id"});

			// Define the indexes of the Games library
			createGamesLibrary.createIndex("id", "id", {unique: true});
			createGamesLibrary.createIndex("slug", "slug", {unique: true});
			createGamesLibrary.createIndex("as", "as", {unique: true});
			createGamesLibrary.createIndex("imageSrc", "imageSrc");
			createGamesLibrary.createIndex("imageAlt", "imageAlt");
			createGamesLibrary.createIndex("gameName", "gameName");
			createGamesLibrary.createIndex("gamePlatforms", "gamePlatforms", {multiEntry: true});
			createGamesLibrary.createIndex("gameRelease", "gameRelease");
			createGamesLibrary.createIndex("gameGenres", "gameGenres", {multiEntry: true});


			// Create the Games wishlist object store
			const createGamesWishlist = database.createObjectStore("Games wishlist", {keyPath: "id"});

			// Define the indexes of the Games wishlist
			createGamesWishlist.createIndex("id", "id", {unique: true});
			createGamesWishlist.createIndex("slug", "slug", {unique: true});
			createGamesWishlist.createIndex("as", "as", {unique: true});
			createGamesWishlist.createIndex("imageSrc", "imageSrc");
			createGamesWishlist.createIndex("imageAlt", "imageAlt");
			createGamesWishlist.createIndex("gameName", "gameName");
			createGamesWishlist.createIndex("gamePlatforms", "gamePlatforms", {multiEntry: true});
			createGamesWishlist.createIndex("gameRelease", "gameRelease");
			createGamesWishlist.createIndex("gameGenres", "gameGenres", {multiEntry: true});


			// Create the Platforms library object store
			const createPlatformsLibrary = database.createObjectStore("Platforms library", {keyPath: "id"});

			// Define the indexes of the Platforms library
			createPlatformsLibrary.createIndex("id", "id", {unique: true});
			createPlatformsLibrary.createIndex("slug", "slug", {unique: true});
			createPlatformsLibrary.createIndex("as", "as", {unique: true});
			createPlatformsLibrary.createIndex("imageSrc", "imageSrc");
			createPlatformsLibrary.createIndex("imageAlt", "imageAlt");
			createPlatformsLibrary.createIndex("platformName", "platformName");
			createPlatformsLibrary.createIndex("gamesCount", "gamesCount", {multiEntry: true});
			createPlatformsLibrary.createIndex("startYear", "startYear");
			createPlatformsLibrary.createIndex("endYear", "endYear", {multiEntry: true});


			// Create the Platforms wishlist
			const createPlatformsWishlist = database.createObjectStore("Platforms wishlist", {keyPath: "id"});

			//Define the indexes of the Platform wishlist
			createPlatformsWishlist.createIndex("id", "id", {unique: true});
			createPlatformsWishlist.createIndex("slug", "slug", {unique: true});
			createPlatformsWishlist.createIndex("as", "as", {unique: true});
			createPlatformsWishlist.createIndex("imageSrc", "imageSrc");
			createPlatformsWishlist.createIndex("imageAlt", "imageAlt");
			createPlatformsWishlist.createIndex("platformName", "platformName");
			createPlatformsWishlist.createIndex("gamesCount", "gamesCount", {multiEntry: true});
			createPlatformsWishlist.createIndex("startYear", "startYear");
			createPlatformsWishlist.createIndex("endYear", "endYear", {multiEntry: true});
		};

		openDatabase.onerror = (event) => {
			console.error("L'utilisation d'IndexedDB ne semble pas possible. Les fonctions de sauvegarde dans la librairie ne seront pas disponibles.");
		}

		openDatabase.onsuccess = (event) => {
			console.log("La base de données locale a bien été créée/ouverte. Vous pouvez l'utiliser pour enregistrer des objets dans votre librairie.");
		}
	}, []);

	return(
		<>
			<Head>
				<title>Home | Game World</title>
				<meta
					name="description"
					content="The homepage of the website. By default, games that were released in the last 30 days are shown."
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
				title="Explore, Save, Wish"
				catchword="Browsing your favorite games and platforms is as simple as it can be"
			/>
			<main className={homeStyles.home}>
				<SearchField
					formAction={handleSearchQuery}
					resetAll={resetAll}
				/>

				{isSearchInUse
					? <SearchResults
						searchQuery={searchQuery}
						searchResults={searchResults}
						hasFirstCallMoreResults={hasFirstCallMoreResults}
						setHasFirstCallMoreResults={setHasFirstCallMoreResults}
						hasFollowingCallsMoreResults={hasFollowingCallsMoreResults}
						setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					/>
					: <LatestReleasesResults
						latestReleases={props.latestReleases}
						hasFirstCallMoreResults={hasFirstCallMoreResults}
						setHasFirstCallMoreResults={setHasFirstCallMoreResults}
						hasFollowingCallsMoreResults={hasFollowingCallsMoreResults}
						setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					/>
				}
			</main>
			<Footer />
		</>
	);
}

export default Home;

const getStaticProps = async () => {
	const latestReleasesRequest = await getLatestReleases({});
	const latestReleasesResponse = latestReleasesRequest.data;

	return {
		props: {
			latestReleases: latestReleasesResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
