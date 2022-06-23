$(document).ready(function () {
  $('.add-movie').click(function () {
    let title = $('input[name="title"]').val();
    let rating = $('input[name="rating"]').val();

    if (title === '' || rating === '' || rating < 1 || rating > 10) {
      alert('Nieprawidłowe dane');
      return;
    }

    $('#table-content #no-movies').remove();

    let movie = $(getMovieElement(title, rating)).hide();
    
    if($(this).hasClass('first-place')){
      if($('.movie').length > 0){
        $('#table-content tr:first')
          .before(
            $(movie)
          );
          movie.fadeIn(1000);
      } else {
        $('#table-content')
          .append(
            $(movie)
          );
          movie.fadeIn(1000);
      }
    } else {
      $('#table-content')
        .append(
          $(movie)
        );
        movie.fadeIn(1000);
    }
    
    findTheBest();
  });

  $('#table-content').on('click', '.remove-movie', function () {
    $(this).closest('tr').remove();

    if($('.movie').length == 0){
      $('#table-content').append(getMessage());
    }

    findTheBest();
  });

  $('#table-content').on('dblclick', '.movie', function (){
    $(this).remove();

    if($('.movie').length == 0){
      $('#table-content').append(getMessage());
    }

    findTheBest();
  });
});

function getStars(rating) {
  return '*'.repeat(rating);

  // let stars = '';
  // for (let index = 0; index < rating; index++) {
  //   stars += '*';
  // }
  // return stars;
}

function getMovieElement(title, rating){
  return '<tr class="movie">' +
      '<td>' + title + '</td>' +
      '<td class="stars">' + getStars(rating) + '</td>' +
      '<td><button class="remove-movie">Usuń</button></td>'+ 
    '</tr>';
}

function getMessage(title, rating){
  return '<tr id="no-movies">' +
      '<td colspan="3">Brak filmów</td>' +
    '</tr>';
}

function findTheBest(){
  $('.movie td')
    .removeClass('the-best-movie')
    .removeClass('normal-movie')
    .addClass('normal-movie');

  let stars = 0;
  let movie;

  $('.movie').each(function (){
    let length = $(this).find('.stars').text().length;
    
    if(length < stars){
      $(this).hide();
    }
  });
  
  console.log(movie)

  if(movie)
    $(movie).find('td')
      .removeClass('normal-movie')
      .addClass('the-best-movie');
}