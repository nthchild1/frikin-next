import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Colors from '../styles/Colors';

class ListItem extends PureComponent {
	render() {
		return(
			<button
				onClick={this.props.onPress}
			>
				<div>
					{this.props.children}
				</div>
			</button>
		);
	}
}

ListItem.propTypes = {
	onPress: PropTypes.func.isRequired,
	children: PropTypes.node,
	padding: PropTypes.number,
	style: PropTypes.object,
};

export default ListItem;
