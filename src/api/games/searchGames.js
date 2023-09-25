/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const searchGames = async (parameters) => {
	return await axiosInstance.get(
		"/games",
		{
			params: {
				search: parameters.query,
				page: parameters.nextPage ? parameters.nextPage : 1,
				page_size: 20
			}
		}
	);
};

export {searchGames};
