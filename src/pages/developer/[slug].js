/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import Card from "@/components/card/Card";
import LoadMore from "@/components/loadMore/LoadMore";

import {getDeveloperDetails} from "@/api/developers/getDeveloperDetails";
import {getGamesFromDeveloper} from "@/api/games/getGamesFromDeveloper";

const Developer = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
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
			<header>
				<img
					src={props.developerDetails.image_background}
					alt={`"${props.developerDetails.name}" cover image`}
					className=""
				/>
				<h2>{props.developerDetails.name}</h2>
			</header>
			<main>
				<div id="companyDescription"></div>
				{props.gamesFromDeveloper.results.length > 0
					? <section>
						<h3>Games from {props.developerDetails.name}</h3>
						<div>
							{props.gamesFromDeveloper.results.map(entry => (
								<Card
									key={entry.id}
									id={entry.id}
									slug={entry.slug}
									pathname={`/game/[slug]`}
									as={`/game/${entry.slug}`}
									dominantColor={entry.dominant_color}
									saturatedColor={entry.saturated_color}
									shortScreenshots={entry.short_screenshorts}
									tags={entry.tags}
								>
									<article>
										<div>
											<img
												src={entry.background_image}
												alt=""
												className=""
											/>
											<h3 data-name={entry.slug}>{entry.name}</h3>
										</div>
										<menu>
											{/* <li></li> */}
										</menu>
										<dl>
											<dt>Platforms</dt>
											{entry.platforms.length > 0
												? <>
													{entry.platforms.map(item => (
														<dd
															key={item.platform.id}
															data-platform={item.platform.slug}
														>
															{item.platform.name}
														</dd>
													))}
												</>
												: <dd>N/A</dd>
											}
	
											<dt>Release</dt>
											{entry.released
												? <dd>{entry.released}</dd>
												: <dd>N/A</dd>
											}
	
											<dt>Genres</dt>
											{entry.genres.length > 0
												? <>
													{entry.genres.map(item => (
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
										</dl>
									</article>
								</Card>
							))}
						</div>
					</section>
					: <p>No results were returned</p>
				}
				{moreResults.length != 0
					? moreResults.map(entry => (
						<Card
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname={`/game/[slug]`}
							as={`/game/${entry.slug}`}
							dominantColor={entry.dominant_color}
							saturatedColor={entry.saturated_color}
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
						>
							<article>
								<div>
									<img
										src={entry.background_image}
										alt=""
										className=""
									/>
									<h3 data-name={entry.slug}>{entry.name}</h3>
								</div>
								<menu></menu>
								<dl>
									<dt>Platforms</dt>
									{entry.platforms
										? <>
											{entry.platforms.map(item => (
												<dd
													key={item.platform.id}
													data-platform={item.platform.slug}
												>
													{item.platform.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}
	
									<dt>Release</dt>
									{entry.released
										? <dd>{entry.released}</dd>
										: <dd>N/A</dd>
									}
	
									<dt>Genres</dt>
									{entry.genres
										? <>
											{entry.genres.map(item => (
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
								</dl>
							</article>
						</Card>
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
		</>
	);
};

export default Developer;

const getServerSideProps = async (context) => {
	const developerDetailsRequest = await getDeveloperDetails(context.query.slug);
	const developerDetailsResponse = developerDetailsRequest.data;

	const gamesFromDeveloperRequest = await getGamesFromDeveloper({slug: context.query.slug});
	const gamesFromDeveloperResponse = gamesFromDeveloperRequest.data;

	return {
		props: {
			developerDetails: developerDetailsResponse,
			gamesFromDeveloper: gamesFromDeveloperResponse
		}
	};
};

export {getServerSideProps};
