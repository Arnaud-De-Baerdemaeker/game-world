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
import GameCard from "@/components/cards/GameCard";
import LoadMore from "@/components/loadMore/LoadMore";
import Footer from "@/components/footer/Footer";

import {getPlatformDetails} from "@/api/platforms/getPlatformDetails";
import {getGamesFromPlatform} from "@/api/games/getGamesFromPlatform";

import platformStyles from "@/pages/platform/Platform.module.scss";

const Platform = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		if(props.platformDetails.description != "") {
			const range = document.createRange();
			const fragment = range.createContextualFragment(props.platformDetails.description);
			const target = document.querySelector("#platformDescription");
			target.append(fragment);
		}

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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title={props.platformDetails.name}
				catchword={null}
				imageSrc={props.platformDetails.image_background}
				imageAlt={`"${props.platformDetails.name}" cover image`}
			/>
			<main className={platformStyles.platform}>
				{props.platformDetails.description != ""
					? (
						<section
							id="platformDescription"
							className={platformStyles.platform__description}
						>
							<h3 className={platformStyles.platform__descriptionTitle}>
								Resume
							</h3>
						</section>
					)
					: null
				}

				<dl className={platformStyles.platform__informations}>
					<div className={platformStyles.platform__informationsContainer}>
						<dt className={platformStyles.platform__informationsLabel}>Games</dt>
						<dd>{props.platformDetails.games_count ? props.platformDetails.games_count : "N/A"}</dd>
					</div>

					<div className={platformStyles.platform__informationsContainer}>
						<dt className={platformStyles.platform__informationsLabel}>Release</dt>
						<dd>{props.platformDetails.year_start ? props.platformDetails.year_start : "N/A"}</dd>
					</div>

					<div className={platformStyles.platform__informationsContainer}>
						<dt className={platformStyles.platform__informationsLabel}>End</dt>
						<dd>{props.platformDetails.year_end ? props.platformDetails.year_end : "N/A"}</dd>
					</div>
				</dl>

				{props.gamesFromPlatform.results.length > 0
					? <section className={platformStyles.platform__gamesOnPlatform}>
						<h3 className={platformStyles.platform__sectionTitle}>Games on {props.platformDetails.name}</h3>

						<div className={platformStyles.platform__gamesList}>
							{props.gamesFromPlatform.results.map(entry => (
								<GameCard
									key={entry.id}
									id={entry.id}
									slug={entry.slug}
									pathname={`/game/[slug]`}
									as={`/game/${entry.slug}`}
									imageSrc={entry.background_image}
									imageAlt={`${entry.name} cover image`}
									gameName={entry.name}
									gameParentPlatforms={entry.parent_platforms}
									gameRelease={entry.released}
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
							imageSrc={entry.background_image}
							imageAlt={`${entry.name} cover image`}
							gameName={entry.name}
							gameParentPlatforms={entry.parent_platforms}
							gameRelease={entry.released}
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
