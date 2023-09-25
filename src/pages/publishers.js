/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import CompanyCard from "@/components/cards/CompanyCard";
import LoadMore from "@/components/loadMore/LoadMore";
import Footer from "@/components/footer/Footer";

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
				<h2>Publishers</h2>
				<div>
					{props.publishers.results.length > 0
						? props.publishers.results.map(entry => (
							<CompanyCard
								key={entry.id}
								id={entry.id}
								pathname={`/publisher/[slug]`}
								as={`/publisher/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt=""
								imageClass=""
								companyName={entry.name}
								companyGames={entry.games_count}
							/>
						))
						: <p>No results were returned</p>
					}
					{moreResults.length != 0
						? moreResults.map(entry => (
							<CompanyCard
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname={`/publisher/[slug]`}
								as={`/publisher/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt=""
								imageClass=""
								companyName={entry.name}
								companyGames={entry.games_count}
							/>
						))
						: null
					}
				</div>
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
			<Footer />
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
