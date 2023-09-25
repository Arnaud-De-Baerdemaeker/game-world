/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import footerStyles from "@/components/footer/Footer.module.scss";

const Footer = () => {
	const year = new Date();

	return(
		<footer className={footerStyles.footer}>
			<h2 className={footerStyles.footer__title}>Game World</h2>

			<div className={footerStyles.footer__credits}>
				<p className={footerStyles.footer__developer}>
					A project made with Next.JS by
					<br />
					<a href="https://arnaud-de-baerdemaeker.netlify.app/" target="_blank" rel="noopener noreferrer" className={footerStyles.footer__link}>Arnaud De Baerdemaeker</a>
				</p>
				<p className={footerStyles.footer__source}>This website uses the <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer" className={footerStyles.footer__link}>RAWG</a> Video Games Database API as the source of the data and images.</p>
			</div>

			<p className={footerStyles.footer__year}>{year.getUTCFullYear()}</p>
		</footer>
	);
};

export default Footer;
