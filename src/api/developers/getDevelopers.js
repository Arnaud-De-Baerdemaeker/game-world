/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getDevelopers = async (nextPage) => {
	return await axiosInstance.get(
		"/developers",
		{
			params: {
				page: nextPage ? nextPage : 1,
				page_size: 20
			}
		}
	);
}

export {getDevelopers};
