$(function() {
  //Append scraped posts to the #posts div
  $('#scraper').on('click', function(e) {
    e.preventDefault();
    $.getJSON('/scrape', function(posts) {
      $('#posts h4').text('Scraped Forum Posts');
      posts.forEach(function(post) {
        var newCard = $('<div>').addClass('col s12')
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
          );
        $('#posts').append(newCard);
      });
    });
  });
  // Sends API command to save a forum post and changes the Save Post button to Saved
  $(document).on('click', '.save', function() {
    // Grab the id associated with the article from the submit button
    var _this = $(this);
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
      });
  });
  // Sends API command to delete a forum post and removes the post from the page upon success
  $(document).on('click', '.delete', function() {
    var _this = $(this);

    $.ajax({
        method: 'POST',
        url: '/post/' + $(this).attr('data-id') + '?_method=DELETE',
      })
      .done(function(result) {
        // Remove the card on a successful response
        if (result) {
          _this.parents('.col').remove();
        }
      });
  });
  // Updates the data-id of the save-note button to reflect the id of the relevant post
  $(document).on('click', '.note', function() {
    var id = $(this).attr('data-id');
    // Add the post id to both of the modal buttons
    $('#save-note').attr({
      'data-id': id,
    });
    $('#delete-note').attr({
      'data-id': id,
    });
    //Clear the modal
    $('.modal-content').html('');
    // If there is an existing note show the note and delete button, hide the save button
    if ($(this).attr('data-note')) {
      if ($('#delete-note').hasClass('hide')) {
        $('#delete-note').removeClass('hide');
      }
      if (!$('#save-note').hasClass('hide')) {
        $('#save-note').addClass('hide');
      }
      $('.modal-content')
        .append($('<h4>').text('Note'))
        .append($('<p>')
          .text($(this)
            .attr('data-note')),
        );
    } else {
      // If there isn't a note show the form for creating the note and the save button, hide the delete button
      if ($('#save-note').hasClass('hide')) {
        $('#save-note').removeClass('hide');
      }
      if (!$('#delete-note').hasClass('hide')) {
        $('#delete-note').addClass('hide');
      }
      // Add the modal form for creating a note
      $('.modal-content')
        .append($('<h4>').text('Note'))
        .append($('<div>').addClass('input-field'))
        .append($('<input>')
          .addClass('validate')
          .attr({
            placeholder: 'Your Note',
            id: 'note',
            type: 'text',
          }),
        );
    }
  });
  // Sends API command to create a note for a saved post
  $(document).on('click', '#save-note', function() {
    var _this = $(this);
    var note = $('#note').val().trim();

    $.ajax({
        method: 'POST',
        url: '/note/' + $(this).attr('data-id'),
        data: {
          body: note,
        },
      })
      .done(function(response) {
        // Add the note to the note button data-note attribute
        if (response) $('#' + _this.attr('data-id')).find('.note').attr({
          'data-note': note
        });
      });
  });
  // Sends API command to delete a note for a saved post
  $(document).on('click', '#delete-note', function() {
    var _this = $(this);

    $.ajax({
        method: 'POST',
        url: '/note/' + $(this).attr('data-id') + '?_method=DELETE',
      })
      .done(function(response) {
        if (response) {
          // Remove the note from the note button data-note attribute
          $('#' + _this.attr('data-id')).find('.note').attr({
            'data-note': ''
          });
          // Hide the delete button and show the save button
          $('#delete-note').addClass('hide');
          $('#save-note').removeClass('hide');
          // Build the form for creating the note
          $('.modal-content')
            .append('<h4>').text('Note')
            .append($('<div>').addClass('input-field'))
            .append($('<input>')
              .addClass('validate')
              .attr({
                placeholder: 'Your Note',
                id: 'note',
                type: 'text',
              }),
            );
        }
      });
  });
  // For triggering the modal on saved.html
  $('.modal').modal();
});