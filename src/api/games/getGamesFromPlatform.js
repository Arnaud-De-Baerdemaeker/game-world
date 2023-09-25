/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGamesFromPlatform = async (parameters) => {
	return await axiosInstance.get(
		"/games",
		{
			params: {
				platforms: parameters.id,
				page: parameters.nextPage ? parameters.nextPage : 1,
				page_size: 20
			}
		}
	);
};

export {getGamesFromPlatform};
