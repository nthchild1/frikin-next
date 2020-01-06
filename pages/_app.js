import React, {Fragment} from 'react'
import App from 'next/app';
import Head from "next/head";

export default class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;
		return <Fragment>
			<Head>
				<title>Frik-in: La cara friki de tu ciudad</title>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
				<link rel="profile" href="http://gmpg.org/xfn/11"/>
				<link rel="icon" type="image/x-icon" href="/static/favicon.ico"/>
				<link rel="stylesheet" id="google-fonts-css" href="https://fonts.googleapis.com/css?family=Roboto%3A400%2C700%7CRajdhani%3A400%2C700&amp;ver=5.2.5" type="text/css" media="all"/>
				<link rel="profile" href="http://gmpg.org/xfn/11"/>
				<meta name="theme-color" content="#990099"/>
				<meta name="msapplication-TileColor" content="#9f00a7"/>
				<meta property="fb:app_id" content="521051611627486"/>
				<meta property="og:site_name" content="Frik-in"/>
				<meta name="twitter:card" content="summary_large_image"/>
				<link rel="icon" href="/static/favicon-32x32.png" sizes="32x32"/>
				<link rel="apple-touch-icon-precomposed" href="/static/apple-touch-icon.png"/>
			</Head>
			<Component {...pageProps} />
		</Fragment>
	}
}
