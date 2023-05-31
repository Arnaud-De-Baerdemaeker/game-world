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

import {getPublishers} from "@/api/publishers/getPublishers";

const Publishers = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		props.publishers.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>Publishers | Game World</title>
				<meta
					name="description"
					content="This page lists the publishers in the video games world."
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
				<List title="Publishers">
					{props.publishers.results.length > 0
						? props.publishers.results.map(entry => (
							<Card
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname={`/publisher/[slug]`}
								as={`/publisher/${entry.slug}`}
							>
								<div style={{backgroundImage: `url("${entry.image_background}")`}}>
									<h3>{entry.name}</h3>
									<dl>
										<dt>Games count</dt>
										<dd>{entry.games_count ? entry.games_count : "N/A"}</dd>
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
								pathname={`/publisher/[slug]`}
								as={`/publisher/${entry.slug}`}
							>
								<div style={{backgroundImage: `url("${entry.image_background}")`}}>
									<h3>{entry.name}</h3>
									<dl>
										<dt>Games count</dt>
										<dd>{entry.games_count ? entry.games_count : "N/A"}</dd>
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
					apiCall={getPublishers}
					next={hasFirstCallMoreResults || hasFollowingCallsMoreResults
						? true
						: false
					}
				/>
			</main>
		</>
	);
};

export default Publishers;

const getStaticProps = async () => {
	const publishersRequest = await getPublishers();
	const publisherResponse = publishersRequest.data;

	return {
		props: {
			publishers: publisherResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
