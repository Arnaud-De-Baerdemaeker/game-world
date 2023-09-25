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

import {getPlatformDetails} from "@/api/platforms/getPlatformDetails";
import {getGamesFromPlatform} from "@/api/games/getGamesFromPlatform";

const Platform = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		const parser = new DOMParser();
		const parsedContent = parser.parseFromString(props.platformDetails.description, "text/html");
		const elements = parsedContent.body.children;
		const target = document.querySelector("#platformDescription");
		target.append(...elements);

		props.gamesFromPlatform.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>Platforms | Game World</title>
				<meta
					name="description"
					content="This page lists the details of a video game's platform."
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
				imageSrc={props.platformDetails.image_background}
				imageAlt={`"${props.platformDetails.name}" cover image`}
				imageClass=""
				mainTitle={props.platformDetails.name}
				subTitle=""
			/>
			<main>
				<div id="platformDescription"></div>

				<dl>
					<dt>Games count</dt>
					<dd>{props.platformDetails.games_count ? props.platformDetails.games_count : "N/A"}</dd>

					<dt>Release year</dt>
					<dd>{props.platformDetails.year_start ? props.platformDetails.year_start : "N/A"}</dd>

					<dt>End year</dt>
					<dd>{props.platformDetails.year_end ? props.platformDetails.year_end : "N/A"}</dd>
				</dl>

				{props.gamesFromPlatform.results.length > 0
					? <section>
						<h3>Games on {props.platformDetails.name}</h3>

						<div>
							{props.gamesFromPlatform.results.map(entry => (
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
					slug={props.platformDetails.slug}
					apiCall={getGamesFromPlatform}
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

export default Platform;

const getServerSideProps = async (context) => {
	const platformDetailsRequest = getPlatformDetails(context.query.slug);
	const gamesFromPlatformRequest = getGamesFromPlatform({id: context.query.id});

	const [platformDetailsResponse, gamesFromPlatformResponse] = await Promise.all([
		platformDetailsRequest,
		gamesFromPlatformRequest
	]);

	return {
		props: {
			platformDetails: platformDetailsResponse.data,
			gamesFromPlatform: gamesFromPlatformResponse.data
		}
	};
};

export {getServerSideProps};
