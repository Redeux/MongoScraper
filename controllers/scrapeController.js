// Dependencies
const request = require('request');
const cheerio = require('cheerio');
const Post = require('../models/Post');

exports.scrapePosts = (callback) => {
  request('https://us.battle.net/forums/en/wow/984270/', (error, response, html) => {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);
    // console.log('Adding posts to database ...');
    const posts = [];
    // Now, we grab every form topic and do the following:
    $('.ForumTopic').each((i, element) => {
      // Save an empty result object
      const result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(element).closest('div')
        .children('.ForumTopic-title')
        .text()
        .trim();
      result.preview = $(element).closest('div')
        .children('.ForumTopic--preview')
        .text()
        .trim();
      result.author = $(element).closest('div')
        .children('.ForumTopic-author')
        .text()
        .trim();
      const id = $(element).attr('href').split('/');
      result.id = id[id.length - 1];
      // Make sure there is a valid title and link
      if (result.title && result.id) {
        // Add the post to the return object
        posts.push(result);
      }
    });
    // Tell the browser that we finished scraping the text
    return callback(posts);
  });
};
