/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGamesFromGenre = async (parameters) => {
	return await axiosInstance.get(
		"/games",
		{
			params: {
				genres: parameters.slug,
				page: parameters.nextPage ? parameters.nextPage : 1,
				page_size: 20
			}
		}
	);
};

export {getGamesFromGenre};
