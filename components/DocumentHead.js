import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';

const DocumentHead = props => {
	const POST_TYPE = props.post_type ? props.post_type : '';
	const URL_SHARE = props.shareUrl ? props.shareUrl : '';
	const EXCERPT = props.excerpt ? props.excerpt : '';
	const TITLE = props.title ? props.title : '';
	const FEATURED_IMAGE = props.featured_image ? props.featured_image : '';

	return (
		<Head>
			<title>{`${TITLE} - ${POST_TYPE} Frik-in`}</title>

			<meta property="og:title" content={TITLE} />
			<meta property="og:type" content="article"/>
			<meta property="og:url" content={URL_SHARE}/>
			<meta property="og:image" content={FEATURED_IMAGE}/>

			<meta property="og:locale" content="es_MX"/>
			<meta property="og:description" content={EXCERPT}/>
			<meta name="twitter:text:title" content={TITLE}/>
			<meta name="twitter:image" content={FEATURED_IMAGE}/>
		</Head>
	);
};

DocumentHead.propTypes = {
	post_type: PropTypes.string.isRequired,
	shareUrl: PropTypes.string.isRequired,
	excerpt: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	featured_image: PropTypes.string.isRequired
};

export default DocumentHead;
