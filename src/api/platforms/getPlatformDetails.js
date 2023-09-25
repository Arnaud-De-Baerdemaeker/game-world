/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getPlatformDetails = async (slug) => {
	return await axiosInstance.get(
		`/platforms/${slug}`
	);
};

export {getPlatformDetails};
