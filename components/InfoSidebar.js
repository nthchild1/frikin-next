import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import '../styles/InfoSidebar.scss';
import appConstants from '../utils/appConstants';

const InfoSidebar = props => {
	const { type } = props;
	const links = appConstants.links;
	let calloutImage,
			calloutText;

	switch(type) {
		case 'place': 
			calloutImage = '/calloutLugares.jpg';
			calloutText = '¡Consulta el catálogo de Lugares Friki en la app de Frik-in!';
			break;
		case 'event':
			calloutImage = '/calloutEventos.jpg';
			calloutText = '¡Consulta el catálogo de Eventos Friki en la app de Frik-in!';
			break;
		case 'roomSales': 
			calloutImage = '/calloutRoomSales.jpg';
			calloutText = '¡Descubre todos los detalles en la app de Frik-in!';
			break;	
		case 'person': 
			calloutImage = '/calloutPersonas.jpg';
			calloutText = '¡Consulta el catálogo de Personas Friki en la app de Frik-in!';
			break;
		case 'post': 
			calloutImage = '/calloutNoticias.jpg';
			calloutText = '¡Descubre todas nuestras Noticias en la app de Frik-in!';
			break;
		default: 
			calloutImage = '/calloutLugares.jpg';
			calloutText = '¡Consulta el catálogo de Lugares Friki en la app de Frik-in!';
	}

	return(
		<aside className="frik-in-sidebar">
			<div className="app-callout">
				<a className="image-callout" href={links.universal} target="_blank" rel="noopener noreferrer">
					<img src={calloutImage} alt={calloutText} />
				</a>
				<div className="content">
					<h2>{calloutText}</h2>
					<div className="store-badges">
							<a href={links.appStore} target="_blank" rel="noopener noreferrer">
								<img src="/App_Store.png" alt="App Store" />
							</a>
							<a href={links.googlePlay} target="_blank" rel="noopener noreferrer">
								<img src="/Google_Play.png" alt="Google Play" />
							</a>
					</div>
				</div>
			</div>
			<ul className="social-networks">
	      <li>
	        <SocialIcon url={links.facebook} style={{ height: 30, width: 30 }} />
	      </li>
	      <li>
	        <SocialIcon url={links.instagram} style={{ height: 30, width: 30 }} />
	      </li>
	      <li>
	        <SocialIcon url={links.twitter} style={{ height: 30, width: 30 }} />
	      </li>
	      <li>
	        <SocialIcon url={links.youtube} style={{ height: 30, width: 30 }} />
	      </li>
	    </ul>
		</aside>
	);
};


InfoSidebar.propTypes = {
	type: PropTypes.string,
};

export default InfoSidebar;
