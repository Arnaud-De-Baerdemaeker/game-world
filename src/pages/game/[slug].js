/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import Link from "next/link";

import useToggler from "@/hooks/useToggler";

import Header from "@/components/header/Header";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/Footer";

import {getGameDetails} from "@/api/games/getGameDetails";
import {getGameScreenshots} from "@/api/games/getGameScreenshots";

const Game = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);

	return(
		<>
			<Head>
				<title>{`${props.gameDetails.name}`} | Game World</title>
				<meta
					name="description"
					content={`Detail page of the game "${props.gameDetails.name}"`}
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
				title={props.gameDetails.name}
				catchword={props.gameDetails.publishers}
				imageSrc={props.gameDetails.background_image}
				imageAlt={`${props.gameDetails.name} cover image`}
			/>
			<main>
				<section>
					<h3>Release date</h3>
					{props.gameDetails.released
						? <p>{props.gameDetails.released}</p>
						: <p>TBA</p>
					}

					{props.gameDetails.platforms.length === 1
						? <h3>Platform</h3>
						: <h3>Platforms</h3>
					}
					{props.gameDetails.platforms.length > 0
						? <ul>
							{props.gameDetails.platforms.map(entry => (
								<li key={entry.platform.slug}>{entry.platform.name}</li>
							))}
						</ul>
						: <p>TBA</p>
					}

					{props.gameDetails.publishers.length === 1
						? <h3>Publisher</h3>
						: <h3>Publishers</h3>
					}
					{props.gameDetails.publishers.length > 0
						? <ul>
							{props.gameDetails.publishers.map(entry => (
								<li key={entry.id}>{entry.name}</li>
							))}
						</ul>
						: <p>TBA</p>
					}

					{props.gameDetails.developers.length === 1
						? <h3>Developer</h3>
						: <h3>Developers</h3>
					}
					{props.gameDetails.developers.length > 0
						? <ul>
							{props.gameDetails.developers.map(entry => (
								<li key={entry.id}>{entry.name}</li>
							))}
						</ul>
						: <p>TBA</p>
					}

					<h3>Summary</h3>
					{props.gameDetails.description_raw
						? <p>{props.gameDetails.description_raw}</p>
						: <p>TBA</p>
					}

					{props.gameDetails.genres.length === 1
						? <h3>Genre</h3>
						: <h3>Genres</h3>
					}
					{props.gameDetails.genres.length > 0
						? <menu>
							{props.gameDetails.genres.map(entry => (
								<li key={entry.id}>
									<Link
										href={{
											pathname: entry.slug,
											query: {
												slug: entry.slug
											}
										}}
										as={`/genre/${entry.slug}`}
									>
										{entry.name}
									</Link>
								</li>
							))}
						</menu>
						: <p>TBA</p>
					}

					{props.gameDetails.tags.length === 1
						? <h3>Tag</h3>
						: <h3>Tags</h3>
					}
					{props.gameDetails.tags.length > 0
						? <ul>
							{props.gameDetails.tags.map(entry => (
								<li key={entry.id}>{entry.name}</li>
							))}
						</ul>
						: <p>TBA</p>
					}

					<h3>Rating</h3>
					{props.gameDetails.esrb_rating
						? <p>{props.gameDetails.esrb_rating.name}</p>
						: <p>TBA</p>
					}
				</section>

				<section>
					{props.screenshots.results.length === 1
						? <h3>Screenshot</h3>
						: <h3>Screenshots</h3>
					}
					{props.screenshots.results.length > 0
						? <ul>
							{props.screenshots.results.map(entry => (
								<li key={entry.id}>
									<img
										src={entry.image}
										alt={`${props.gameDetails.name} screenshot`}
										className=""
									/>
								</li>
							))}
						</ul>
						: <p>TBA</p>
					}
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Game;

const getServerSideProps = async (context) => {
	const gameDetailsRequest = getGameDetails(context.query.slug);
	const screenshotsListRequest = getGameScreenshots(context.query.slug);

	const [gameDetailsResponse, screenshotsListResponse] = await Promise.all([
		gameDetailsRequest,
		screenshotsListRequest
	]);

	return {
		props: {
			gameDetails: gameDetailsResponse.data,
			screenshots: screenshotsListResponse.data
		}
	};
};

export {getServerSideProps};
