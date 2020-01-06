import React, {Fragment, useState} from 'react';
import PropTypes from "prop-types";
import Error from "next/error";
import ShareModule from "./ShareModule";
import Header from "./Header";
import ItemHeader from "./ItemHeader";
import ItemControls from "./ItemControls";
import PlaceDetails from "./PlaceDetails";
import InfoSidebar from "./InfoSidebar";
import appConstants from "../utils/appConstants";
import urls from "../utils/urls";
import routes from "../utils/routes";
import DocumentHead from "./DocumentHead";
import Parser from 'html-react-parser';
import escapeHTMLchars from "../utils/escapeHTMLchars";

const SinglePlace = props => {
	const {place, isError, city} = props;
	const [toggle, toggleShare] = useState(false);

	let name;
	let shareUrl;
	let featured_image;
	let excerpt;

	if (place && !isError) {
		name = place.title ? place.title : '';

		if (appConstants.devMode === 'development') {
			shareUrl = urls.development + `${(city === 'cdmx' ? '' : '/toluca')}${routes.places.path}/${place.id}`;
		} else {
			shareUrl = (city === 'cdmx' ? urls.share.cdmx : urls.share.toluca) + routes.places.path + '/' + (place && 'id' in place ? place.id : '');
		}

		featured_image = place && 'featured_image' in place ? place.featured_image : '';

		excerpt = place && 'excerpt' in place ? escapeHTMLchars(place.excerpt.rendered.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, "")) : '';

		if (excerpt === '' || excerpt === null || excerpt === undefined) {
			if ('description' in place) {
				const excerptFromDescription = escapeHTMLchars(place.description.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, ""));

				if (excerptFromDescription.length > 150){
					excerpt = excerptFromDescription.substr(0,147) + '...';
				} else {
					excerpt = excerptFromDescription;
				}
			}
		}
	}

	const shareModule = shareUrl && name ?
		<ShareModule toggle={toggle} shareUrl={shareUrl} title={name} type="noticia"/> : null;

	return (
		<Fragment>
			{isError && <Error title={'No se ha encontrado esta página'} statusCode={'404'}/>}
			{place && !isError && <Fragment>
				<DocumentHead post_type="Lugares" shareUrl={shareUrl} excerpt={excerpt} title={name}
				              featured_image={featured_image}/>
				<section className='main single-place'>
					<Header type={'place'}/>
					<ItemHeader
						type="place"
						item={place}
					/>
					<ItemControls
						item={place}
						handleShare={() => toggleShare(!toggle)}
					/>
					{shareModule}
					<PlaceDetails place={place}/>
				</section>
				<InfoSidebar type="place"/>
			</Fragment>
			}
		</Fragment>
	);
};

SinglePlace.propTypes = {
	place: PropTypes.object,
	isError: PropTypes.bool,
	city: PropTypes.string,
};

export default SinglePlace;
