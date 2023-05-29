/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getPublisherDetails = async (slug) => {
	return await axiosInstance.get(
		`/publishers/${slug}`
	);
};

export {getPublisherDetails};
