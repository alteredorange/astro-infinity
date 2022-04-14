// Static
						const frontmatter = {"setup":"import Layout from '../../layouts/BlogPost.astro'\nimport Cool from '../../components/Author.astro'\n","title":"Hello Bloggy!!","publishDate":"12 Sep 2021","name":"Nate Moore","value":128,"description":"Today is the day of something..."};
						const file = "/home/oranges/astro/ssr/src/pages/posts/day-one.md";
						const url = "/posts/day-one";
						
						// Deferred
						async function load() {
							return (await import('../entry.mjs').then(function (n) { return n._; }));
						}						function Content(...args) {
							return load().then((m) => m.default(...args))
						}
						Content.isAstroComponentFactory = true;
						function getHeaders() {
							return load().then((m) => m.metadata.headers)
						}

export { Content, load as default, file, frontmatter, getHeaders, url };
