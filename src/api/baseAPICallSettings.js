import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.rawg.io/api",
	headers: {
		"Content-Type": "application/json"
	},
	params: {
		key: "c5fcc3c90f404dfda957d7a18c18574a"
	}
});

export default axiosInstance;
