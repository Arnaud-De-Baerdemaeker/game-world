/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getPlatforms = async (nextPage) => {
	return await axiosInstance.get(
		"/platforms",
		{
			params: {
				page: nextPage ? nextPage : 1,
				page_size: 20
			}
		}
	);
};

export {getPlatforms};
