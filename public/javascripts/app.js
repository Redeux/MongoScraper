$(() => {

  //Append scraped posts to the #posts div
  $('#scraper').on('click', function(e) {
    e.preventDefault();
    $.getJSON('/scrape', function(posts) {
      $('#posts h4').text('Scraped Forum Posts');
      posts.forEach(function(post) {
        const newCard = $('<div>').addClass('col s12')
          .append($('<div>').addClass('card  hoverable orange lighten-5')
            .append($('<div>').addClass('card-content')
              .append($('<a>')
                .addClass('card-title left-align')
                .text(post.title)
                .attr({
                  href: 'https://us.battle.net/forums/en/wow/topic/' + post.id,
                  target: '_blank',
                }),
              )
              .append($('<p>')
                .text(post.preview),
              )
              .append($('<p>')
                .addClass('author')
                .text('-' + post.author),
              ),
            )
            .append($('<div>')
              .addClass('card-action')
              .append($('<a>')
                .addClass('waves-effect waves-light btn right-align red lighten-1 save')
                .text('Save Post')
                .attr({
                  'data-id': post.id,
                  'data-title': post.title,
                  'data-preview': post.preview,
                  'data-author': post.author,
                }),
              ),
            ),
            // .append($('<a>')
            //   .addClass('waves-effect waves-light btn purple lighten-1 notes')
            //   .text('Notes'))
          );
        // console.log(newCard);
        $('#posts').append(newCard);
      });
    });
  });

  // When the Save Post button is clicked
  $(document).on('click', '.save', function() {
    // Grab the id associated with the article from the submit button
    let _this = $(this);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: 'POST',
        url: '/post/' + $(this).attr('data-id'),
        data: {
          title: $(this).attr('data-title'),
          author: $(this).attr('data-author'),
          preview: $(this).attr('data-preview'),
        },
      })
      .done(function(data) {
        // Log the response
        if (data) {
          _this
            .text('Saved')
            .removeClass('red lighten-1 save')
            .addClass('green lighten-1');
        }
        // console.log(data);
      });
  });
});