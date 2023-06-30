/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getGenreDetails = async (slug) => {
	return await axiosInstance.get(
		`/genres/${slug}`
	);
};

export {getGenreDetails};
