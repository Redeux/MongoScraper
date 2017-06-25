$(() => {

  //Append scraped posts to the #posts div
  $('#scraper').on('click', (e) => {
    e.preventDefault();
    $.getJSON('/posts', (posts) => {
      $('#posts h4').text('Scraped Forum Posts');
      posts.forEach((post) => {
        const newCard = $('<div>').addClass('col s12')
          .append($('<div>').addClass('card amber lighten-5')
            .append($('<div>').addClass('card-conent')
              .append($('<div>').addClass('col s8')
                .append($('<a>')
                  .text(post.title)
                  .attr('href', 'https://us.battle.net' + post.link)),
              )
              .append($('<div>').addClass('col s4')
                .append($('<a>')
                  .addClass('waves-effect waves-light btn purple lighten-1 notes')
                  .text('Notes'))
                .append($('<a>')
                  .addClass('waves-effect waves-light btn red lighten-1 save')
                  .text('Save Post'),
                ),
              ),
            ),
          );
        console.log(newCard);
        $('#posts').append(newCard);
      });
    });
  });
});