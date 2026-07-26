import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.STWB_pmw.js","_app/immutable/chunks/CYEMZujY.js","_app/immutable/chunks/Cw975h9H.js","_app/immutable/chunks/D736fO1E.js","_app/immutable/chunks/BcoZTlkF.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/DMGb4zp1.js"];
export const stylesheets = ["_app/immutable/assets/0.S9IZ2dnD.css"];
export const fonts = [];
