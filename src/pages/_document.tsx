import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
        <Head>
		<meta charSet="UTF-8" />

			{/* <title>Hyena Pets | By XFT.red</title>
				<meta
					name="description"
					content="Magical, Mythical, Battle Ready, Hyena's As Pets"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/> */}
				{/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Alkatra&family=Comfortaa:wght@300;400;500;600&family=Delicious+Handrawn&family=Josefin+Sans:ital,wght@0,300;0,500;0,600;1,500;1,600;1,700&family=Vina+Sans&display=swap"
					rel="stylesheet"
				/>
				<script
					async
					src="/js/jquery-3.6.0.min.js"
				/>
				            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-5540048YH3"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  
                  gtag('config', 'G-5540048YH3');
                `,
              }}
            ></script>
		</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
