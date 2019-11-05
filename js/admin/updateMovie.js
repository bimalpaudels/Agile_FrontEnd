var url_string = window.location.href;
var url = new URL(url_string);
var movie_id = url.searchParams.get('movie_id');
var action = url.searchParams.get('process');
console.log(movie_id);
console.log(action);
if(action=='update')
{
    fetch('http://localhost:3000/movie/'+movie_id)
    .then((resp)=>resp.json())
    .then(function(data){
        document.getElementById('movieName').value= data[0].movieName;
        document.getElementById('movieDesc').value= data[0].movieDesc;
        document.getElementById('releaseDate').value=data[0].releaseDate;
        document.getElementById('trailer').value=data[0].trailer;
    })
    .catch(err=>console.log(err));
}

var updateMovies = document.getElementById('updateMovie');
updateMovies.addEventListener('click', function(e){
    e.preventDefault();
    const movieName = document.getElementById('movieName').value;
    const movieDesc = document.getElementById('movieDesc').value;
    const releaseDate =document.getElementById('releaseDate').value.toString();
    const trailer = document.getElementById('trailer').value;

    fetch('http://localhost:3000/movie/update/'+movie_id, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            movieName:movieName,
            movieDesc:movieDesc,
            releaseDate:releaseDate,
            trailer:trailer
        })
    })
    .then((resp)=>resp.json())
    .then(function(data)
    {
        console.log(data);
    })
})

if(action=='delete')
{

}

