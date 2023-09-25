/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getDeveloperDetails = async (slug) => {
	return await axiosInstance.get(
		`/developers/${slug}`
	);
};

export {getDeveloperDetails};
