/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useEffect} from "react";

import Menu from "@/components/menu/Menu";
import Card from "@/components/card/Card";

import {getPlatformDetails} from "@/api/platforms/getPlatformDetails";
import {getGamesFromPlatform} from "@/api/games/getGamesFromPlatform";

const Platform = (props) => {
	useEffect(() => {
		const parser = new DOMParser();
		const parsedContent = parser.parseFromString(props.platformDetails.description, "text/html");
		const elements = parsedContent.body.children;
		const target = document.querySelector("#platformDescription");
		target.append(...elements);
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
			<header>
				<img
					src={props.platformDetails.image_background}
					alt={`"${props.platformDetails.name}" cover image`}
					className=""
				/>
				<h2>{props.platformDetails.name}</h2>
			</header>
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

				{props.platformGames.results.length > 0
					? <section>
						<h3>Games on {props.platformDetails.name}</h3>
						{props.platformGames.results.map(entry => (
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
					</section>
					: <p>No results were returned</p>
				}
			</main>
		</>
	);
};

export default Platform;

const getServerSideProps = async (context) => {
	const platformDetailsRequest = await getPlatformDetails(context.query.slug);
	const platformDetailsResponse = platformDetailsRequest.data;

	const platformGamesRequest = await getGamesFromPlatform(context.query.id);
	const platformGamesResponse = platformGamesRequest.data;

	return {
		props: {
			platformDetails: platformDetailsResponse,
			platformGames: platformGamesResponse
		}
	};
};

export {getServerSideProps};
