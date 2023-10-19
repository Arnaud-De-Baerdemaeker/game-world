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

import {getDeveloperDetails} from "@/api/developers/getDeveloperDetails";
import {getGamesFromDeveloper} from "@/api/games/getGamesFromDeveloper";

import developerStyles from "@/pages/developer/Developer.module.scss";

const Developer = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);
	const [hasFirstCallMoreResults, setHasFirstCallMoreResults] = useState(null);
	const [hasFollowingCallsMoreResults, setHasFollowingCallsMoreResults] = useState(null);

	useEffect(() => {
		if(props.developerDetails.description != "") {
			const range = document.createRange();
			const fragment = range.createContextualFragment(props.developerDetails.description);
			const target = document.querySelector("#companyDescription");
			target.append(fragment);
		}

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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title={props.developerDetails.name}
				catchword={null}
				imageSrc={props.developerDetails.image_background}
				imageAlt={`"${props.developerDetails.name}" cover image`}
			/>
			<main className={developerStyles.developer}>
				{props.developerDetails.description != ""
					? (
						<section
							id="companyDescription"
							className={developerStyles.developer__description}
						>
							<h3 className={developerStyles.developer__descriptionTitle}>Resume</h3>
						</section>
					)
					: null
				}

				{props.gamesFromDeveloper.results.length > 0
					? <section className={developerStyles.developer__gamesFromDeveloper}>
						<h3 className={developerStyles.developer__sectionTitle}>Games from {props.developerDetails.name}</h3>

						<div className={developerStyles.developer__gamesList}>
							{props.gamesFromDeveloper.results.map(entry => (
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
					slug={props.developerDetails.slug}
					apiCall={getGamesFromDeveloper}
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

export default Developer;

const getServerSideProps = async (context) => {
	const developerDetailsRequest = getDeveloperDetails(context.query.slug);
	const gamesFromDeveloperRequest = getGamesFromDeveloper({slug: context.query.slug});

	const [developerDetailsResponse, gamesFromDeveloperResponse] = await Promise.all([
		developerDetailsRequest,
		gamesFromDeveloperRequest
	]);

	return {
		props: {
			developerDetails: developerDetailsResponse.data,
			gamesFromDeveloper: gamesFromDeveloperResponse.data
		}
	};
};

export {getServerSideProps};
