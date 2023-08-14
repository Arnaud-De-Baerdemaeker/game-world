/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";

import Button from "@/components/button/Button";
import SVG from "../svg/SVG";
import ActionComplete from "@/components/actionComplete/ActionComplete";

import gameCardStyles from "@/components/cards/GameCard.module.scss";
import buttonStyles from "@/components/button/Button.module.scss";
import svgStyles from "@/components/svg/SVG.module.scss";

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

	const displayPlatformsIcons = (slug) => {
		// PC icon
		if(slug == "pc") {
			return(
				<>
					<SVG
						svgViewbox="0 0 16 16"
						svgCoordinates={<path d="M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0 2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z" />}
						svgClass={svgStyles.svg__platform}
					/>
					PC
				</>
			);
		}
		// PlayStation icon
		else if(slug.includes("playstation") || slug.includes("ps")) {
			return(
				<>
					<SVG
						svgViewbox="0 0 21 16"
						svgCoordinates={<path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z" />}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "playstation5"
						? "PS5"
						: slug == "playstation4"
							? "PS4"
							: slug == "playstation3"
								? "PS3"
								: slug == "playstation2"
									? "PS2"
									: slug == "playstation1"
										? "PS"
										: slug == "ps-vita"
											? "PSVita"
											: slug == "psp" && "PSP"
					}
				</>
			);
		}
		// Xbox icon
		else if(slug.includes("xbox")) {
			return(
				<>
					<SVG
						svgViewbox="0 0 16 16"
						svgCoordinates={<path d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z" />}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "xbox-series-x"
						? "XSeries"
						: slug == "xbox-one"
							? "XOne"
							: slug == "xbox360"
								? "X360"
								: slug == "xbox-old" && "Xbox"
					}
				</>
			);
		}
		// Nintendo icon
		else if(slug.includes("nintendo") || slug.includes("wii") || slug == "gamecube" || slug.includes("nes") || slug.includes("game-boy")) {
			return(
				<>
					<SVG
						svgViewbox="0 0 21 16"
						svgCoordinates={
							<path
								fillRule="evenodd"
								d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z"
							/>
						}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "nintendo-switch"
						? "Switch"
						: slug == "wii-u"
							? "WiiU"
							: slug == "wii"
								? "Wii"
								: slug == "gamecube"
									? "NGC"
									: slug == "nintendo-64"
										? "N64"
										: slug == "snes"
											? "SNES"
											: slug == "nes"
												? "NES"
												: slug == "nintendo-3ds"
													? "3DS"
													: slug == "nintendo-dsi"
														? "DSi"
														: slug == "nintendo-ds"
															? "DS"
															: slug == "game-boy-advance"
																? "GBA"
																: slug == "game-boy-color"
																	? "GBC"
																	: slug == "game-boy" && "GB"
					}
				</>
			);
		}
		// Linux icon
		else if(slug == "linux") {
			return(
				<>
					<SVG
						svgViewbox="0 0 15 18"
						svgCoordinates={<path d="M14.52 14.452c-.513-.216-.733-.503-.712-.93.022-.5-.254-.866-.385-1.01.079-.312.31-1.386 0-2.32-.334-.999-1.352-2.525-2.403-4.025-.43-.616-.45-1.285-.474-2.06-.022-.74-.048-1.579-.45-2.51C9.66.582 8.785 0 7.694 0a3.23 3.23 0 00-1.829.572c-1.05.744-.91 2.366-.819 3.44.013.147.024.286.031.404.061 1.052.006 1.606-.067 1.774-.047.11-.279.423-.524.755-.254.343-.541.732-.777 1.094-.281.436-.508 1.103-.728 1.747-.16.471-.312.917-.46 1.183-.28.512-.21.99-.152 1.21-.106.076-.259.225-.388.505-.156.342-.473.526-1.132.657-.303.063-.512.194-.621.388-.16.283-.073.638.006.881.117.357.044.583-.088.993-.03.095-.065.202-.1.32a.59.59 0 00.06.504c.248.391.974.529 1.722.62.447.054.935.237 1.408.415.463.173.942.353 1.377.408.066.008.131.012.195.012.657 0 .954-.447 1.048-.631a11.36 11.36 0 011.889-.23 8 8 0 011.878.199c.072.142.262.466.566.633.166.093.398.147.636.147.254 0 .737-.062 1.119-.475.38-.414 1.333-.944 2.029-1.33.155-.087.3-.167.427-.24.39-.223.604-.54.585-.872a.735.735 0 00-.463-.63zm-8.647-.08c-.049-.351-.49-.7-1-1.104-.417-.33-.89-.705-1.02-1.022-.27-.654-.057-1.804.313-2.396.183-.296.332-.746.477-1.18.156-.47.317-.956.497-1.168.286-.332.55-.978.597-1.486.267.262.682.595 1.066.595a.613.613 0 00.17-.024c.263-.078.649-.307 1.022-.528.322-.191.718-.426.868-.448.256.378 1.743 3.757 1.895 4.842a5.266 5.266 0 01-.071 1.847 1.289 1.289 0 00-.177-.013c-.414 0-.524.232-.552.37-.074.36-.082 1.512-.082 1.771-.15.195-.908 1.116-1.995 1.281-.443.066-.857.1-1.23.1-.318 0-.521-.026-.606-.039l-.546-.642c.215-.109.43-.34.374-.755zm.693-10.586a.863.863 0 00-.05.024 1.073 1.073 0 00-.011-.115c-.06-.353-.288-.609-.542-.609a.373.373 0 00-.058.005c-.151.026-.27.142-.335.308.057-.363.257-.631.495-.631.278 0 .514.385.514.842 0 .057-.004.115-.013.176zm2.166.272a.916.916 0 00.04-.268c0-.414-.256-.738-.583-.738-.319 0-.578.331-.578.738 0 .028 0 .056.003.084a10.386 10.386 0 00-.05-.02A1.156 1.156 0 017.51 3.5c0-.495.308-.898.686-.898.38 0 .687.403.687.898 0 .206-.055.403-.15.559zm-.28.963c-.005.025-.016.036-.145.105a3.894 3.894 0 00-.246.14l-.067.043c-.272.168-.907.564-1.079.587-.117.016-.19-.03-.352-.144a5.075 5.075 0 00-.118-.08c-.293-.198-.482-.416-.503-.501.095-.076.333-.266.454-.379.247-.235.495-.393.617-.393l.019.001c.144.027.5.172.76.279.12.049.224.092.297.118.23.082.35.185.364.224zM10.52 16.02c.13-.6.279-1.418.255-1.9-.006-.11-.015-.229-.024-.344-.017-.215-.043-.535-.017-.63a.11.11 0 01.018-.007c0 .276.06.825.487 1.017.128.057.273.086.433.086.429 0 .904-.216 1.1-.416a2.05 2.05 0 00.278-.376.465.465 0 01.02.177c-.026.406.166.945.532 1.144l.053.029c.13.07.477.257.482.345 0 0-.003.01-.022.03-.087.08-.392.24-.687.395-.524.275-1.117.586-1.384.874-.375.406-.8.678-1.056.678a.27.27 0 01-.084-.012c-.278-.09-.507-.502-.384-1.09zm-9.49-1.533c-.028-.136-.05-.244-.026-.348.017-.078.39-.16.548-.196.223-.05.454-.101.605-.195.204-.127.314-.361.412-.568.07-.15.143-.304.23-.354a.048.048 0 01.027-.007c.162 0 .503.351.7.665.05.08.142.238.248.421.32.55.757 1.3.985 1.553.206.226.54.661.457 1.035-.06.29-.379.525-.454.577a.454.454 0 01-.101.01c-.438 0-1.303-.374-1.768-.574l-.068-.03c-.26-.112-.684-.182-1.094-.25-.326-.055-.772-.129-.846-.196-.06-.069.01-.294.07-.492.045-.142.09-.29.115-.444a1.634 1.634 0 00-.04-.607z" />}
						svgClass={svgStyles.svg__platform}
					/>
					Linux
				</>
			);
		}
		// Apple icon
		else if(slug.includes("os") || slug == "apple-ii") {
			return(
				<>
					<SVG
						svgViewbox="0 0 15 18"
						svgCoordinates={<path d="M10.869 0h.127c.102 1.26-.379 2.202-.963 2.884-.574.677-1.359 1.334-2.629 1.234-.084-1.242.397-2.114.98-2.794C8.927.69 9.919.126 10.87 0zm3.756 13.196v.036a10.534 10.534 0 01-1.494 2.899c-.57.789-1.267 1.85-2.513 1.85-1.077 0-1.792-.696-2.896-.715-1.167-.02-1.81.583-2.877.734h-.364c-.783-.114-1.416-.74-1.877-1.302A11.452 11.452 0 010 10.134v-.808c.083-1.969 1.033-3.57 2.295-4.345.667-.413 1.583-.764 2.603-.607.437.068.884.219 1.275.368.371.144.835.398 1.275.385.298-.009.594-.165.894-.275.88-.32 1.74-.687 2.877-.514 1.365.207 2.334.818 2.933 1.76-1.155.74-2.068 1.855-1.912 3.76.138 1.73 1.137 2.742 2.385 3.338z" />}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "ios"
						? "iOS"
						: slug == "macos"
							? "macOS"
							: slug == "macintosh"
								? "Macintosh"
								: slug == "apple-ii" && "Apple II"
					}
				</>
			);
		}
		// Sega icon
		else if(slug == "genesis" || slug.includes("sega") || slug == "dreamcast" || slug == "game-gear") {
			return(
				<>
					<SVG
						svgViewbox="0 0 13 16"
						svgCoordinates={
							<g>
								<path d="M7.468 15.993c3.056 0 5.532-2.335 5.532-5.212 0-2.883-2.476-5.218-5.532-5.218l-1.94.01a.271.271 0 01-.276-.264c0-.146.124-.265.277-.265l7.454.001.003-2.212H5.527c-1.442 0-2.615 1.108-2.615 2.47 0 1.363 1.173 2.466 2.615 2.466l1.949.025c1.75 0 3.167 1.335 3.167 2.983 0 1.648-1.416 2.987-3.167 2.987H.003L0 16l7.468-.007z'/><path d='M.006 13.167h7.38c1.428 0 2.583-1.106 2.583-2.472 0-1.364-1.155-2.468-2.584-2.468l-1.924-.02c-1.726 0-3.126-1.34-3.126-2.993 0-1.65 1.4-2.989 3.126-2.989l7.366-.001L12.824 0H5.462C2.448 0 0 2.336 0 5.22c0 2.883 2.448 5.22 5.462 5.22l1.905.003c.145 0 .267.113.267.257 0 .14-.122.253-.267.253l-7.364.006.003 2.208" />
							</g>
						}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "genesis"
						? "Genesis"
						: slug == "sega-saturn"
							? "Saturn"
							: slug == "sega-cd"
								? "Sega CD"
								: slug == "sega-32x"
									? "Sega 32X"
									: slug == "sega-master-system"
										? "Master System"
										: slug == "dreamcast"
											? "Dreamcast"
											: slug == "game-gear" && "Game Gear"
					}
				</>
			);
		}
		// Android icon
		else if(slug == "android") {
			return(
				<>
					<SVG
						svgViewbox="0 0 16 18"
						svgCoordinates={<path d="M1.168 5.86H1.12c-.614 0-1.115.482-1.115 1.07v4.665c0 .59.5 1.071 1.115 1.071h.049c.614 0 1.115-.482 1.115-1.071V6.93c0-.589-.502-1.072-1.116-1.072zm1.65 7.535c0 .541.46.983 1.025.983h1.095v2.519c0 .591.503 1.073 1.116 1.073h.048c.615 0 1.116-.482 1.116-1.073v-2.52H8.75v2.52c0 .591.504 1.073 1.117 1.073h.047c.615 0 1.116-.482 1.116-1.073v-2.52h1.096c.564 0 1.025-.44 1.025-.982V6.03H2.818v7.364zm7.739-11.83l.87-1.29a.173.173 0 00-.054-.246.188.188 0 00-.256.052l-.902 1.335A6.092 6.092 0 007.985 1a6.1 6.1 0 00-2.232.416L4.853.08a.19.19 0 00-.257-.05.173.173 0 00-.055.246l.871 1.29c-1.57.739-2.628 2.131-2.628 3.729 0 .098.006.195.015.29H13.17c.009-.095.014-.192.014-.29 0-1.598-1.059-2.99-2.628-3.73zM5.58 3.875a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478.277 0 .5.213.5.478a.489.489 0 01-.5.48zm4.809 0a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478s.498.213.498.478a.488.488 0 01-.498.48zm4.458 1.985h-.046c-.614 0-1.117.482-1.117 1.07v4.665c0 .59.503 1.071 1.117 1.071h.047c.615 0 1.115-.482 1.115-1.071V6.93c0-.589-.501-1.072-1.116-1.072z" />}
						svgClass={svgStyles.svg__platform}
					/>
					Android
				</>
			);
		}
		// Web icon
		else if(slug == "web") {
			return(
				<>
					<SVG
						svgViewbox="0 0 16 16"
						svgCoordinates={<path d="M15.98 7.467A7.998 7.998 0 008.534.018V0H7.467v.018A7.999 7.999 0 00.018 7.467H0v1.066h.018a7.998 7.998 0 007.449 7.448V16h1.066v-.02a7.997 7.997 0 007.448-7.447H16V7.467h-.02zM5.009 1.744c-.515.685-.943 1.543-1.254 2.523H2.156a6.97 6.97 0 012.852-2.523zm-3.41 3.59h1.875c-.143.673-.234 1.39-.262 2.133H1.087c.056-.751.234-1.47.51-2.134zm-.511 3.2H3.21c.028.743.12 1.459.262 2.133H1.598a6.873 6.873 0 01-.511-2.134zm1.069 3.2h1.597c.311.979.739 1.837 1.255 2.522a6.962 6.962 0 01-2.852-2.523zm5.31 3.131c-1.096-.293-2.04-1.47-2.613-3.132h2.614v3.132zm0-4.198H4.555a11.921 11.921 0 01-.277-2.134h3.19v2.134zm0-3.2H4.278c.031-.751.126-1.47.277-2.134h2.913v2.134zm0-3.2H4.854c.573-1.661 1.517-2.839 2.614-3.131v3.13zm6.378 0H12.25c-.313-.98-.74-1.838-1.257-2.523a6.977 6.977 0 012.852 2.523zm-5.31-3.131c1.095.292 2.04 1.47 2.613 3.13H8.533v-3.13zm0 4.197h2.911c.152.665.245 1.383.278 2.134h-3.19V5.333zm0 3.2h3.189c-.031.751-.126 1.47-.278 2.134H8.533V8.533zm0 6.332v-3.132h2.613c-.573 1.661-1.518 2.839-2.614 3.132zm2.458-.609c.515-.686.944-1.543 1.257-2.523h1.595a6.969 6.969 0 01-2.852 2.523zm3.41-3.59h-1.875c.143-.673.234-1.39.262-2.133h2.123a6.842 6.842 0 01-.51 2.134zm-1.613-3.2a12.682 12.682 0 00-.262-2.133h1.875c.277.665.455 1.383.511 2.134H12.79z" />}
						svgClass={svgStyles.svg__platform}
					/>
					Web
				</>
			);
		}
		// Atari icon
		else if(slug == "jaguar" || slug.includes("atari")) {
			return(
				<>
					<SVG
						svgViewbox="0 0 20 16"
						svgCoordinates={<path d="M11.042 16V0H8.75v16h2.292zM7.102 0h1.231c0 7.417-.19 9.224-1.325 11.412C5.87 13.599 2.698 15.762 0 16v-2.445c2.036-.333 3.883-1.43 5.492-3.855C7.102 7.275 7.15 1.52 7.102 0zm5.796 0h-1.231c0 7.417.19 9.224 1.325 11.412C14.13 13.599 17.302 15.762 20 16v-2.445c-2.036-.333-3.883-1.43-5.492-3.855-1.61-2.425-1.658-8.179-1.61-9.7z" />}
						svgClass={svgStyles.svg__platform}
					/>
					{slug == "jaguar"
						? "Jaguar"
						: slug == "atari-7800"
							? "Atari 7800"
							: slug == "atari-5200"
								? "Atari 5200"
								: slug == "atari-2600"
									? "Atari 2600"
									: slug == "atari-flashback"
										? "Atari Flashback"
										: slug == "atari-8-bit"
											? "Atari 8-bit"
											: slug == "atari-st"
												? "Atari ST"
												: slug == "atari-lynx"
													? "Atari Lynx"
													: slug == "atari-xegs" && "Atari XEGS"
					}
				</>
			);
		}
		// Commodore icon
		else if(slug == "commodore-amiga") {
			return(
				<>
					<SVG
						svgViewbox="0 0 23 16"
						svgCoordinates={
							<g>
								<path d="M3.673 7.498h2.993l5.629 8.413H9.329z'/><path d='M19.932.048h2.965L12.326 15.911H9.497zM.003 7.498h3.019l5.677 8.413H5.71z'/><path d='M16.401.048h2.991L8.73 15.911H5.878z" />
							</g>
						}
						svgClass={svgStyles.svg__platform}
					/>
					C64
				</>
			);
		}
		// 3DO icon
		else if(slug == "3do") {
			return(
				<>
					<SVG
						svgViewbox="0 0 8 20"
						svgCoordinates={
							<g fillRule="evenodd">
								<rect
									width="7.579"
									height="5.361"
									x=".211"
									y="8.041"
									rx="2.265"
								/>
								<path d="M3.96.087l3.87 3.87-3.79 3.791-3.87-3.87z" />
								<ellipse
									cx="4.105"
									cy="16.907"
									rx="3.263"
									ry="3.093"
								/>
							</g>
						}
						svgClass={svgStyles.svg__platform}
					/>
					3DO
				</>
			);
		}
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
						setIsAddedToCollection(true);

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
										setIsAddedToWishlist(false);
										setIsAddedToCollection(true);

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
						setIsAddedToCollection(false);

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
						setIsAddedToWishlist(true);

						// Check if the same game is in the collection
						let checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
						checkGamesLibraryEntry.onsuccess = (event) => {
							// If it is...
							if(event.target.result !== 0) {
								let objectStoreDelete = gamesLibraryStore.delete(props.id);
								objectStoreDelete.onsuccess = (event) => {
									// Display the popup during 5 seconds
									handlePopupDisplay("Removed the game from your collection and added it to your wishlist");
									setIsAddedToCollection(false);
									setIsAddedToWishlist(true);

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
						setIsAddedToCollection(false);

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

	useEffect(() => {
		const openDatabase = window.indexedDB.open("game-world-database", 1);
		openDatabase.onsuccess = (event) => {
			let openedDatabase = event.target.result;

			// Open a transaction and access the collection and wishlist store
			let stores = openedDatabase.transaction(["Games library", "Games wishlist"], "readonly");
			let gamesLibraryStore = stores.objectStore("Games library");
			let gamesWishlistStore = stores.objectStore("Games wishlist");

			// Check if the entry is already in the collection
			let checkGamesLibraryEntry = gamesLibraryStore.count(props.id);
			checkGamesLibraryEntry.onsuccess = (event) => {
				if(event.target.result > 0) {
					setIsAddedToCollection(true);
				}
				else {
					setIsAddedToCollection(false);
				}
			}

			// Check if the entry is already in the wishlist
			let checkGamesWishlistEntry = gamesWishlistStore.count(props.id);
			checkGamesWishlistEntry.onsuccess = (event) => {
				if(event.target.result > 0) {
					setIsAddedToWishlist(true);
				}
				else {
					setIsAddedToWishlist(false);
				}
			}
		}
	});

	return(
		<article className={gameCardStyles.gameCard}>
			<div className={gameCardStyles.gameCard__container}>
				<header className={gameCardStyles.gameCard__header}>
					<figure className={gameCardStyles.gameCard__illustration}>
						<Image
							src={props.imageSrc}
							alt={props.imageAlt}
							responsive="true"
							width={5000}
							height={5000}
							className={gameCardStyles.gameCard__image}
						/>
					</figure>
					<h4
						data-name={props.slug}
						className={gameCardStyles.gameCard__title}
					>
						{props.gameName}
					</h4>
				</header>

				{!isPopupOn.condition
					? (
						<>
							<menu className={gameCardStyles.gameCard__menu}>
								<li className={gameCardStyles.gameCard__listItem}>
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
										<SVG
											svgViewbox="-12.5 -12.5 75 75"
											svgCoordinates={
												<g>
													<path d="M32 19C32 11.8203 26.1797 6 19 6C11.8203 6 6 11.8203 6 19C6 26.1797 11.8203 32 19 32C26.1797 32 32 26.1797 32 19Z" />
													<path d="M43.6464 44.3536C43.8417 44.5488 44.1583 44.5488 44.3536 44.3536C44.5488 44.1583 44.5488 43.8417 44.3536 43.6464L43.6464 44.3536ZM44.3536 43.6464L28.3536 27.6464L27.6464 28.3536L43.6464 44.3536L44.3536 43.6464Z" />
												</g>
											}
											svgClass={svgStyles.svg__view}
										/>
									</Link>
								</li>
								<li className={gameCardStyles.gameCard__listItem}>
									<Button
										buttonType="button"
										buttonAction={addToLibrary}
										buttonValue={
											<SVG
												svgId="collection"
												svgViewbox="-12.5 -12.5 75 75"
												svgCoordinates={
													<g>
														<rect
															x="5.5"
															y="5.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="20.5"
															y="5.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="5.5"
															y="20.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="35.5"
															y="5.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="20.5"
															y="20.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="35.5"
															y="20.5"
															width="9"
															height="9"
															rx="2.5"
														/>
														<rect
															x="5.5"
															y="35.5"
															width="39"
															height="9"
															rx="2.5"
														/>
													</g>
												}
												svgClass={isAddedToCollection ? svgStyles["svg__collection--checked"] : svgStyles.svg__collection}
											/>
										}
										buttonClass={isAddedToCollection ? buttonStyles["button__gameCardAction--checked"] : buttonStyles.button__gameCardAction}
									/>
								</li>
								<li className={gameCardStyles.gameCard__listItem}>
									<Button
										buttonType="button"
										buttonAction={addToWishlist}
										buttonValue={
											<SVG
												svgId="wishlist"
												svgViewbox="-12.5 -12.5 75 75"
												svgCoordinates={<path d="M25.7042 41.9595L41 26.6637C45.4183 22.2454 45.4183 15.082 41 10.6637C36.5817 6.24543 29.4183 6.24543 25 10.6637C20.5817 6.24542 13.4183 6.24543 8.99997 10.6637C4.58171 15.082 4.58172 22.2454 9 26.6637L24.2958 41.9595C24.6863 42.35 25.3137 42.35 25.7042 41.9595Z" />}
												svgClass={isAddedToWishlist ? svgStyles["svg__wishlist--checked"] : svgStyles.svg__wishlist}
											/>
										}
										buttonClass={isAddedToWishlist ? buttonStyles["button__gameCardAction--checked"] : buttonStyles.button__gameCardAction}
									/>
								</li>
							</menu>

							{props.gamePlatforms || props.gameRelease || props.gameGenres
								? (
									<dl className={gameCardStyles.gameCard__informations}>
										<div className={gameCardStyles.gameCard__platforms}>
											{props.gamePlatforms.length == 1
												? <dt className={gameCardStyles.gameCard__platformsTitle}>Platform</dt>
												: <dt className={gameCardStyles.gameCard__platformsTitle}>Platforms</dt>
											}
											{props.gamePlatforms.length > 0
												? <div className={gameCardStyles.gameCard__platformsList}>
													{props.gamePlatforms.map(item => (
														<dd
															key={item.platform.id}
															data-platform={item.platform.slug}
															className={gameCardStyles.gameCard__platformsItems}
														>
															{displayPlatformsIcons(item.platform.slug)}
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

										{/* <div>
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
										</div> */}
									</dl>
								)
								: null
							}
						</>
					)
					: (
						<ActionComplete message={isPopupOn.message} />
					)
				}
			</div>
		</article>
	);
};

export default GameCard;
