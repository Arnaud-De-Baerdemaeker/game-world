/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

const Footer = () => {
	const year = new Date();

	return(
		<footer>
			<h2>Game World</h2>
			<p>A project made with NextJS by <a href="https://arnaud-de-baerdemaeker.netlify.app/" target="_blank" rel="noopener noreferrer">Arnaud De Baerdemaeker</a></p>
			<p>This website uses the <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">RAWG</a> Video Games Database API as the source of the data and images.</p>
			<p>{year.getUTCFullYear()}</p>
			<p>Version 1.0.0</p>
		</footer>
	);
};

export default Footer;
