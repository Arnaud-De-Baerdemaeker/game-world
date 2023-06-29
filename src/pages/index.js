/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import Menu from "@/components/menu/Menu";
import SearchField from "@/components/searchField/SearchField";
import Button from "@/components/button/Button";
import SearchResults from "@/components/searchResults/SearchResults";
import LatestReleasesResults from "@/components/latestReleasesResults/LatestReleasesResults";

import {getLatestReleases} from "@/api/games/getLatestReleases";
import {searchGames} from "@/api/games/searchGames";

// import styles from "./Home.module.css";

const Home = (props) => {
	const [searchQuery, setSearchQuery] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [isSearchInUse, setIsSearchInUse] = useState(false);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	const handleSearchQuery = async (event) => {
		event.preventDefault();

		const query = event.target[0].value;
		setSearchQuery(query);

		await searchGames({query})
		.then(results => {
			setIsSearchInUse(true);
			setSearchResults(results.data);

			if(results.data.next != null) {
				setHasFollowingCallsMoreResults(true);
				setHasFirstCallMoreResults(null);
			}
			else {
				setHasFollowingCallsMoreResults(false);
				setHasFirstCallMoreResults(null);
			}
		});
	};

	const resetAll = () => {
		setIsSearchInUse(false);
		setSearchQuery(null);
		setSearchResults(null);
	}

	useEffect(() => {
		props.latestReleases.next != null ? setHasFirstCallMoreResults(true) : setHasFirstCallMoreResults(false);
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
				<SearchField
					formAction={handleSearchQuery}
					buttonReset={
						<Button
							buttonType="reset"
							buttonClass=""
							buttonAction={resetAll}
						>
							Clear search
						</Button>
					}
				/>
				{isSearchInUse
					? <SearchResults
						searchQuery={searchQuery}
						searchResults={searchResults}
						hasFirstCallMoreResults={hasFirstCallMoreResults}
						setHasFirstCallMoreResults={setHasFirstCallMoreResults}
						hasFollowingCallsMoreResults={hasFollowingCallsMoreResults}
						setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					/>
					: <LatestReleasesResults
						latestReleases={props.latestReleases}
						hasFirstCallMoreResults={hasFirstCallMoreResults}
						setHasFirstCallMoreResults={setHasFirstCallMoreResults}
						hasFollowingCallsMoreResults={hasFollowingCallsMoreResults}
						setHasFollowingCallsMoreResults={setHasFollowingCallsMoreResults}
					/>
				}
			</main>
		</>
	);
}

export default Home;

const getStaticProps = async () => {
	const latestReleasesRequest = await getLatestReleases({});
	const latestReleasesResponse = latestReleasesRequest.data;

	return {
		props: {
			latestReleases: latestReleasesResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
