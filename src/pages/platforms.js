/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useState, useEffect} from "react";

import useToggler from "@/hooks/useToggler";

import Header from "@/components/header/Header";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import PlatformCard from "@/components/cards/PlatformCard";
import LoadMore from "@/components/loadMore/LoadMore";
import Footer from "@/components/footer/Footer";

import {getPlatforms} from "@/api/platforms/getPlatforms";

import platformsStyles from "@/pages/Platforms.module.scss";

const Platforms = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);
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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title="Platforms"
				catchword="Have a look on the platforms that rythm the industry"
			/>
			<main className={platformsStyles.platforms}>
				<div className={platformsStyles.platforms__container}>
					{props.platforms.results.length > 0
						? props.platforms.results.map(entry => (
							<PlatformCard
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname="/platform/[slug]"
								as={`/platform/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt={`${entry.name} cover image`}
								platformName={entry.name}
								gamesCount={entry.games_count}
								startYear={entry.year_start}
								endYear={entry.year_end}
							/>
						))
						: <p>No results were returned</p>
					}

					{moreResults.length != 0
						? moreResults.map(entry => (
							<PlatformCard
								key={entry.id}
								id={entry.id}
								slug={entry.slug}
								pathname="/platform/[slug]"
								as={`/platform/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt={`${entry.name} cover image`}
								platformName={entry.name}
								gamesCount={entry.games_count}
								startYear={entry.year_start}
								endYear={props.year_end}
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
					apiCall={getPlatforms}
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
