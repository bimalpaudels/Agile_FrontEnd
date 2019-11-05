console.log(window.location.href.split('=').pop());
const movie_id=window.location.href.split('=').pop();

const url = 'http://localhost:3000/movie/'+movie_id;
fetch(url)
.then((resp)=>resp.json())
.then(function(response){
    console.log(response);
})
.catch(err=>console.log(err));