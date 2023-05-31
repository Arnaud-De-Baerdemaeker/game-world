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

import {getDevelopers} from "@/api/developers/getDevelopers";

const Developers = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		props.developers.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
	}, []);

	return(
		<>
			<Head>
				<title>Developers | Game World</title>
				<meta
					name="description"
					content="This page lists the developers in the video games world."
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
				<List title="Developers">
					{props.developers.results.length > 0
						? props.developers.results.map(entry => (
							<Card
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname={`/developer/[slug]`}
								as={`/developer/${entry.slug}`}
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
					apiCall={getDevelopers}
					next={hasFirstCallMoreResults || hasFollowingCallsMoreResults
						? true
						: false
					}
				/>
			</main>
		</>
	);
};

export default Developers;

const getStaticProps = async () => {
	const developersRequest = await getDevelopers({});
	const developersResponse = developersRequest.data;

	return {
		props: {
			developers : developersResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
