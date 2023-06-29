/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {useState} from "react";

import List from "@/components/list/List";
import Card from "@/components/card/Card";
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
						>
							<article>
								<figure>
									<img
										src={entry.background_image}
										alt=""
										className=""
									/>
									<h3 data-name={entry.slug}>{entry.name}</h3>
								</figure>
								<menu></menu>
								<dl>
									<dt>Platforms</dt>
									{entry.platforms
										? <>
											{entry.platforms.map(item => (
												<dd
													key={item.platform.id}
													data-platform={item.platform.slug}
												>
													{item.platform.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}

									<dt>Release</dt>
									{entry.released
										? <dd>{entry.released}</dd>
										: <dd>N/A</dd>
									}

									<dt>Genres</dt>
									{entry.genres
										? <>
											{entry.genres.map(item => (
												<dd
													key={item.id}
													data-genre={item.slug}
												>
													{item.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}
								</dl>
							</article>
						</Card>
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
						>
							<article>
								<figure>
									<img
										src={entry.background_image}
										alt=""
										className=""
									/>
									<h3 data-name={entry.slug}>{entry.name}</h3>
								</figure>
								<menu></menu>
								<dl>
									<dt>Platforms</dt>
									{entry.platforms
										? <>
											{entry.platforms.map(item => (
												<dd
													key={item.platform.id}
													data-platform={item.platform.slug}
												>
													{item.platform.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}

									<dt>Release</dt>
									{entry.released
										? <dd>{entry.released}</dd>
										: <dd>N/A</dd>
									}

									<dt>Genres</dt>
									{entry.genres
										? <>
											{entry.genres.map(item => (
												<dd
													key={item.id}
													data-genre={item.slug}
												>
													{item.name}
												</dd>
											))}
										</>
										: <dd>N/A</dd>
									}
								</dl>
							</article>
						</Card>
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
