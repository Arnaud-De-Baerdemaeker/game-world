/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {useState} from "react";

const useToggler = (initialState) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return [isOpen, toggle];
};

export default useToggler;
