/*
	Game World
	April 2023
	Arnaud De Baerdemaeker
*/

import SVG from "@/components/svg/SVG";

import actionCompleteStyles from "@/components/actionComplete/ActionComplete.module.scss";
import svgStyles from "@/components/svg/SVG.module.scss";

const ActionComplete = (props) => {
	return(
		<div className={actionCompleteStyles[props.isPopupOn.class]}>
			<div className={actionCompleteStyles[props.isPopupOn.containerClass]}>
				<figure className={actionCompleteStyles.actionComplete__icon}>
					<SVG
						svgViewBox="-5 -5 60 60"
						svgClass={svgStyles.svg__complete}
					>
						<path
							d="M39.5 15.5L21.2071 33.7929C20.8166 34.1834 20.1834 34.1834 19.7929 33.7929L10.5 24.5"
							strokeLinecap="round"
						/>
					</SVG>
				</figure>
				<h5 className={actionCompleteStyles.actionComplete__title}>{props.isPopupOn.message}</h5>
			</div>
		</div>
	);
};

export default ActionComplete;
