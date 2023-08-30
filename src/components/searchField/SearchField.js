/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Button from "@/components/button/Button";

import searchFieldStyles from "./SearchField.module.scss";
import buttonStyles from "../button/Button.module.scss";

const SearchField = (props) => {
	return(
		<>
			<form
				id="searchForm"
				onSubmit={props.formAction}
				className={searchFieldStyles.searchField}
			>
				<div className={searchFieldStyles.searchField__container}>
					<div className={searchFieldStyles.searchField__field}>
						<label
							htmlFor="searchField"
							className={searchFieldStyles.searchField__label}
						>
							Search for a game
						</label>
						<input
							type="search"
							id="searchField"
							name="search"
							placeholder="God of War, The Legend of Zelda, Halo..."
							required
							className={searchFieldStyles.searchField__input}
						/>
					</div>
					<div className={searchFieldStyles.searchField__buttons}>
						<Button
							buttonType="submit"
							buttonClass={buttonStyles.button__submit}
						>
							Search
						</Button>
						<Button
							buttonType="reset"
							buttonClass={buttonStyles.button__clear}
							buttonAction={props.resetAll}
						>
							Clear
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default SearchField;
