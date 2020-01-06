import React from 'react';
import PropTypes from 'prop-types';
import {
	FacebookShareCount,
	RedditShareCount,
	TumblrShareCount,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
	TumblrShareButton,

	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	RedditIcon,
	TumblrIcon,
	EmailIcon,
} from 'react-share';
import '../styles/ShareModule.scss';

const ShareModule = (props) => {
	const type = props.type;
	const title = props.title + ' en Frik-in';
	const url = props.shareUrl;
	const fbHashtag = '#Frikin';
	const twUser = 'Frik_in';
	const twHashtags = ['frikin', type + 'friki'];
	const whatsSep = ': ';
	const description = 'Consulta este ' + type + ' en Frik-in, la cara friki de tu ciudad:\r\n' + url;
	const moduleClass = props.toggle ? 'share-module active' : 'share-module';
	const text = props.text ? <span>Comparte:</span> : null;

	return(
		<div className={moduleClass}>
			{text}
			<div className="share-button">
				<FacebookShareButton url={url} quote={title} hashtag={fbHashtag}>
					<FacebookIcon size={32} round />
					<FacebookShareCount className="share-count" url={url}>
						{count => count}
					</FacebookShareCount>
				</FacebookShareButton>
			</div>
			<div className="share-button">
				<TwitterShareButton url={url} title={title} via={twUser} hashtags={twHashtags}>
					<TwitterIcon size={32} round />
				</TwitterShareButton>
			</div>
			<div className="share-button">
				<RedditShareButton url={url} title={title} windowWidth={600} windowHeight={460}>
					<RedditIcon size={32} round />
					<RedditShareCount className="share-count" url={url} />
				</RedditShareButton>
			</div>
			<div className="share-button">
				<TumblrShareButton url={url} title={title} tags={twHashtags} caption={description} windowWidth={660} windowHeight={460}>
					<TumblrIcon size={32} round />
					<TumblrShareCount className="share-count" url={url} />
				</TumblrShareButton>
			</div>
			<div className="share-button">
				<WhatsappShareButton url={url} title={title} separator={whatsSep}>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
			</div>
			<div className="share-button">
				<EmailShareButton url={url} subject={title} body={description}>
					<EmailIcon size={32} round />
				</EmailShareButton>
			</div>
		</div>
	);
}

ShareModule.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	shareUrl: PropTypes.string.isRequired,
	toggle: PropTypes.bool,
	text: PropTypes.bool,
}

export default ShareModule;
