import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from './Icon';
import '../styles/Header.scss';
import routes from "../utils/routes";
import appConstants from '../utils/appConstants';

const Header = (props) => {
	const universalLink = appConstants.links.universal;
	let title = null;

	switch (props.type) {
		case 'event':
			title = routes.events.title;
			break;
		case 'place':
			title = routes.places.title;
			break;
		case 'person':
			title = routes.people.title;
			break;
		case 'post':
			title = routes.news.title;
			break;
	}

	return(
		<header className="app-header">
				<Link href="/">
					<div className="logo-button">
						<svg className="app-logo" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 444.3 702" xmlSpace="preserve">
							<polygon points="397.5 324 397.5 270 304 270 233.8 310.5 233.8 418.5 "/>
							<polygon points="172.4 177.1 163.7 162 187 148.5 210.4 189 444.3 54 444.3 0 350.7 0 0 202.5 0 256.5 0 256.5 93.5 256.5 116.9 243 116.9 270 116.9 378 46.7 418.5 46.8 472.5 46.8 472.5 116.9 472.5 116.9 499.5 116.9 621 163.7 702 210.4 675 210.4 243 210.4 243 210.4 243 "/>
						</svg>
					</div>
				</Link>
			<h1 className="page-title">{title}</h1>
			<a href="https://frikin.page.link/app" className="category-button">
        <Icon name="Main" size={70} />
      </a>
		</header>
	);
};

Header.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Header;
