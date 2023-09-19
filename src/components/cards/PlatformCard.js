/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";

import ActionComplete from "@/components/actionComplete/ActionComplete";
import Button from "@/components/button/Button";
import Icon from "../icon/Icon";

import platformCardStyles from "@/components/cards/PlatformCard.module.scss";

const PlatformCard = (props) => {
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
		platformName: props.platformName,
		gamesCount: props.gamesCount,
		startYear: props.startYear,
		endYear: props.endYear
	};

	const addToLibrary = () => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist stores
			let stores = openedDatabase.transaction(["Platforms library", "Platforms wishlist"], "readwrite");
			let platformsLibraryStore = stores.objectStore("Platforms library");
			let platformsWishlistStore = stores.objectStore("Platforms wishlist");

			// Check if the platform is already in the collection
			let checkPlatformsLibraryEntry = platformsLibraryStore.count(props.id);
			checkPlatformsLibraryEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new platform to the collection
					let objectStoreAdd = platformsLibraryStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the platform to your collection");

						// Check if the same platform is in the wishlist
						let checkPlatformsWishlistEntry = platformsWishlistStore.count(props.id);
						checkPlatformsWishlistEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								let objectStoreDelete = platformsWishlistStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// Display the popup during 5 seconds
									handlePopupDisplay("Removed the platform from your wishlist and added it to your collection");

									if(window.location.pathname === "/libraries") {
										// Remove the card after 5 seconds
										setTimeout(() => {
											let filteredArray = props.platformsWishlist.filter(entry => entry.id !== props.id);
											props.setPlatformsWishlist(filteredArray);
										}, 5000);
									}
								};
								objectStoreDelete.onerror = (event) => {
									// TODO: Signify the operation to remove from the wishlist failed
								};
							}
						}
					};
				}
				// If it is...
				else {
					// Remove the platform from the collection
					let objectStoreDelete = platformsLibraryStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the platform from your collection");

						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								let filteredArray = props.platformsCollection.filter(entry => entry.id !== props.id);
								props.setPlatformsCollection(filteredArray);
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
			let stores = openedDatabase.transaction(["Platforms wishlist", "Platforms library"], "readwrite");
			let platformsWishlistStore = stores.objectStore("Platforms wishlist");
			let platformsLibraryStore = stores.objectStore("Platforms library");

			// Check if the platform is already in the wishlist
			let checkPlatformsWishlistEntry = platformsWishlistStore.count(props.id);
			checkPlatformsWishlistEntry.onsuccess = (event) => {
				// If it's not...
				if(event.target.result === 0) {
					// Add a new platform to the wishlist
					let objectStoreAdd = platformsWishlistStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Added the platform to your wishlist");

						// Check if the same platform is in the collection
						let checkPlatformsLibraryEntry = platformsLibraryStore.count(props.id);
						checkPlatformsLibraryEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								let objectStoreDelete = platformsLibraryStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// Display the popup during 5 seconds
									handlePopupDisplay("Removed the platform from your collection and added it to your wishlist");

									if(window.location.pathname === '/libraries') {
										// Remove the card after 5 seconds
										setTimeout(() => {
											let filteredArray = props.platformsCollection.filter(entry => entry.id !== props.id);
											props.setPlatformsCollection(filteredArray);
										}, 5000);
									}
								}
							}
						};
						checkPlatformsLibraryEntry.onerror = (event) => {
							// TODO: Add modal to indicate the addition worked
						}
					};
				}
				// If it is...
				else {
					// Remove the platform from the wishlist
					let objectStoreDelete = platformsWishlistStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// Display the popup during 5 seconds
						handlePopupDisplay("Removed the platform from your wishlist");

						if(window.location.pathname === "/libraries") {
							// Remove the card after 5 seconds
							setTimeout(() => {
								let filteredArray = props.platformsWishlist.filter(entry => entry.id !== props.id);
								props.setPlatformsWishlist(filteredArray);
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
		<article className={platformCardStyles.platformCard}>
			<ActionComplete
				isPopupOn={isPopupOn}
				message={isPopupOn.message}
			/>
			<div className={platformCardStyles.platformCard__container}>
				{props.imageSrc
					? <Image
						src={props.imageSrc}
						alt={props.imageAlt}
						responsive="true"
						width={500}
						height={500}
						className={platformCardStyles.platformCard__image}
					/>
					: null
				}

				<header className={platformCardStyles.platformCard__header}>
					<h4
						data-name={props.slug}
						className={platformCardStyles.platformCard__title}
					>
						{props.platformName}
					</h4>
				</header>

				{props.gamesCount || props.startYear || props.endYear
					? (
						<dl className={platformCardStyles.platformCard__informations}>
							<div className={platformCardStyles.platformCard__dataSection}>
								<dt className={platformCardStyles.platformCard__label}>Games</dt>
								<dd className={platformCardStyles.platformCard__value}>{props.gamesCount ? props.gamesCount : "N/A"}</dd>
							</div>

							<div className={platformCardStyles.platformCard__dataSection}>
								<dt className={platformCardStyles.platformCard__label}>Start year</dt>
								<dd className={platformCardStyles.platformCard__value}>{props.startYear ? props.startYear : "N/A"}</dd>
							</div>

							<div className={platformCardStyles.platformCard__dataSection}>
								<dt className={platformCardStyles.platformCard__label}>End year</dt>
								<dd className={platformCardStyles.platformCard__value}>{props.endYear ? props.endYear : "N/A"}</dd>
							</div>
						</dl>
					)
					: null
				}

				<menu className={platformCardStyles.platformCard__menu}>
					<li
						title="View the game's details"
						className={platformCardStyles.platformCard__listItem}
					>
						<Link
							href={{
								pathname: props.pathname,
								query: {
									id: props.id
								}
							}}
							as={props.as}
							className={platformCardStyles.platformCard__view}
						>
							<Icon icon="view" />
						</Link>
					</li>
					<li
						title="Add the game to your library"
						className={platformCardStyles.platformCard__listItem}
					>
						<Button
							buttonType="button"
							buttonAction={addToLibrary}
							// buttonClass={isAddedToCollection ? buttonStyles["button__cardAction--checked"] : buttonStyles.button__cardAction}
						>
							<Icon
								icon="collection"
								// isAddedToCollection={isAddedToCollection}
							/>
						</Button>
					</li>
					<li
						title="Add the game to your wishlist"
						className={platformCardStyles.platformCard__listItem}
					>
						<Button
							buttonType="button"
							buttonAction={addToWishlist}
							// buttonClass={isAddedToCollection ? buttonStyles["button__cardAction--checked"] : buttonStyles.button__cardAction}
						>
							<Icon
								icon="wishlist"
								// isAddedToWishlist={isAddedToWishlist}
							/>
						</Button>
					</li>
				</menu>
			</div>
		</article>
	);
};

export default PlatformCard;
