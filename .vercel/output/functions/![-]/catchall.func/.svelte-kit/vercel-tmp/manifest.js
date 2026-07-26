export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon-48x48.png","favicon.ico","favicon.svg","laziz-tojiboyev-cv.pdf","og-image.png","robots.txt","safari-pinned-tab.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".pdf":"application/pdf",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.BxYUpHgi.js",app:"_app/immutable/entry/app.CKAOgFVe.js",imports:["_app/immutable/entry/start.BxYUpHgi.js","_app/immutable/chunks/D736fO1E.js","_app/immutable/chunks/CYEMZujY.js","_app/immutable/entry/app.CKAOgFVe.js","_app/immutable/chunks/CYEMZujY.js","_app/immutable/chunks/Cw975h9H.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/about","/contact","/sitemap.xml","/work"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
