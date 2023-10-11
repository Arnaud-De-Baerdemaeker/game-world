/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import useToggler from "@/hooks/useToggler";

import Header from "@/components/header/Header";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/Footer";

import {getGameDetails} from "@/api/games/getGameDetails";
import {getGameScreenshots} from "@/api/games/getGameScreenshots";

import gameStyles from "@/pages/game/Game.module.scss";

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
			<main className={gameStyles.game}>
				<div className={gameStyles.game__mainInformations}>
					<section className={gameStyles.game__mainInformationsSection}>
						{props.gameDetails.publishers.length < 2
							? <h3 className={gameStyles.game__heading}>Publisher</h3>
							: <h3 className={gameStyles.game__heading}>Publishers</h3>
						}
						{props.gameDetails.publishers.length > 0
							? <ul>
								{props.gameDetails.publishers.map(entry => (
									<li key={entry.id}>{entry.name}</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>

					<section className={gameStyles.game__mainInformationsSection}>
						{props.gameDetails.developers.length < 2
							? <h3 className={gameStyles.game__heading}>Developer</h3>
							: <h3 className={gameStyles.game__heading}>Developers</h3>
						}
						{props.gameDetails.developers.length > 0
							? <ul>
								{props.gameDetails.developers.map(entry => (
									<li key={entry.id}>{entry.name}</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>

					<section className={gameStyles.game__mainInformationsSection}>
						{props.gameDetails.genres.length < 2
							? <h3 className={gameStyles.game__heading}>Genre</h3>
							: <h3 className={gameStyles.game__heading}>Genres</h3>
						}
						{props.gameDetails.genres.length > 0
							? <ul>
								{props.gameDetails.genres.map(entry => (
									<li key={entry.id}>{entry.name}</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>

					<section className={gameStyles.game__mainInformationsSection}>
						<h3 className={gameStyles.game__heading}>Release date</h3>
						{props.gameDetails.released
							? <p>{props.gameDetails.released}</p>
							: <p>TBA</p>
						}
					</section>

					<section className={gameStyles.game__mainInformationsSection}>
						{props.gameDetails.platforms.length < 2
							? <h3 className={gameStyles.game__heading}>Platform</h3>
							: <h3 className={gameStyles.game__heading}>Platforms</h3>
						}
						{props.gameDetails.platforms.length > 0
							? <ul>
								{props.gameDetails.platforms.map(entry => (
									<li key={entry.platform.slug}>{entry.platform.name}</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>

					<section className={gameStyles.game__mainInformationsSection}>
						<h3 className={gameStyles.game__heading}>Rating</h3>
						{props.gameDetails.esrb_rating
							? <p>{props.gameDetails.esrb_rating.name}</p>
							: <p>TBA</p>
						}
					</section>
				</div>

				<div className={gameStyles.game__secondaryInformations}>
					<section>
						<h3 className={gameStyles.game__heading}>Summary</h3>
						{props.gameDetails.description_raw
							? <p>{props.gameDetails.description_raw}</p>
							: <p>TBA</p>
						}
					</section>

					<section>
						{props.gameDetails.tags.length < 2
							? <h3 className={gameStyles.game__heading}>Tag</h3>
							: <h3 className={gameStyles.game__heading}>Tags</h3>
						}
						{props.gameDetails.tags.length > 0
							? <ul className={gameStyles.game__tagsList}>
								{props.gameDetails.tags.map(entry => (
									<li key={entry.id}>{entry.name}</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>
				</div>

				<div>
					<section>
						{props.screenshots.results.length < 2
							? <h3 className={gameStyles.game__heading}>Screenshot</h3>
							: <h3 className={gameStyles.game__heading}>Screenshots</h3>
						}
						{props.screenshots.results.length > 0
							? <ul className={gameStyles.game__screenshotsList}>
								{props.screenshots.results.map(entry => (
									<li key={entry.id}>
										<Image
											src={entry.image}
											alt={`${props.gameDetails.name} screenshot`}
											responsive="true"
											width={500}
											height={500}
											className={gameStyles.game__screenshots}
										/>
									</li>
								))}
							</ul>
							: <p>TBA</p>
						}
					</section>
				</div>
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
