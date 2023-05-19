/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import axiosInstance from "../baseAPICallSettings";

const getLatestReleases = async () => {
	const date = new Date();
	const unchangedCurrentDateValues = {
		date: `${date.getDate()}`,
		currentMonth: `${date.getMonth() + 1}`,
		lastMonth: `${date.getMonth()}`
	};

	let changedCurrentDateValues = {
		date: null,
		currentMonth: null,
		lastMonth: null
	};

	const formFullDate = () => {
		if(unchangedCurrentDateValues.date.length === 1) {
			changedCurrentDateValues.date = `0${unchangedCurrentDateValues.date}`;
		}
		else {
			changedCurrentDateValues.date = unchangedCurrentDateValues.date;
		}

		if(unchangedCurrentDateValues.currentMonth.length === 1) {
			changedCurrentDateValues.currentMonth = `0${unchangedCurrentDateValues.currentMonth}`;
		}

		if(unchangedCurrentDateValues.lastMonth.length === 1) {
			changedCurrentDateValues.lastMonth = `0${unchangedCurrentDateValues.lastMonth}`;
		}
	};

	formFullDate();

	const formCurrentFullDate = () => {
		const fullCurrentDate = `${date.getFullYear()}-${changedCurrentDateValues.currentMonth}-${changedCurrentDateValues.date}`;

		return fullCurrentDate;
	};

	const form30DaysPriorFullDate = () => {
		const fullPriorDate = `${date.getFullYear()}-${changedCurrentDateValues.lastMonth}-${changedCurrentDateValues.date}`;

		return fullPriorDate;
	};

	return await axiosInstance.get("/games", {
		params: {
			page: 1,
			page_size: 15,
			dates: `${form30DaysPriorFullDate()},${formCurrentFullDate()}`
		}
	});
}

export {getLatestReleases};
