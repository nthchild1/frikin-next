import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconIndex from '../icons';
import Colors from '../styles/Colors';
import frikiDex from "../utils/frikiDex";

class Avatar extends PureComponent {
	render() {
		const height = this.props.size ? this.props.size : 25;
		const width = this.props.size ? this.props.size : 25;
		const avatar = frikiDex[this.props.name] ? frikiDex[this.props.name] : frikiDex.Normie;
		const fill = this.props.fill ? this.props.fill : Colors.frikiInk;

		return (
			<div style={{ height, width, fill}}>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 800 800" xmlSpace="preserve">
					{avatar.svg}
				</svg>
			</div>
		);
	}
}

Avatar.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.number,
	fill: PropTypes.string,
	style: PropTypes.object,
};

export default Avatar;
