import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconIndex from '../icons';
import Colors from '../styles/Colors';

class Icon extends PureComponent {
  render() {
    const height = this.props.size ? this.props.size : 25;
    const width = this.props.size ? this.props.size : 25;
    const icon = IconIndex[this.props.name];
    const fill = this.props.fill ? this.props.fill : Colors.frikiInk;

    return (
      <div className="icon" style={{ height, width, fill}}>
	      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox={icon.viewBox} xmlSpace="preserve">
          {icon.svg}
        </svg>
      </div>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  fill: PropTypes.string,
  style: PropTypes.object,
};

export default Icon;
