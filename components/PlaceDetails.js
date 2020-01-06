import React from 'react';
import PropTypes from 'prop-types';
import {
	GoogleMap, 
	Marker, 
	withGoogleMap, 
	withScriptjs
} from 'react-google-maps';
import Parser from 'html-react-parser';
import Icon from '../components/Icon';
import Colors from '../styles/Colors';
import '../styles/PlaceDetails.scss';
import appConstants from "../utils/appConstants";
import escapeHTMLchars from '../utils/escapeHTMLchars';

const PlaceDetails = (props) => {
	const place = props.place;
	const types = 'types' in place && place.types ? place.types : [];
	let address = null;
	let otherTypes = null;
	let descriptionRow = null;
	let floorRow = null;
	let retailSpaceRow = null;
	let mainType,
		icon;

	if ('description' in place && place.description) {
		descriptionRow = (
			<div>
				{Parser( place.description)}
			</div>
		);
	}

	if ('address' in place && place.address) {
		address = (
			<div>
				{escapeHTMLchars(place.address)}
			</div>
		);
	}

	if (place.post_type === 'mall') {
		descriptionRow = null;
		mainType = 'Plaza';
		icon = 'Building';
	} else if (types.includes('restaurante')) {
		mainType = 'Restaurante';
		icon = 'Restaurant';
	} else if (types.includes('recreativo')) {
		mainType = 'Recreativo';
		icon = 'Recreational';
	} else if (types.includes('cultural')) {
		mainType = 'Cultural';
		icon = 'Cultural';
	} else {
		mainType = 'Tienda';
		icon = 'Store';
	}

	if ('types' in place && place.types) {
		otherTypes = place.types.map((type, key) => {
			if (type === mainType.toLowerCase()) {
				return;
			} else {
				return <span key={key}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>;
			}
		});
	}

	if ('floor' in place && place.floor) {
		const floorText = place.floor !== '' ? `Piso: ${place.floor.replace(/0,/, 'PB')}` : null;
		floorRow = (
			<div className="item-row place-floor">
				<Icon name="Floor" size={25} fill={Colors.frikiInk}/>
				{floorText}
			</div>
		);
	}

	if ('retail_space' in place && place.retail_space) {
		const retailSpaceText = place.retail_space !== '' ? `Local:  ${place.retail_space}` : null;

		retailSpaceRow = (
			<div className="item-row place-retail-space">
				<Icon name="RetailSpace" size={25} fill={Colors.frikiInk}/>
				{retailSpaceText}
			</div>
		);
	}

	const Map = withScriptjs(withGoogleMap((props) => {
		const defaultMapOptions = {
		  fullscreenControl: false,
		  mapTypeControl: false,
			streetViewControl: false,
		};

		return <GoogleMap
			defaultZoom={appConstants.defaultZoom}
			defaultCenter={{lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)}}
			defaultOptions={defaultMapOptions}
		>
			{props.isMarkerShown &&
			<Marker position={{lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)}}/>}
		</GoogleMap>
	}));

	return (
		<div className="place-details">
			<div className="place-info">
				<div>
					<div className="item-row place-types">
						<Icon name={icon} size={50} fill={Colors.frikiInk}/>
						<h3>{mainType}</h3>
						{otherTypes}
					</div>
					<div className="item-row place-address">
						<Icon name="Address" size={25} fill={Colors.frikiInk}/>
						{address}
					</div>
					{floorRow}
					{retailSpaceRow}
				</div>
				<div>
					<Map
						isMarkerShown
						googleMapURL={appConstants.googleMapsUrl}
						containerElement={<div className="map-container"/>}
						loadingElement={<div className="map-loader"/>}
						mapElement={<div className="map-element"/>}
						latitude={place.latitude}
						longitude={place.longitude}
					/>
				</div>
			</div>
			<div className="item-row content">
				{descriptionRow}
			</div>
		</div>
	);
};

PlaceDetails.propTypes = {
	place: PropTypes.object.isRequired,
};

export default PlaceDetails;
