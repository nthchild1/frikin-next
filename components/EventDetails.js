import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Parser from 'html-react-parser';
import Icon from '../components/Icon';
import appConstants from '../utils/appConstants';
import routes from '../utils/routes';
import escapeHTMLchars from '../utils/escapeHTMLchars';
import '../styles/EventDetails.scss'

const EventDetails = (props) => {

	const event = props.event;
	const selectedDate = new Date(props.selectedDate);
	const places = props.places;
	const placeIDs = event.place_id ? event.place_id.replace(/\s+/g, '')
		.split(',') : null;
	let startTime = event.start_time ? event.start_time : null;
	let endTime = event.end_time ? event.end_time : null;
	let startHour = startTime ? <span className="start-time">{startTime} hrs. </span> : <span className="start-time"/>;
	let endHour = endTime ? <span className="end-time">{endTime} hrs.</span> : null;
	let rawDates = [];
	let eventDates = null;
	let description = null;
	let location;
	let eventHours;

	if ('start_date' in event && event.start_date !== '') {
		const startDate = new Date(event.start_date.replace(/-/g, '/'));
		const endDate = event.end_date ? new Date(event.end_date.replace(/-/g, '/')) : startDate;

		if (startDate) {
			if (startDate.getTime() === endDate.getTime()) {
				rawDates.push(startDate);
			} else {
				for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
					rawDates.push(new Date(d));
				}
			}
		}
	} else if ('dates' in event && event.dates !== '') {
		const dates = JSON.parse(event.dates);

		dates.forEach(d => {
			if ('date' in d && d.date !== '') {
				const newDate = new Date(d.date.replace(/-/g, '/'));
				rawDates.push(newDate);
			}
		});

		startTime = dates.find(eventDate => selectedDate.toISOString().split("T")[0] === eventDate.date).startTime;
		endTime = dates.find(eventDate => selectedDate.toISOString().split("T")[0] === eventDate.date).endTime;

		startHour = startTime ? `${startTime} hrs.` : null;
		endHour = endTime ? `- ${endTime} hrs.` : null;
	}


	if (rawDates && rawDates.length > 0) {
		eventDates = (
			<div className="event-dates">
				<Icon name="Calendar" size={25}/>
				<div>
					{rawDates.map((date, index) => {
						const month = appConstants.monthNames[date.getMonth()];
						let rawDate = date.toISOString().split('T')[0];

						let buttonClass;
						if (selectedDate.toISOString().split('T')[0] === rawDate) {
							buttonClass = "date-button selected";
						} else {
							buttonClass = "date-button";
						}
						return (
							<button
								className={buttonClass}
								key={index}
								onClick={() => props.handleDatePress(date.getFullYear(), date.getMonth(), date.getDate())}
							>
								<div>
									{date.getDate()}
									{month}
								</div>
							</button>
						);
					})}
				</div>
			</div>
		);
	}

	// Handle HTML
	if (event && 'description' in event) {
		description = Parser(event.description);
	}

	if (placeIDs && places && places.length > 0) {
		let eventPlaces = [];
		placeIDs.forEach(function (placeID) {
			const place = places.filter(place => place.id === parseInt(placeID, 10));
			eventPlaces = eventPlaces.concat(place);
		});
		location = eventPlaces.map((place) => {
			const key = place.id;
			const name = place.title ? escapeHTMLchars(place.title) : '';
			let path;

			if (appConstants.devMode === 'development') {
				if (props.city === 'toluca') {
					path = `/toluca${routes.places.path}/${key}`;
				} else {
					path = `${routes.places.path}/${key}`;
				}
			} else {
				if (props.city === 'toluca') {
					path = '/toluca' + routes.places.path + '/' + key;
				} else {
					path = routes.places.path + '/' + key;
				}
			}

			return (
				<Link href={path}>
					<div className="custom-button place-button">
						{name}
					</div>
				</Link>
			);
		});
	} else {
		location = props.address ? Parser(props.address) : null;
	}

	eventHours = (
		<div className="event-hours">
			<Icon name="Hour" size={25}/>
			{startHour}
			{endHour}
		</div>
	);

	return (
		<section className="event-details">
			<div className="item-row content">
				{eventDates}
				{eventHours}
				<div className="event-location">
					<Icon name="Address" size={25}/>
					<div>
						{location}
					</div>
				</div>
			</div>
			<div className="item-row content">
				{description}
			</div>
		</section>
	);
};

EventDetails.propTypes = {
	address: PropTypes.PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]).isRequired,
	event: PropTypes.object.isRequired,
	selectedDate: PropTypes.string.isRequired,
	places: PropTypes.array.isRequired,
	handleDatePress: PropTypes.func.isRequired,
	city: PropTypes.string.isRequired
};

export default EventDetails;
