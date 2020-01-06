import React, {Fragment, useState} from 'react';
import Error from "next/error";
import Header from "../components/Header";
import InfoSidebar from '../components/InfoSidebar';
import ItemHeader from '../components/ItemHeader';
import PostDetails from '../components/PostDetails';
import ShareModule from "../components/ShareModule";
import urls from '../utils/urls';
import routes from '../utils/routes';
import appConstants from "../utils/appConstants";
import DocumentHead from "./DocumentHead";
import escapeHTMLchars from "../utils/escapeHTMLchars";

const SinglePost = props => {
	const [toggle, toggleShare] = useState(true);
	const {item, city, isError} = props;

	let title, shareUrl, excerpt, featured_image;

	if (appConstants.devMode === 'development') {
		shareUrl = urls.development + (city === 'cdmx' ? '' : '/toluca') + `${routes.news.path}/${item && 'id' in item ? item.id : ''}`;
	} else {
		shareUrl = (city === 'cdmx' ? urls.share.cdmx : urls.share.toluca) + routes.news.path + '/' + (item && 'id' in item ? item.id : '');
	}

	if (item) {
		title = item && 'title' in item ? escapeHTMLchars(item.title.rendered) : '';

		excerpt = item && 'excerpt' in item ? escapeHTMLchars(item.excerpt.rendered.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, "")) : '';

		if (excerpt === '' || excerpt === null || excerpt === undefined) {
			if ('description' in item) {
				const excerptFromDescription = escapeHTMLchars(item.description.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, ""));

				if (excerptFromDescription.length > 150){
					excerpt = excerptFromDescription.substr(0,147) + '...';
				} else {
					excerpt = excerptFromDescription;
				}
			}
		}

		const featured_media = item._embedded ? item._embedded['wp:featuredmedia'] : null;
		if (featured_media) {
			featured_image = featured_media['0'].media_details.sizes.medium ? featured_media['0'].media_details.sizes.medium.source_url : featured_media['0'].source_url;
		}
	}

	let itemParent = {};

	return (
		<Fragment>
			{isError && <Error title={'No se ha encontrado esta página'} statusCode={'404'}/>}
			{item && <Fragment>
				<DocumentHead post_type={'Noticias'} shareUrl={shareUrl} excerpt={excerpt} title={title} featured_image={featured_image}/>
				<section className="main single-post" id="news">
					<Header type={'post'}/>
					<ItemHeader
						type={'post'}
						name={title}
						parent={itemParent}
						item={item}
					/>
					<ShareModule toggle={toggle} shareUrl={shareUrl} title={title} type="noticia"/>
					<PostDetails post={item}/>
				</section>
				<InfoSidebar type="post"/>
			</Fragment>
			}
		</Fragment>
	);
};

export default SinglePost;
