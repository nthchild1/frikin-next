import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import categories from '../utils/categories';
import escapeHTMLchars from '../utils/escapeHTMLchars';
import '../styles/ItemHeader.scss';

const ItemHeader = (props) => {

	const {type, item} = props;
	const allCategories = Object.values(categories);
	let title = 'title' in item && item.title ? escapeHTMLchars(item.title) : '';
	let image = item.featured_image ? item.featured_image : null;
	const itemCategories = [];
	let imageElement = null;
	let rawCats = 'categories' in item ? item.categories : null;

	switch (type) {
		case 'person':
			title = 'name' in item && item.name ? item.name : '';
			break;
		case 'post':
			title = escapeHTMLchars(item.title.rendered);
			// Taxonomies
			const post_taxonomies = item._embedded ? item._embedded['wp:term'] : null;
			rawCats = post_taxonomies ? post_taxonomies[0] : null;

			// Featured Image
			const featured_media = item._embedded ? item._embedded['wp:featuredmedia'] : null;
			if (featured_media) {
				image = featured_media['0'].media_details.sizes.medium ? featured_media['0'].media_details.sizes.medium.source_url : featured_media['0'].source_url;
			}
			break;
		default:
			break;
	}

	if (image) {
		imageElement = <img src={image} alt=""/>;
	}

	if (rawCats) {
		rawCats.forEach((rawCat) => {
			const the_cat = type === 'post' ? rawCat.slug : rawCat;
			const newCat = allCategories.find((cat) => cat.slug === the_cat);
			if (newCat) {
				itemCategories.push(newCat);
			}
		});
	}

	let postCategories = itemCategories.map((cat) => {
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

	const headerInfo = (
		<div>
			<h1>
				{title}
			</h1>
			<ul className="item-categories">
				{postCategories}
			</ul>
		</div>
	);

	return (
		<header className="single-item-header">
			<div className="item-image">
				<div className="image-blur" style={{backgroundImage: `url(${image})`}}/>
				{imageElement}
			</div>
			<div className="header-info">
				{headerInfo}
			</div>
		</header>
	);
};

export default ItemHeader;
