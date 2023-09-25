/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGameTrailers = async (slug) => {
	return axiosInstance.get(
		`/games/${slug}/movies`
	);
};

export {getGameTrailers};
