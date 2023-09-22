/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";

import ActionComplete from "@/components/actionComplete/ActionComplete";
import Button from "@/components/button/Button";
import Icon from "@/components/icon/Icon";

import gameCardStyles from "@/components/cards/GameCard.module.scss";
import buttonStyles from "@/components/button/Button.module.scss";

const GameCard = (props) => {
	const [isPopupOn, setIsPopupOn] = useState({
		condition: false,
		message: null
	});
	const [isAddedToCollection, setIsAddedToCollection] = useState(false);
	const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

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
			const openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist store
			const stores = openedDatabase.transaction(["Games library", "Games wishlist"], "readwrite");
			const gamesLibraryStore = stores.objectStore("Games library");
			const gamesWishlistStore = stores.objectStore("Games wishlist");

			// Check if the entry is already in the collection
			const checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
			checkGamesLibraryEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new game to the collection
					const objectStoreAdd = gamesLibraryStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the game to your collection");
						setIsAddedToCollection(true);

						// Check if the same game is in the wishlist
						const checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
						checkGamesWishlistEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								const objectStoreDelete = gamesWishlistStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									if(window.location.pathname === "/libraries") {
										// Display the popup during 5 seconds
										handlePopupDisplay("Removed the game from your wishlist and added it to your collection");
										setIsAddedToWishlist(false);
										setIsAddedToCollection(true);

										// Remove the card after 5 seconds
										setTimeout(() => {
											const filteredArray = props.gamesWishlist.filter(entry => entry.id !== props.id);
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
					const objectStoreDelete = gamesLibraryStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the game from your collection");
						setIsAddedToCollection(false);

						// Update the state containing the game to remove it
						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								const filteredArray = props.gamesCollection.filter(entry => entry.id !== props.id);
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
			const openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist stores
			const stores = openedDatabase.transaction(["Games wishlist", "Games library"], "readwrite");
			const gamesWishlistStore = stores.objectStore("Games wishlist");
			const gamesLibraryStore = stores.objectStore("Games library");

			// Check if the game is already in the wishlist
			const checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
			checkGamesWishlistEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new game to the wishlist
					const objectStoreAdd = gamesWishlistStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the game to your wishlist");
						setIsAddedToWishlist(true);

						// Check if the same game is in the collection
						const checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
						checkGamesLibraryEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								const objectStoreDelete = gamesLibraryStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// Display the popup during 5 seconds
									handlePopupDisplay("Removed the game from your collection and added it to your wishlist");
									setIsAddedToCollection(false);
									setIsAddedToWishlist(true);

									if(window.location.pathname === "/libraries") {
										// Remove the card after a 5 seconds delay
										setTimeout(() => {
											const filteredArray = props.gamesCollection.filter(entry => entry.id !== props.id);
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
					const objectStoreDelete = gamesWishlistStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the game from your wishlist");
						setIsAddedToWishlist(false);

						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								const filteredArray = props.gamesWishlist.filter(entry => entry.id !== props.id);
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

	useEffect(() => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			const openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist store
			const stores = openedDatabase.transaction(["Games library", "Games wishlist"], "readonly");
			const gamesLibraryStore = stores.objectStore("Games library");
			const gamesWishlistStore = stores.objectStore("Games wishlist");

			// Check if the entry is already in the collection
			const checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
			checkGamesLibraryEntry.onsuccess = (event) => {
				if(event.target.result > 0) {
					setIsAddedToCollection(true);
				}
				else {
					setIsAddedToCollection(false);
				}
			}

			// Check if the entry is already in the wishlist
			const checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
			checkGamesWishlistEntry.onsuccess = (event) => {
				if(event.target.result > 0) {
					setIsAddedToWishlist(true);
				}
				else {
					setIsAddedToWishlist(false);
				}
			}
		}
	}, []);

	return(
		<article className={gameCardStyles.gameCard}>
			<ActionComplete
				isPopupOn={isPopupOn}
				message={isPopupOn.message}
			/>
			<div className={gameCardStyles.gameCard__container} >
				<header>
					<figure className={gameCardStyles.gameCard__illustration}>
						{props.imageSrc
							? <Image
								src={props.imageSrc}
								alt={props.imageAlt}
								responsive="true"
								width={500}
								height={500}
								className={gameCardStyles.gameCard__image}
							/>
							: null
						}
					</figure>

					<menu className={gameCardStyles.gameCard__menu}>
						<li
							title="View the game's details"
							className={gameCardStyles.gameCard__listItem}
						>
							<Link
								href={{
									pathname: props.pathname,
									query: {
										id: props.id
									}
								}}
								as={props.as}
								className={gameCardStyles.gameCard__view}
							>
								<Icon icon="view" />
							</Link>
						</li>
						<li
							title="Add the game to your library"
							className={gameCardStyles.gameCard__listItem}
						>
							<Button
								buttonType="button"
								buttonAction={addToLibrary}
								buttonClass={isAddedToCollection ? buttonStyles["button__cardAction--checked"] : buttonStyles.button__cardAction}
							>
								<Icon
									icon="collection"
									isAddedToCollection={isAddedToCollection}
								/>
							</Button>
						</li>
						<li
							title="Add the game to your wishlist"
							className={gameCardStyles.gameCard__listItem}
						>
							<Button
								buttonType="button"
								buttonAction={addToWishlist}
								buttonClass={isAddedToWishlist ? buttonStyles["button__cardAction--checked"] : buttonStyles.button__cardAction}
							>
								<Icon
									icon="wishlist"
									isAddedToWishlist={isAddedToWishlist}
								/>
							</Button>
						</li>
					</menu>

					<h4
						data-name={props.slug}
						className={gameCardStyles.gameCard__title}
					>
						{props.gameName}
					</h4>
				</header>

				{props.gameParentPlatforms || props.gameRelease || props.gameGenres
					? (
						<dl className={gameCardStyles.gameCard__informations}>
							<div className={gameCardStyles.gameCard__platforms}>
								{props.gameParentPlatforms.length == 1
									? <dt className={gameCardStyles.gameCard__platformsTitle}>Platform</dt>
									: <dt className={gameCardStyles.gameCard__platformsTitle}>Platforms</dt>
								}

								{props.gameParentPlatforms.length > 0
									? <div className={gameCardStyles.gameCard__platformsList}>
										{props.gameParentPlatforms.map(item => (
											<dd
												key={item.platform.id}
												data-platform={item.platform.slug}
												className={gameCardStyles.gameCard__platformsItems}
											>
												<Icon icon={item.platform.slug} />
											</dd>
										))}
									</div>
									: <dd className={gameCardStyles.gameCard__platformsItems}>N/A</dd>
								}
							</div>

							<div className={gameCardStyles.gameCard__release}>
								<dt className={gameCardStyles.gameCard__releaseTitle}>Release date</dt>
								{props.gameRelease
									? <dd className={gameCardStyles.gameCard__releaseDate}>{props.gameRelease}</dd>
									: <dd className={gameCardStyles.gameCard__releaseDate}>N/A</dd>
								}
							</div>
						</dl>
					)
					: null
				}
			</div>
		</article>
	);
};

export default GameCard;
