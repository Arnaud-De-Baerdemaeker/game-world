/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Head from "next/head";
import {useEffect} from "react";

import useToggler from "@/hooks/useToggler";

import Header from "@/components/header/Header";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/Footer";

import {getPublisherDetails} from "@/api/publishers/getPublisherDetails";

import publisherStyles from "@/pages/publisher/Publisher.module.scss";

const Publisher = (props) => {
	const [isMenuOpen, toggleMenu] = useToggler(false);

	useEffect(() => {
		const range = document.createRange();
		const fragment = range.createContextualFragment(props.publisherDetails.description);
		const target = document.querySelector("#companyDescription");
		target.append(fragment);
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
			<Header
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Menu isMenuOpen={isMenuOpen} />
			<Hero
				title={props.publisherDetails.name}
				catchword={null}
				imageSrc={props.publisherDetails.image_background}
				imageAlt={`"${props.publisherDetails.name}" cover image`}
			/>
			<main className={publisherStyles.publisher}>
				<div
					id="companyDescription"
					className={publisherStyles.publisher__presentation}
				></div>
			</main>
			<Footer />
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
