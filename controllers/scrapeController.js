// Dependencies
const request = require('request');
const cheerio = require('cheerio');
const Post = require('../models/Post');

exports.getPosts = (callback) => {
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
      result.link = $(element).attr('href');


      // Make sure there is a valid title
      if (result.title !== '') {
        // Check to see if the post is already in the database
        posts.push(result);
        // Post.find({
        //   link: result.link,
        // }, (err, doc) => {
        //   if (doc.length > 0) console.log(`Skipping ${result.link} already in database ...`);
        //   else {
        //     console.log(`Adding ${JSON.stringify(result)} to database ...`)
        //     // Using our Post model, create a new entry
        //     // This effectively passes the result object to the entry (and the title and link)
        //     const entry = new Post(result);
        //     // Now, save that entry to the db
        //     entry.save((err, doc) => {
        //       // Log any errors
        //       if (err) console.log(JSON.stringify(err));
        //       // Or log the doc
        //       else console.log(`Successfully added ${JSON.stringify(doc)} to database!`);
        //     });
        //   }
        // });
      }
    });
    // Tell the browser that we finished scraping the text
    return callback(posts);
  });
};