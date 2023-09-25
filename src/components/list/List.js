/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

const List = (props) => {
	return(
		<>
			<h2>{props.title}</h2>
			<div>{props.children}</div>
		</>
	);
};

export default List;
