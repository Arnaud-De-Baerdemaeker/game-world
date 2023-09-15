/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import Link from "next/link";

import companyCardStyles from "@/components/cards/CompanyCard.module.scss";

const Card = (props) => {
	return(
		<Link
			href={{
				pathname: props.pathname,
				query: {
					id: props.id
				}
			}}
			as={props.as}
			className={companyCardStyles.companyCard__link}
		>
			<article className={companyCardStyles.companyCard__card}>
				<div className={companyCardStyles.companyCard__container}>
					<img
						src={props.imageSrc}
						alt={props.imageAlt}
						className={companyCardStyles.companyCard__image}
					/>

					<header className={companyCardStyles.companyCard__header}>
						<h4 className={companyCardStyles.companyCard__title}>{props.companyName}</h4>
					</header>

					<dl className={companyCardStyles.companyCard__gamesCount}>
						<dt className={companyCardStyles.companyCard__label}>Games count</dt>
						<dd className={companyCardStyles.companyCard__value}>{props.companyGames ? props.companyGames : "N/A"}</dd>
					</dl>
				</div>
			</article>
		</Link>
	);
};

export default Card;
