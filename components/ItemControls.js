import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import Colors from '../styles/Colors';
import '../styles/ItemControls.scss';

const ItemControls = (props) => {
		const item = props.item;
		const website = item.website;
		let directionsButton = null;
		let shareButton = null;
		let websiteButton = null;
		let placeInfoButton = null;

		if (item.id) {

			shareButton = (
				<div className="button share-button" onClick={props.handleShare}>
					<Icon fill={Colors.frikiInk} name="Share" size={25}/>
					<span>Compartir</span>
				</div>
			);

			directionsButton = null;

		}

		if (website) {
			websiteButton = (
				<a className="button website-button" href={website} target="_blank" rel="noopener noreferrer">
					<Icon fill={Colors.frikiInk} name="Link" size={25}/>
					<span>Sitio Web</span>
				</a>
			);
		} else if (item.id && !website) {
			websiteButton = null;
		}

		return (
			<div className="item-controls">
				{shareButton}
				{websiteButton}
				{placeInfoButton}
			</div>
		);
	}
;

ItemControls.propTypes = {
  handleShare: PropTypes.func.isRequired,
};

export default ItemControls;
