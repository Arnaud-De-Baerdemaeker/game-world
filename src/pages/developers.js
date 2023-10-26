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
import CompanyCard from "@/components/cards/CompanyCard";
import LoadMore from "@/components/loadMore/LoadMore";
import Footer from "@/components/footer/Footer";

import {getDevelopers} from "@/api/developers/getDevelopers";

import developersStyles from "@/pages/Developers.module.scss";

const Developers = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);
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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title="Developers"
				catchword="Have a look on the developers in the industry and their creations"
			/>
			<main className={developersStyles.developers}>
				<div className={developersStyles.developers__container}>
					{props.developers.results.length > 0
						? props.developers.results.map(entry => (
							<CompanyCard
								key={entry.id}
								id={entry.id}
								pathname={`/developer/[slug]`}
								as={`/developer/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt={`${entry.name} cover image`}
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
								pathname={`/publisher/[slug]`}
								as={`/publisher/${entry.slug}`}
								imageSrc={entry.image_background}
								imageAlt={`${entry.name} cover image`}
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
					apiCall={getDevelopers}
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
