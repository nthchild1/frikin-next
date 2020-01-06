import React, {Fragment} from "react";
import InfoSidebar from '../components/InfoSidebar';
import PersonDetails from '../components/PersonDetails';
import Header from "../components/Header";
import Error from "next/error";
import DocumentHead from "./DocumentHead";
import urls from "../utils/urls";
import routes from "../utils/routes";
import escapeHTMLchars from "../utils/escapeHTMLchars";

const SinglePerson = (props) => {
	const {person, isError} = props;

	let title;
	let excerpt;

	if (person) {
		title = person && 'name' in person ? person.name : '';

		excerpt = person && 'excerpt' in person ? escapeHTMLchars(person.excerpt.rendered.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, "")) : '';

		if (excerpt === '' || excerpt === null || excerpt === undefined) {
			if ('description' in person) {
				const excerptFromDescription = escapeHTMLchars(person.description.replace(/<[^>]*>/g, "").replace(/^\s*[\r\n]/gm, ""));

				if (excerptFromDescription.length > 150){
					excerpt = excerptFromDescription.substr(0,147) + '...';
				} else {
					excerpt = excerptFromDescription;
				}
			}
		}
	}

	const shareUrl = urls.share.cdmx + routes.people.path + '/' + (person && 'id' in person ? person.id : '');
	const featured_image = 'featured_image' in person && person.featured_image ? person.featured_image : '';

	return (
		<Fragment>
			{isError && <Error/>}
			{
				person && <Fragment>
					<DocumentHead post_type="Personas" shareUrl={shareUrl} excerpt={excerpt} title={title} featured_image={featured_image}/>
					<section className='main single-event'>
						<Header type={'person'}/>
						<PersonDetails person={person}/>
					</section>
					<InfoSidebar type="person"/>
				</Fragment>
			}
		</Fragment>
	)
};

export default SinglePerson;
