import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import Colors from '../styles/Colors';

const SocialLinks = (props) => {
	const website = props.website ? props.website : null;
	const websiteRow = !props.website ? null : (
		<figure>
			<SocialIcon url={website} style={{ height: 30, width: 30 }} />
			<a href={website}>{website}</a>
		</figure>
	);

	const facebook = props.facebook ? props.facebook : null;
	const facebookRow = !props.facebook ? null : (
		<figure>
			<SocialIcon url={facebook} style={{ height: 30, width: 30 }} />
			<a href={facebook}>{facebook.split('/').pop()}</a>
		</figure>
	);

	const instagram = props.instagram ? props.instagram : null;
	const instagramRow = !props.instagram ? null : (
		<figure>
			<SocialIcon url={instagram} style={{ height: 30, width: 30 }} />
			<a href={instagram}>{instagram.split('/').pop()}</a>
		</figure>
	);

	const twitter = props.twitter ? props.twitter : null;
	const twitterRow = !props.twitter ? null : (
		<figure>
			<SocialIcon url={twitter} style={{ height: 30, width: 30 }} />
			<a href={twitter}>{twitter.split('/').pop()}</a>
		</figure>
	);

	const youtube = props.youtube ? props.youtube : null;
	const youtubeRow = !props.youtube ? null : (
		<figure>
			<SocialIcon url={youtube} style={{ height: 30, width: 30 }} />
			<a href={youtube}>{youtube}</a>
		</figure>
	);

	return (
		<div className="item-row social-links">
			{websiteRow}
			{facebookRow}
			{instagramRow}
			{twitterRow}
			{youtubeRow}
		</div>
	);
};


SocialLinks.propTypes = {
	website: PropTypes.string,
	facebook: PropTypes.string,
	instagram: PropTypes.string,
	twitter: PropTypes.string,
	youtube: PropTypes.string,
}

export default SocialLinks;


