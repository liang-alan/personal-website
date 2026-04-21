import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const profilePath = path.join(root, 'content', 'profile.json');
const outputPath = path.join(root, 'public', 'rss.xml');
const DEFAULT_SITE_URL = 'https://liang-alan.github.io/personal-website';

const escapeXml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
const posts = [...(profile.blogs || [])].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

const renderItem = (post) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const description = post.excerpt || `New blog post: ${post.title}`;
  const content = `<p>${escapeXml(description)}</p><p><a href="${escapeXml(postUrl)}">Read the full post</a></p>`;

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
};

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.name} Blog`)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(profile.description || `${profile.name}'s blog`)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
${posts.map(renderItem).join('\n')}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, feed, 'utf8');
console.log(`Generated RSS feed at ${outputPath}`);
