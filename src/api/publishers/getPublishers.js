/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getPublishers = async (nextPage) => {
	console.log(nextPage)
	return await axiosInstance.get(
		"/publishers",
		{
			params: {
				page: nextPage ? nextPage : 1,
				page_size: 20
			}
		}
	);
};

export {getPublishers};
