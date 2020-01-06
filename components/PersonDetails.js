import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import ShareModule from '../components/ShareModule';
import SocialLinks from '../components/SocialLinks';
import Icon from '../components/Icon';
import '../styles/PersonDetails.scss';
import appConstants from "../utils/appConstants";
import categories from "../utils/categories";
import urls from '../utils/urls';
import routes from '../utils/routes';
import escapeHTMLchars from "../utils/escapeHTMLchars";

const PersonDetails = (props) => {
	const { person } = props;
	const allCategories = Object.values(categories);
	const name = 'name' in person && person.name ? escapeHTMLchars(person.name) : '';
	const imageURL = 'featured_image' in person && person.featured_image ? person.featured_image : null;
	const image = !imageURL ? null : <img src={imageURL} alt={name} />;
	const types = 'types' in person ? person.types : [];
	const description = 'description' in person && person.description ? Parser(person.description) : '';
	const socialNetworks = 'social-networks' in person ? JSON.parse(person['social-networks']) : {};
	const website = 'website' in socialNetworks ? socialNetworks.website : '';
	const facebook = 'facebook' in socialNetworks ? socialNetworks.facebook : '';
	const instagram = 'instagram' in socialNetworks ? socialNetworks.instagram : '';
	const twitter = 'twitter' in socialNetworks ? socialNetworks.twitter : '';
	const youtube = 'youtube' in socialNetworks ? socialNetworks.youtube : '';
	let rawCats = 'categories' in person ? person.categories : null;
	let personCategories = [];
	let shareUrl;

	if (appConstants.devMode === 'development') {
		shareUrl = urls.development + `${routes.news.path}/${person.id}`;
	} else {
		shareUrl = urls.share.cdmx + routes.places.path + '/' + (person && 'id' in person ? person.id : '');
	}

	const typeList = (
		<p className="types-list">
			{types.map((type, index) => {
				if (typeof type !== 'string') return;

				const sep = types.length > 1 && index !== types.length - 1 ? ' / ' : '';
				const text = type.charAt(0).toUpperCase() + type.slice(1) + sep;

				return (
					<span>
						{text}
					</span>
				);
			})}
		</p>
	);

	if (rawCats) {
		rawCats.forEach(function (rawCat) {
			const newCat = allCategories.find(cat => cat.slug === rawCat);
			if (newCat) {
				personCategories.push(newCat);
			}
		});
	}

	const categoryList = personCategories.map((cat, index) => {
		if (cat.disabled) {
			return null;
		}
		return (
			<div key={cat.id} className={"category-icon"}
			     style={{marginTop: 5, marginRight: 12.5, borderRadius: 12.5, backgroundColor: cat.color}}>
				<Icon name={cat.icon} size={25}/>
			</div>
		);
	});

	return (
		<section className="person-details">
			<div className="item-row content">
				<figure className="person-header">
					{image}
					<div>
						<h1>{name}</h1>
						{typeList}
						<div className="item-categories">
							{categoryList}
						</div>
					</div>
				</figure>
			</div>
			<div className="item-row content person-description">
				{description}
			</div>
			<SocialLinks
				website={website}
				facebook={facebook}
				instagram={instagram}
				twitter={twitter}
				youtube={youtube}
			/>
			<ShareModule toggle text shareUrl={shareUrl} title={name} type="noticia"/>
		</section>
	);
};

PersonDetails.propTypes = {
	person: PropTypes.object.isRequired,
};

export default PersonDetails;
