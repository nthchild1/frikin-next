import React from 'react';
import SingleEvent from "../../../../components/SingleEvent";
import {getInitialEventProps} from "../../../../utils/getInitialItemsProps";

const Event = props => {
	return <>
		<SingleEvent
			{...props}
		/>
	</>;
};

Event.getInitialProps = getInitialEventProps('toluca');

export default Event;
