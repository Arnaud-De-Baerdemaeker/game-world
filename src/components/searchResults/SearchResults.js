/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {useState} from "react";

import List from "@/components/list/List";
import GameCard from "@/components/cards/GameCard";
import LoadMore from "@/components/loadMore/LoadMore";

import {searchGames} from "@/api/games/searchGames";

const SearchResults = (props) => {
	const [nextPage, setNextPage] = useState(2);
	const [moreResults, setMoreResults] = useState([]);

	return(
		<>
			<List title={`Search results for "${props.searchQuery}"`}>
				{props.searchResults.results.length > 0
					? props.searchResults.results.map(entry => (
						<GameCard
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname={`/game/[slug]`}
							as={`/game/${entry.slug}`}
							dominantColor={entry.dominant_color}
							saturatedColor={entry.saturated_color}
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
							imageSrc={entry.background_image}
							imageAlt=""
							imageClass=""
							gameName={entry.name}
							gamePlatforms={entry.platforms}
							gameRelease={entry.released}
							gameGenres={entry.genres}
						/>
					))
					: null
				}
				{moreResults.length != 0
					? moreResults.map(entry => (
						<Card
							key={entry.id}
							id={entry.id}
							slug={entry.slug}
							pathname={`/game/[slug]`}
							as={`/game/${entry.slug}`}
							dominantColor={entry.dominant_color}
							saturatedColor={entry.saturated_color}
							shortScreenshots={entry.short_screenshorts}
							tags={entry.tags}
							imageSrc={entry.background_image}
							imageAlt=""
							imageClass=""
							gameName={entry.name}
							gamePlatforms={entry.platforms}
							gameRelease={entry.released}
							gameGenres={entry.genres}
						/>
					))
					: null
				}
			</List>
			<LoadMore
				searchQuery={props.searchQuery}
				nextPage={nextPage}
				setNextPage={setNextPage}
				moreResults={moreResults}
				setMoreResults={setMoreResults}
				setHasFirstCallMoreResults={props.setHasFirstCallMoreResults}
				setHasFollowingCallsMoreResults={props.setHasFollowingCallsMoreResults}
				apiCall={searchGames}
				resultsCount={props.searchResults.count}
				next={props.hasFirstCallMoreResults == true || props.hasFollowingCallsMoreResults == true
					? true
					: false
				}
			/>
		</>
	);
}

export default SearchResults;
