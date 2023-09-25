/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getLatestReleases = async (params) => {
	const currentDate = new Date();
	const pastDate = new Date();

	pastDate.setDate(pastDate.getDate() - 30);

	const formattedCurrentDate = currentDate.toISOString().split("T")[0];
	const formattedPastDate = pastDate.toISOString().split("T")[0];

	return await axiosInstance.get(
		"/games",
		{
			params: {
				page: params.nextPage ? params.nextPage : 1,
				page_size: 20,
				dates: `${formattedPastDate},${formattedCurrentDate}`
			}
		}
	);
}

export {getLatestReleases};
