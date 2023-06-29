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

import {getPlatforms} from "@/api/platforms/getPlatforms";

const Platforms = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		props.platforms.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>Platforms | Game World</title>
				<meta
					name="description"
					content="This page lists all the video games' platforms."
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
				<List title="Platforms">
					{props.platforms.results.length > 0
						? props.platforms.results.map(entry => (
							<Card
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname="/platform/[slug]"
								as={`/platform/${entry.slug}`}
							>
								<div style={{background: `url("${entry.image_background}")`}}>
									<h3>{entry.name}</h3>
									<dl>
										<dt>Games count</dt>
										<dd>{entry.games_count ? entry.games_count : "N/A"}</dd>

										<dt>Start year</dt>
										<dd>{entry.year_start ? props.year_start : "N/A"}</dd>

										<dt>End year</dt>
										<dd>{props.year_end ? props.year_end : "N/A"}</dd>
									</dl>
								</div>
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
								pathname="/platform/[slug]"
								as={`/platform/${entry.slug}`}
							>
								<div style={{background: `url("${entry.image_background}")`}}>
									<h3>{entry.name}</h3>
									<dl>
										<dt>Games count</dt>
										<dd>{entry.games_count ? entry.games_count : "N/A"}</dd>

										<dt>Start year</dt>
										<dd>{entry.year_start ? props.year_start : "N/A"}</dd>

										<dt>End year</dt>
										<dd>{props.year_end ? props.year_end : "N/A"}</dd>
									</dl>
								</div>
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
					setHasFirstCallMoreResults={setHasFirstCallMoreResults}
					setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					apiCall={getPlatforms}
					next={hasFirstCallMoreResults || hasFollowingCallsMoreResults
						? true
						: false
					}
				/>
			</main>
		</>
	);
};

export default Platforms;

const getStaticProps = async () => {
	const platformsRequest = await getPlatforms();
	const platformsResponse = platformsRequest.data;

	return {
		props: {
			platforms: platformsResponse
		}
	}
};

export {getStaticProps};
