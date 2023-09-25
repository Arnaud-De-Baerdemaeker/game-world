/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Button from "@/components/button/Button";

const SearchField = (props) => {
	return(
		<>
			<form
				id="searchForm"
				onSubmit={props.formAction}
			>
				<label htmlFor="searchField">Search for a game</label>
				<input
					type="search"
					id="searchField"
					name="search"
					placeholder="God of War, The Legend of Zelda, Halo..."
					required
				/>
				<Button
					buttonType="submit"
					buttonClass=""
				>
					Search
				</Button>
				{props.buttonReset}
			</form>
		</>
	);
};

export default SearchField;
