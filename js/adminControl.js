window.onload =function(){
var imageName='';
  const addMovie = document.getElementById('addMovie'); 

  addMovie.addEventListener('click', function(e){
    e.preventDefault();
      const movieName = document.getElementById('movieName').value;
      const movieDesc = document.getElementById('movieDesc').value;
      const image = document.getElementById('image').files[0];
      const releaseDate =document.getElementById('releaseDate').value.toString();
      const trailer = document.getElementById('trailer').value;
      let fd = new FormData();
      fd.append('movie', image);
      

        fetch("http://localhost:3000/upload/movie/image",{
          method:'POST',
          body:fd
        })
        .then((resp)=>resp.json())
        .then(function(result){
          imageName = result.filename;
          fetch('http://localhost:3000/movie/add', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              movieName: movieName,
              movieDesc: movieDesc,
              imageName: imageName,
              releaseDate: releaseDate,
              trailer: trailer
            })
          })
          .then((resp)=>resp.json())
          .then(function(response){
            console.log(response);
            alert('movie added successfully');
          })
          .catch(err=>console.log(err));
        })

          
  })
}