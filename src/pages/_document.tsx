import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html className="no-js" lang="en">
        <Head>
          <meta charSet="UTF-8" />
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
        {/* <div className="cs-preloader cs-center">
          <div className="cs-preloader_in"></div>
          <span>Loading</span>
        </div> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;