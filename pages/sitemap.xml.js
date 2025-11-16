// Sitemap generation for Next.js Pages Router
// This file will be accessible at /sitemap.xml

function generateSiteMap() {
  const baseUrl = 'https://oakrootsolutions.com';
  
  // List all your pages
  const pages = [
    '', // Homepage
    '/about',
    '/contact',
    '/info',
    '/services',
    '/projects',
    '/talent',
    '/careers',
    '/indore',
    '/services/web-design',
    '/services/digital-marketing',
    '/services/app-development',
    '/services/branding',
    '/services/graphic-design',
    '/services/video-photo',
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map((page) => {
         return `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${page === '' ? '1.0' : '0.8'}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap with the pages data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // Write the XML to the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
