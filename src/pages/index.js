/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import List from "@/components/list/List";
import Card from "@/components/card/Card";
import LoadMore from "@/components/loadMore/LoadMore";

import {getLatestReleases} from "@/api/games/getLatestReleases";

import styles from "./Home.module.css";

const Home = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasMoreResults, setHasMoreResults] = useState(null);

	useEffect(() => {
		if(props.publishers.next != null) {
			setHasMoreResults(true);
		}
		else {
			setHasMoreResults(false);
		}
	}, []);

	return(
		<>
			<Head>
				<title>Home | Game World</title>
				<meta
					name="description"
					content="The homepage of the website. By default, games that were released in the last 30 days are shown."
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
			<main>
				<List title="Latest releases">
					{props.latestReleases.results.length > 0
						? props.latestReleases.results.map(entry => (
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
						))
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
						))
						: null
					}
				</List>
				<LoadMore
					nextPage={nextPage}
					setNextPage={setNextPage}
					moreResults={moreResults}
					setMoreResults={setMoreResults}
					setHasMoreResults={setHasMoreResults}
					apiCall={getLatestReleases}
					next={props.latestReleases.next != null || hasMoreResults == true
						? true
						: false
					}
				/>
			</main>
		</>
	);
}

export default Home;

const getStaticProps = async () => {
	const latestReleasesRequest = await getLatestReleases();
	const latestReleasesResponse = latestReleasesRequest.data;

	return {
		props: {
			latestReleases: latestReleasesResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
