import { c as create_ssr_component, b as setContext, v as validate_component, m as missing_component } from "./ssr.js";
import { a as afterUpdate } from "./ssr2.js";
import "./server.js";
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        params: page.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            {
              data: data_1,
              form,
              params: page.params,
              this: components[1]
            },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        form,
        params: page.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
const error = ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n";
const options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  service_worker_options: void 0,
  server_error_boundaries: false,
  templates: {
    app: ({ head, body, assets, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n\n  <link rel="icon" href="' + assets + '/favicon.ico" sizes="32x32" />\n  <link rel="icon" type="image/svg+xml" href="' + assets + '/favicon.svg" />\n  <link rel="icon" type="image/png" sizes="16x16" href="' + assets + '/favicon-16x16.png" />\n  <link rel="icon" type="image/png" sizes="32x32" href="' + assets + '/favicon-32x32.png" />\n  <link rel="icon" type="image/png" sizes="48x48" href="' + assets + '/favicon-48x48.png" />\n  <link rel="apple-touch-icon" sizes="180x180" href="' + assets + '/apple-touch-icon.png" />\n  <link rel="mask-icon" href="' + assets + '/safari-pinned-tab.svg" color="#e8ff47" />\n  <link rel="manifest" href="' + assets + '/site.webmanifest" />\n  <meta name="theme-color" content="#080808" />\n\n  <title>Laziz Tojiboyev — Full-Stack Developer</title>\n  <meta name="description" content="Laziz Tojiboyev is a Full-Stack Developer from Uzbekistan specializing in React, SvelteKit, Node.js, and Flutter." />\n  <link rel="canonical" href="https://iamlaziz.me" />\n\n  <meta property="og:title" content="Laziz Tojiboyev — Full-Stack Developer" />\n  <meta property="og:description" content="Full-Stack Developer from Uzbekistan. Engineer with a story." />\n  <meta property="og:image" content="https://iamlaziz.me/og-image.png" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta property="og:url" content="https://iamlaziz.me" />\n  <meta property="og:type" content="website" />\n  <meta property="og:site_name" content="iamlaziz.me" />\n\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="Laziz Tojiboyev — Full-Stack Developer" />\n  <meta name="twitter:description" content="Full-Stack Developer from Uzbekistan. Engineer with a story." />\n  <meta name="twitter:image" content="https://iamlaziz.me/og-image.png" />\n\n  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />\n  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700&display=swap" />\n\n  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "Person",\n    "name": "Laziz Tojiboyev",\n    "jobTitle": "Full-Stack Developer",\n    "url": "https://iamlaziz.me",\n    "email": "dev.iproger@gmail.com",\n    "image": "https://iamlaziz.me/og-image.png",\n    "address": { "@type": "PostalAddress", "addressCountry": "UZ", "addressRegion": "Fergana" },\n    "sameAs": [\n      "https://linkedin.com/in/lazizbe",\n      "https://github.com/LazizbekDev",\n      "https://t.me/corefold"\n    ]\n  }\n  <\/script>\n\n  ' + head + '\n</head>\n<body data-sveltekit-preload-data="hover">\n  <div style="display: contents">' + body + "</div>\n</body>\n</html>\n",
    error
  },
  version_hash: "17ogk4w"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};
