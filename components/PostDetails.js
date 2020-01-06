import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "./Avatar";
import Parser from 'html-react-parser';
import '../styles/PostDetails.scss'

const PostDetails = (props) => {
	const { post } = props;

	const author = post._embedded ? post._embedded.author[0].name : '';
	const formattedDate = new Date(post.date);
	const dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const date = <p className="post-date">{ formattedDate.toLocaleDateString('es-419', dateOptions) }</p>;
	let descriptionRow = null;
	let authorAvatar = <Avatar name={author} size={100} />;

	if (post.content) {
		const content = post.content.rendered.replace(/display: block;/g, '');
		descriptionRow = Parser(content);
	}

	const postDetails = (
		<figure className="author">
			{authorAvatar}
			<h3>{author}</h3>
		</figure>
	);

	return (
		<section className="post-details">
			{postDetails}
			{date}
			{descriptionRow}
		</section>
	);
};

PostDetails.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostDetails;
