import React, {Fragment, useEffect, useState} from "react";
import appConstants from "../utils/appConstants";
import fetch from "isomorphic-unfetch";
import escapeHTMLchars from "../utils/escapeHTMLchars";
import urls from "../utils/urls";
import routes from "../utils/routes";
import ShareModule from "./ShareModule";
import Header from "./Header";
import ItemHeader from "./ItemHeader";
import ItemControls from "./ItemControls";
import EventDetails from "./EventDetails";
import InfoSidebar from "./InfoSidebar";
import PropTypes from 'prop-types';
import Error from 'next/error'
import DocumentHead from "./DocumentHead";

const SingleEvent = props => {

	const {event, isError, places, city} = props;

	let initialSelectedDate;

	if (event && 'start_date' in event && event.start_date !== '') {
		initialSelectedDate = event.start_date
	} else if (event && 'dates' in event && event.dates !== '') {
		const dates = JSON.parse(event.dates);
		if (dates.length > 0) {
			initialSelectedDate = dates[0].date;
		}
	}

	const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

	const [address, setSelectedAddress] = useState('');
	const [shareToggle, setShareToggle] = useState(false);

	useEffect(() => event && 'id' in event ? getAddress() : () => null, [event]);

	const changeDate = (year, month, day) => setSelectedDate(`${year}-${month + 1}-${day}`);

	/**
	 * Get event's address with Mapbox and reverse geocoding.
	 * @since 3.0.5
	 * @author Naop
	 */
	const getAddress = () => {
		const item = event;
		const manualAddress = item.address;

		const placeName = item.place_name ? '<strong>' + item.place_name + '</strong><br/>' : '';

		if (manualAddress) {
			setSelectedAddress(placeName + manualAddress);
		} else {
			const itemLat = item.latitude ? item.latitude : null;
			const itemLng = item.longitude ? item.longitude : null;

			if (itemLat && itemLng) {
				new Promise(resolve => {
					const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
					const token = appConstants.mapboxToken;
					const dataURL = basePath + itemLng + ',' + itemLat + '.json?language=es&types=address&access_token=' + token;

					fetch(dataURL)
						.then(response => JSON.parse(response['_bodyText']))
						.then(json => {
							const address = json.features[0]['place_name'].split(',')[0];
							const locality = json.features[0].context[0].text;
							const localityString = locality ? ', Del. ' + locality + '.' : '';
							setSelectedAddress(placeName + address + localityString);
						})
						.catch(error => {
							setSelectedAddress(placeName + '<p>No se encontró la dirección.</p>');
							console.log(error);
						});
				});
			}
		}
	};

	const brandedEvents = appConstants.brandedEvents;

	let id, name, sidebarType, featured_image, excerpt;

	if (event) {
		id = event && 'id' in event ? event.id : '';
		name = event && 'title' in event ? escapeHTMLchars(event.title) : '';
		sidebarType = id === brandedEvents.roomSales ? 'roomSales' : 'event';
		featured_image = event && 'featured_image' in event ? event.featured_image : '';

		excerpt = event && 'excerpt' in event ? escapeHTMLchars(event.excerpt.rendered.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, "")) : '';

		if (excerpt === '' || excerpt === null || excerpt === undefined) {
			if ('description' in event) {
				const excerptFromDescription = escapeHTMLchars(event.description.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, ""));

				if (excerptFromDescription.length > 150){
					excerpt = excerptFromDescription.substr(0,149) + '...';
				} else {
					excerpt = excerptFromDescription;
				}
			}
		}
	}

	let shareUrl;

	if (appConstants.devMode === 'development') {
		shareUrl = urls.development + `${(city === 'cdmx' ? '' : '/toluca')}${routes.events.path}/${event.id}`;
	} else {
		shareUrl = (city === 'cdmx' ? urls.share.cdmx : urls.share.toluca) + routes.events.path + '/' + (event && 'id' in event ? event.id : '');
	}

	const shareModule = shareUrl && name ?
		<ShareModule toggle={shareToggle} shareUrl={shareUrl} title={name} type="evento"/> : null;

	return (
		<Fragment>
			{isError && <Error title={'No se ha encontrado esta página'} statusCode={'404'}/>}
			{event && <Fragment>
				<DocumentHead excerpt={excerpt} post_type={"Eventos"} shareUrl={shareUrl} title={name}
				              featured_image={featured_image}/>
				<section className='main single-event'>
					<Header type="event"/>
					<ItemHeader
						type="event"
						item={event}
					/>
					<div>
						<ItemControls
							item={event}
							favorite={true}
							handleShare={() => setShareToggle(!shareToggle)}
						/>
						{shareModule}
						<EventDetails
							city={city}
							address={address}
							event={event}
							places={places}
							selectedDate={selectedDate}
							handleDatePress={changeDate}
						/>
					</div>
				</section>
				<InfoSidebar type={sidebarType}/>
			</Fragment>
			}
		</Fragment>
	);
};

SingleEvent.propTypes = {
	event: PropTypes.object,
	isError: PropTypes.bool,
	places: PropTypes.array,
	city: PropTypes.string,
};

export default SingleEvent;
