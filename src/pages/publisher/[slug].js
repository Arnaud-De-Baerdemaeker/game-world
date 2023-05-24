/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useEffect} from "react";

import Menu from "@/components/menu/Menu";

import {getPublisherDetails} from "@/api/publishers/getPublisherDetails";

const Publisher = (props) => {
	useEffect(() => {
		const parser = new DOMParser();
		const parsedContent = parser.parseFromString(props.publisherDetails.description, "text/html");
		const elements = parsedContent.body.children;
		const target = document.querySelector("#companyDescription");
		target.append(...elements);
	}, []);

	return(
		<>
			<Head>
				<title>{props.publisherDetails.name} | Game World</title>
				<meta
					name="description"
					content="This page lists a description of a publisher."
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
			<header>
				<img
					src={props.publisherDetails.image_background}
					alt={`"${props.publisherDetails.name}" cover image`}
					className=""
				/>
				<h2>{props.publisherDetails.name}</h2>
			</header>
			<main>
				<div id="companyDescription"></div>
			</main>
		</>
	);
};

export default Publisher;

const getServerSideProps = async (context) => {
	const publisherDetailsRequest = await getPublisherDetails(context.query.slug);
	const publisherDetailsResponse = publisherDetailsRequest.data;

	return {
		props: {
			publisherDetails: publisherDetailsResponse
		}
	};
};

export {getServerSideProps};
