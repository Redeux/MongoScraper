$(() => {

  $('#scraper').on('click', (e) => {
    e.preventDefault();
    $.getJSON('/posts', (data) => {
      
    });
  });


});