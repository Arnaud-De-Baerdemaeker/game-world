/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "./baseAPICallSettings";

const getGameDetails = async (slug) => {
	return await axiosInstance.get(
		`/games/${slug}`
	);
}

export {getGameDetails};
