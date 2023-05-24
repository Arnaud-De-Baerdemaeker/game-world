/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";

import Menu from "@/components/menu/Menu";
import List from "@/components/list/List";
import Card from "@/components/card/Card";
// import PlatformsList from "@/components/platformsList/platformsList";

import {getPlatforms} from "@/api/platforms/getPlatforms";

const Platforms = (props) => {
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
			<Menu />
			<List title="Platforms">
				{props.platforms.results.length > 0
					? props.platforms.results.map(entry => (
						<Card
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname="/platform/[slug]"
							as={`/platform/${entry.slug}`}
						>
							<div style={{background: `url("${entry.image_background}")`}}>
								<h3>{entry.name}</h3>
								<dl>
									<dt>Games count</dt>
									<dd>{entry.games_count ? entry.games_count : "N/A"}</dd>

									<dt>Start year</dt>
									<dd>{entry.year_start ? props.year_start : "N/A"}</dd>

									<dt>End year</dt>
									<dd>{props.year_end ? props.year_end : "N/A"}</dd>
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
