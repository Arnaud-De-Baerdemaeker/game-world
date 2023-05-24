/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";

import Menu from "@/components/menu/Menu";
import List from "@/components/list/List";
import Card from "@/components/card/Card";

import {getDevelopers} from "@/api/developers/getDevelopers";

const Developers = (props) => {
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
			</List>
		</>
	);
};

export default Developers;

const getStaticProps = async () => {
	const developersRequest = await getDevelopers();
	const developersResponse = developersRequest.data;

	return {
		props: {
			developers : developersResponse
		},
		revalidate: 86400
	};
};

export {getStaticProps};
