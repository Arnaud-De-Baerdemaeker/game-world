/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {useState} from "react";

import GameCard from "@/components/cards/GameCard";
import LoadMore from "@/components/loadMore/LoadMore";

import {getLatestReleases} from "@/api/games/getLatestReleases";

import latestReleasesStyles from "@/components/latestReleasesResults/LatestReleases.module.scss";

const LatestReleasesResults = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);

	return(
		<section className={latestReleasesStyles.latestReleases}>
			<h3 className={latestReleasesStyles.latestReleases__title}>Latest Releases</h3>
			<div className={latestReleasesStyles.latestReleases__container}>
				{props.latestReleases.results.length > 0
					? props.latestReleases.results.map(entry => (
						<GameCard
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname={`/game/[slug]`}
							as={`/game/${entry.slug}`}
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
							imageSrc={entry.background_image}
							imageAlt={`${entry.name} cover image`}
							gameName={entry.name}
							gameParentPlatforms={entry.parent_platforms}
							gamePlatforms={entry.platforms}
							gameRelease={entry.released}
							gameGenres={entry.genres}
						/>
					))
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
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
							imageSrc={entry.background_image}
							imageAlt={`${entry.name} cover image`}
							gameName={entry.name}
							gameParentPlatforms={entry.parent_platforms}
							gamePlatforms={entry.platforms}
							gameRelease={entry.released}
							gameGenres={entry.genres}
						/>
					))
					: null
				}

				<LoadMore
					nextPage={nextPage}
					setNextPage={setNextPage}
					moreResults={moreResults}
					setMoreResults={setMoreResults}
					setHasFirstCallMoreResults={props.setHasFirstCallMoreResults}
					setHasFollowingCallsMoreResults={props.setHasFollowingCallsMoreResults}
					apiCall={getLatestReleases}
					next={props.hasFirstCallMoreResults || props.hasFollowingCallsMoreResults
						? true
						: false
					}
				/>
			</div>
		</section>
	);
};

export default LatestReleasesResults;
