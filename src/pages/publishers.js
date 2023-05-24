/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";

import Menu from "@/components/menu/Menu";
import List from "@/components/list/List";
import Card from "@/components/card/Card";
// import CompaniesList from "@/components/companiesList/CompaniesList";

import {getPublishers} from "@/api/publishers/getPublishers";

const Publishers = (props) => {
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
			</List>
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
