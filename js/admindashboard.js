function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const table = document.getElementById('movies');
const url = 'http://localhost:3000/movies/select_all';
fetch(url)
.then((resp) => resp.json())
.then(function(data){
    let movies = data.result;
    return movies.map(function(movie){
      console.log(movie.movieName);
      var tr = createNode('tr');
      tr.innerHTML = '<td>' + movie.movie_id+'</td>'+
                                '<td>'+ movie.movieName+ '</td>'+
                                '<td>'+ movie.movieDesc + '</td>'+
                                '<td>' + movie.releaseDate + '</td>'+
                                "<td><a href = '../admin/screening.html?movie_id="+movie.movie_id+"'>Add Screening</a></td>"+
                                "<td><a href='../admin/updateMovie.html?movie_id="+movie.movie_id+"&&process=update'>Edit Movie</a></td>"+
                                "<td><a href='../admin/updateMovie.html?movie_id="+movie.movie_id+"&&process=delete'>Delete Movie</a></td>"
                                
                                ;
      append(table, tr);
    })
  })
.catch(function(error) {
  console.log(error);
});   

