/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";
import {useState} from "react";

import Button from "@/components/button/Button";

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
		<article>
			{isPopupOn.condition
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
							<h4 data-name={props.slug}>{props.platformName}</h4>
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

						{props.gamesCount || props.startYear || props.endYear
							? (
								<dl>
									<dt>Games count</dt>
									<dd>{props.gamesCount ? props.gamesCount : "N/A"}</dd>

									<dt>Start year</dt>
									<dd>{props.startYear ? props.startYear : "N/A"}</dd>

									<dt>End year</dt>
									<dd>{props.endYear ? props.endYear : "N/A"}</dd>
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

export default PlatformCard;
