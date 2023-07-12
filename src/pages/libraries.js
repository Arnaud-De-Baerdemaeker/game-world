/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";

import Menu from "@/components/menu/Menu";

export default function Libraries() {
	return(
		<>
			<Head>
				<title>My libraries | Game World</title>
				<meta
					name="description"
					content="The page that lists the libraries of the user. Games and platforms can be saved either in the library or the wishlist."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<Menu />
			<main></main>
		</>
	);
}
