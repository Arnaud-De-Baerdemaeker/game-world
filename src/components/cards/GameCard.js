/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";
import {useState} from "react";

import Button from "@/components/button/Button";

const GameCard = (props) => {
	const [isPopupOn, setIsPopupOn] = useState({
		condition: false,
		message: null
	});

	// Define the data to add to the database
	const newEntry = {
		id: props.id,
		slug: props.slug,
		as: props.as,
		imageSrc: props.imageSrc,
		imageAlt: props.imageAlt,
		gameName: props.gameName,
		gamePlatforms: props.gamePlatforms,
		gameRelease: props.gameRelease,
		gameGenres: props.gameGenres
	};

	const addToLibrary = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist store
			let stores = openedDatabase.transaction(["Games library", "Games wishlist"], "readwrite");
			let gamesLibraryStore = stores.objectStore("Games library");
			let gamesWishlistStore = stores.objectStore("Games wishlist");

			// Check if the entry is already in the collection
			let checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
			checkGamesLibraryEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new game to the collection
					let objectStoreAdd = gamesLibraryStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the game to your collection");

						// Check if the same game is in the wishlist
						let checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
						checkGamesWishlistEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								let objectStoreDelete = gamesWishlistStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									if(window.location.pathname === "/libraries") {
										// Display the popup during 5 seconds
										handlePopupDisplay("Removed the game from your wishlist and added it to your collection");

										// Remove the card after 5 seconds
										setTimeout(() => {
											let filteredArray = props.gamesWishlist.filter(entry => entry.id !== props.id);
											props.setGamesWishlist(filteredArray);
										}, 5000);
									}
								};
								objectStoreDelete.onerror = (event) => {
									// TODO: Signify the operation to remove from the wishlist failed
								};
							}
						};
					};
				}
				// If it is...
				else {
					// Remove the game from the collection
					let objectStoreDelete = gamesLibraryStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the game from your collection");

						// Update the state containing the game to remove it
						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								let filteredArray = props.gamesCollection.filter(entry => entry.id !== props.id);
								props.setGamesCollection(filteredArray);
							}, 5000);
						}
					};
					objectStoreDelete.onerror = (event) => {
						// TODO: Add modal to indicate the addition failed
					}
				}
			};
		};
		openDatabase.onerror = (event) => {
			// TODO: Think of a way to let know the connection to the database failed
		};
	};

	const addToWishlist = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist stores
			let stores = openedDatabase.transaction(["Games wishlist", "Games library"], "readwrite");
			let gamesWishlistStore = stores.objectStore("Games wishlist");
			let gamesLibraryStore = stores.objectStore("Games library");

			// Check if the game is already in the wishlist
			let checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
			checkGamesWishlistEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new game to the wishlist
					let objectStoreAdd = gamesWishlistStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the game to your wishlist");

						// Check if the same game is in the collection
						let checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
						checkGamesLibraryEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								let objectStoreDelete = gamesLibraryStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// Display the popup during 5 seconds
									handlePopupDisplay("Removed the game from your collection and added it to your wishlist");

									if(window.location.pathname === "/libraries") {
										// Remove the card after a 5 seconds delay
										setTimeout(() => {
											let filteredArray = props.gamesCollection.filter(entry => entry.id !== props.id);
											props.setGamesCollection(filteredArray);
										}, 5000);
									}
								};
								objectStoreDelete.onerror = (event) => {
									// TODO: Signify the operation to remove from the wishlist failed
								};
							}
						};
					};
				}
				// If it is...
				else {
					// Remove the game from the wishlist
					let objectStoreDelete = gamesWishlistStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the game from your wishlist");

						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								let filteredArray = props.gamesWishlist.filter(entry => entry.id !== props.id);
								props.setGamesWishlist(filteredArray);
							}, 5000);
						}
					};
					objectStoreDelete.onerror = (event) => {
						// TODO: Add modal to indicate the addition failed
					};
				}
			};
		};
		openDatabase.onerror = (event) => {
			// TODO: Think of a way to let know the connection to the database failed
		};
	}

	const handlePopupDisplay = (message) => {
		setIsPopupOn({
			condition: true,
			message: message
		});

		setTimeout(() => {
			setIsPopupOn({
				condition: false,
				message: null
			});
		}, 5000);
	};

	return(
		<article>
			{!isPopupOn.condition
				? (
					<>
						<div>
							<figure>
								<img
									src={props.imageSrc}
									alt={props.imageAlt}
									className={props.imageClass}
								/>
							</figure>
							<h4 data-name={props.slug}>{props.gameName}</h4>
						</div>

						<menu>
							<ul>
								<li>
									<Link
										href={{
											pathname: props.pathname,
											query: {
												id: props.id
											}
										}}
										as={props.as}
									>
										View
									</Link>
								</li>
								<li>
									<Button
										buttonType="button"
										buttonAction={addToLibrary}
										buttonClass=""
									>
										Collection
									</Button>
								</li>
								<li>
									<Button
										buttonType="button"
										buttonAction={addToWishlist}
										buttonClass=""
									>
										Wishlist
									</Button>
								</li>
							</ul>
						</menu>

						{props.gamePlatforms || props.gameRelease || props.gameGenres
							? (
								<dl>
									<dt>Platforms</dt>
									{props.gamePlatforms.length > 0
										? <>
											{props.gamePlatforms.map(item => (
												<dd
													key={item.platform.id}
													data-platform={item.platform.slug}
												>
													{item.platform.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}

									<dt>Release</dt>
									{props.gameRelease
										? <dd>{props.gameRelease}</dd>
										: <dd>N/A</dd>
									}

									<dt>Genres</dt>
									{props.gameGenres.length > 0
										? <>
											{props.gameGenres.map(item => (
												<dd
													key={item.id}
													data-genre={item.slug}
												>
													{item.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}
								</dl>
							)
							: null
						}
					</>
				)
				: (
					<div>
						<h4>{isPopupOn.message}</h4>
					</div>
				)
			}
		</article>
	);
};

export default GameCard;
