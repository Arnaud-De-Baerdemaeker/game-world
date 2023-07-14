/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import Button from "@/components/button/Button";

const PlatformCard = (props) => {
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

			// Open a transaction and access the Platforms object store
			let stores = openedDatabase.transaction(["Platforms library", "Platforms wishlist"], "readwrite");
			let platformsLibraryStore = stores.objectStore("Platforms library");
			let platformsWishlistStore = stores.objectStore("Platforms wishlist");

			// Check if the entry is already in the database
			let checkPlatformsLibraryEntry = platformsLibraryStore.count(props.id);
			checkPlatformsLibraryEntry.onsuccess = (event) => {
				if(event.target.result === 0) {
					// Add a new entry to the object store
					let objectStoreAdd = platformsLibraryStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Check if the same entry is in the wishlist
						let checkPlatformsWishlistEntry = platformsWishlistStore.count(props.id);
						checkPlatformsWishlistEntry.onsuccess = (event) => {
							if(event.target.result !== 0) {
								let objectStoreDelete = platformsWishlistStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// TODO: Add a modal to signify the entry has been added to the library
									// TODO: Signify the item has been removed from the wishlist if added in the library
								};
								objectStoreDelete.onerror = (event) => {
									// TODO: Signify the operation to remove from the wishlist failed
								};
							}
						}
					};
				}
				else {
					// Remove the entry from the database
					let objectStoreDelete = platformsLibraryStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// TODO: Add modal to indicate the addition failed
					};
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

			// Open a transaction and access the Platforms object store
			let stores = openedDatabase.transaction(["Platforms wishlist", "Platforms library"], "readwrite");
			let platformsWishlistStore = stores.objectStore("Platforms wishlist");
			let platformsLibraryStore = stores.objectStore("Platforms library");

			// Check if the entry is already in the database
			let checkPlatformsWishlistEntry = platformsWishlistStore.count(props.id);
			checkPlatformsWishlistEntry.onsuccess = (event) => {
				if(event.target.result === 0) {
					// Add a new entry to the object store
					let objectStoreAdd = platformsWishlistStore.add(newEntry);
					objectStoreAdd.onsuccess = (event) => {
						// Check if the entry is in the wishlist
						let checkPlatformsLibraryEntry = platformsLibraryStore.count(props.id);
						checkPlatformsLibraryEntry.onsuccess = (event) => {
							if(event.target.result !== 0) {
								let objectStoreDelete = platformsLibraryStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// TODO: Add a modal to signify the entry has been added to the wishlist
									// TODO: Signify the entry has been removed from the library if it was in
								}
							}
						};
						// TODO: Add modal to indicate the addition worked
					};
				}
				else {
					// Remove the entry from the database
					let objectStoreDelete = platformsWishlistStore.delete(props.id);
					objectStoreDelete.onsuccess = (event) => {
						// TODO: Add modal to indicate the addition failed
					};
				}
			};
		};
		openDatabase.onerror = (event) => {
			// TODO: Think of a way to let know the connection to the database failed
		};
	};

	return(
		<article>
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
							Voir
						</Link>
					</li>
					<li>
						<Button
							buttonType="button"
							buttonAction={addToLibrary}
							buttonClass=""
						>
							Library
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
		</article>
	);
};

export default PlatformCard;
