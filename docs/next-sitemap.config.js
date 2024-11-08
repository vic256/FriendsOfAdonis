/* eslint-disable tsdoc/syntax */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL ?? 'https://friendsofadonis.com',
  generateRobotsTxt: true,
}
