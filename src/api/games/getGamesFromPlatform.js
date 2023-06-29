/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGamesFromPlatform = async (id) => {
	return await axiosInstance.get(
		`/games`,
		{
			params: {
				platforms: id,
				page: 1,
				page_size: 20
			}
		}
	);
};

export {getGamesFromPlatform};
