import React from 'react';
import '../styles/HomePage.scss';
import appConstants from '../utils/appConstants';

const HomePage = (props) => {
	const links = appConstants.links;

	return(
		<main className="home-page">
			<div>
				<img src="/Logotipo2019(Blanco).png" alt="Frik-in" className="logo" />

				<p>Frik-in es una aplicación gratuita que cataloga toda la actividad "friki" en la Ciudad de México, Área Metropolitana y el Valle de Toluca. Cultura asiática, videojuegos, cómics, coleccionismo, animación, ciencia ficción, fantasía y juegos de mesa.</p>

				<p>Explora nuevos <strong>lugares</strong>, descubre próximos <strong>eventos</strong> y entérate de todas las <strong>noticias</strong> que tendremos para ti. Por medio de nuestras categorías tus gustos siempre estarán a un click de distancia.</p>

				<p>Además, en el <strong>catálogo de personas friki</strong> podrás conocer artistas, creadores de contenido, medios, editoriales independientes, ¡y mucho más! Consulta sus redes sociales, eventos próximos y lugares donde podrás adquirir sus productos.</p>

				<p>¡Somos la cara friki de tu ciudad!</p>

				<div className="store-badges">
					<a href={links.appStore}>
						<img src="/App_Store.png" alt="App Store" />
					</a>
					<a href={links.googlePlay}>
						<img src="/Google_Play.png" alt="Google Play" />
					</a>
				</div>
			</div>
			<div>
				<img src="/Mockup_SamsungS9_Home.png" alt="Lugares, Personas, Evento y Noticias" className="mockup" />
				<img src="/Mockup_SamsungS9_Categorias.png" alt="Categorías Friki" className="mockup" />
			</div>
		</main>
	);
};

export default HomePage;
