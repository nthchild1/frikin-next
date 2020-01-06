import React from 'react';
import {getInitialPlaceProps} from "../../../utils/getInitialItemsProps";
import SinglePlace from "../../../components/SinglePlace";

const Place = props => {
	return <>
		<SinglePlace
			{...props}
		/>
	</>;
};

Place.getInitialProps = getInitialPlaceProps('cdmx');

export default Place;
