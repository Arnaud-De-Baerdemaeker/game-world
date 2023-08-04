/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import SVG from "@/components/svg/SVG";

import svgStyles from "@/components/svg/SVG.module.scss";

const ActionComplete = (props) => {
	return(
		<div className={actionCompleteStyles.actionComplete}>
			<figure className={actionCompleteStyles.actionComplete__icon}>
				<SVG
					svgViewbox="0 0 50 50"
					svgCoordinates={
						<path
							d="M44 15.5L25.7071 33.7929C25.3166 34.1834 24.6834 34.1834 24.2929 33.7929L15 24.5"
							strokeLinecap="round"
						/>
					}
					svgClass={svgStyles.svg__complete}
				/>
			</figure>
			<h5 className={actionCompleteStyles.ActionComplete__title}>{props.message}</h5>
		</div>
	);
};

export default Popup;
