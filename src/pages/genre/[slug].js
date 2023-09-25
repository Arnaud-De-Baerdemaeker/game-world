/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import Header from "@/components/header/Header";
import GameCard from "@/components/cards/GameCard";
import LoadMore from "@/components/loadMore/LoadMore";
import Footer from "@/components/footer/Footer";

import {getGenreDetails} from "@/api/genres/getGenreDetails";
import {getGamesFromGenre} from "@/api/games/getGamesFromGenre";

const Genre = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		const parser = new DOMParser();
		const parsedContent = parser.parseFromString(props.genreDetails.description, "text/html");
		const elements = parsedContent.body.children;
		const target = document.querySelector("#genreDescription");
		target.append(...elements);

		props.gamesFromGenre.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>{`${props.genreDetails.name}`} | Game World</title>
				<meta
					name="description"
					content={`Detail page of the game "${props.genreDetails.name}"`}
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
			<Menu />
			<Header
				imageSrc={props.genreDetails.image_background}
				imageAlt={`"${props.genreDetails.name}" cover image`}
				imageClass=""
				title={<h2>{props.genreDetails.name}</h2>}
			/>
			<main>
				<div id="genreDescription"></div>

				{props.gamesFromGenre.results.length > 0
					? <section>
						<h3>{props.genreDetails.name} games</h3>

						<div>
							{props.gamesFromGenre.results.map(entry => (
								<GameCard
									key={entry.id}
									id={entry.id}
									slug={entry.slug}
									pathname={`/game/[slug]`}
									as={`/game/${entry.slug}`}
									dominantColor={entry.dominant_color}
									saturatedColor={entry.saturated_color}
									shortScreenshots={entry.short_screenshots}
									tags={entry.tags}
									imageSrc={entry.background_image}
									imageAlt=""
									imageClass=""
									gameName={entry.name}
									gamePlatforms={entry.platforms}
									gameRelease={entry.released}
									gameGenres={entry.genres}
								/>
							))}
						</div>
					</section>
					: <p>No results were returned</p>
				}
				{moreResults.length != 0
					? moreResults.map(entry => (
						<GameCard
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname={`/game/[slug]`}
							as={`/game/${entry.slug}`}
							dominantColor={entry.dominant_color}
							saturatedColor={entry.saturated_color}
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
							imageSrc={entry.background_image}
							imageAlt=""
							imageClass=""
							gameName={entry.name}
							gamePlatforms={entry.platforms}
							gameRelease={entry.released}
							gameGenres={entry.genres}
						/>
					))
					: null
				}
				<LoadMore
					nextPage={nextPage}
					setNextPage={setNextPage}
					moreResults={moreResults}
					setMoreResults={setMoreResults}
					setHasFirstCallMoreResults={setHasFirstCallMoreResults}
					setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					slug={props.genreDetails.slug}
					apiCall={getGamesFromGenre}
					next={hasFirstCallMoreResults || hasFollowingCallsMoreResults
						? true
						: false
					}
				/>
			</main>
			<Footer />
		</>
	);
};

export default Genre;

const getServerSideProps = async (context) => {
	const genreDetailsRequest = getGenreDetails(context.query.slug);
	const gamesFromGenreRequest = getGamesFromGenre({slug: context.query.slug});

	const [genreDetailsResponse, gamesFromGenreResponse] = await Promise.all([
		genreDetailsRequest,
		gamesFromGenreRequest
	]);

	return {
		props: {
			genreDetails: genreDetailsResponse.data,
			gamesFromGenre: gamesFromGenreResponse.data
		}
	}
}

export {getServerSideProps};
