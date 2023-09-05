/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Button from "@/components/button/Button";

import buttonStyles from "@/components/button/Button.module.scss";

const LoadMore = (props) => {
	if(props.resultsCount == 0) {
		return(
			<p>Your research returned no results</p>
		);
	}
	else if(props.next == false) {
		return(
			<p>End of the results</p>
		);
	}
	else {
		return(
			<Button
				buttonType="submit"
				buttonAction={
					async () => {
						const parameters = {
							slug: props.slug ? props.slug : null,
							query: props.searchQuery ? props.searchQuery : null,
							nextPage: props.nextPage ? props.nextPage : null
						};

						const loadMore = await props.apiCall(parameters);

						if(props.moreResults.length == 0) {
							props.setMoreResults(loadMore.data.results);
						}
						else {
							props.setMoreResults(props.moreResults.concat(loadMore.data.results));
						}

						props.setNextPage(props.nextPage + 1);

						if(loadMore.data.next != null) {
							props.setHasFollowingCallsMoreResults(true);
							props.setHasFirstCallMoreResults(null);
						}
						else {
							props.setHasFollowingCallsMoreResults(false);
							props.setHasFirstCallMoreResults(null);
						}
					}
				}
				buttonClass={buttonStyles.button__load}
			>
				Show more results
			</Button>
		);
	}
};

export default LoadMore;
