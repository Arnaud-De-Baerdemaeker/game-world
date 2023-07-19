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

import {getDeveloperDetails} from "@/api/developers/getDeveloperDetails";
import {getGamesFromDeveloper} from "@/api/games/getGamesFromDeveloper";

const Developer = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		const parser = new DOMParser();
		const parsedContent = parser.parseFromString(props.developerDetails.description, "text/html");
		const elements = parsedContent.body.children;
		const target = document.querySelector("#companyDescription");
		target.append(...elements);

		props.gamesFromDeveloper.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>{props.developerDetails.name} | Game World</title>
				<meta
					name="description"
					content="This page lists a description of a developer."
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
				imageSrc={props.developerDetails.image_background}
				imageAlt={`"${props.developerDetails.name}" cover image`}
				imageClass=""
				title={<h2>{props.developerDetails.name}</h2>}
			/>
			<main>
				<div id="companyDescription"></div>

				{props.gamesFromDeveloper.results.length > 0
					? <section>
						<h3>Games from {props.developerDetails.name}</h3>

						<div>
							{props.gamesFromDeveloper.results.map(entry => (
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
					slug={props.developerDetails.slug}
					apiCall={getGamesFromDeveloper}
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

export default Developer;

const getServerSideProps = async (context) => {
	const developerDetailsRequest = getDeveloperDetails(context.query.slug);
	const gamesFromDeveloperRequest = getGamesFromDeveloper({slug: context.query.slug});

	const [developerDetailsResponse, gamesFromDeveloperResponse] = await Promise.all([
		developerDetailsRequest,
		gamesFromDeveloperRequest
	]);

	return {
		props: {
			developerDetails: developerDetailsResponse.data,
			gamesFromDeveloper: gamesFromDeveloperResponse.data
		}
	};
};

export {getServerSideProps};
