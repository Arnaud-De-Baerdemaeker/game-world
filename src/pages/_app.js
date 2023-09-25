/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import {Audiowide, Jost} from "next/font/google";

import "@/styles/globals.scss";
import "@/styles/variables.scss";

const audiowide = Audiowide({
	subsets: ["latin"],
	weight: "400",
	variable: "--audiowide"
});

const jost = Jost({
	subsets: ["latin"],
	fallback: ["system-ui", "arial"],
	variable: "--jost"
});

export default function App({Component, pageProps}) {
	return(
		<div className={`fonts ${jost.variable} ${audiowide.variable}`}>
			<Component {...pageProps} />
		</div>
	);
};
