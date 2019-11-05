function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById('movies');
  const main = document.getElementById('main');
  const url = 'http://localhost:3000/movies/select_all';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
      let movies = data.result;
    let details = '';
    const urlpath = '../../BackEnd/public/images/movie/';
    for(var i=0; i<movies.length; i++)
    {
      details+=`<div class='col-md-4' id='img-control'><img src="${urlpath+movies[i].imageName}">
                                                          <p id='movie-name'>${movies[i].movieName}</p>
                                                          <span id='movie_id'>${movies[i].movie_id}</span>

                                                        </div>`
    //       details += `<div class="col-md-4" data-div="${movies[i].movie_id}">
    //   <figure class="card card-product">
    //     <div class="img-wrap"><img src="${urlpath+movies[i].imageName}"></div>
    //     <figcaption class="info-wrap">
    //         <h4 class="title">${movies[i].movieName}</h4>
    //     </figcaption>
    //     <div class="bottom-wrap">
    //       <a href="" class="btn btn-sm btn-primary float-right data-add="${movies[i].movie_id}">Order Now</a>	
    //       <div class="price-wrap h5">
    //         <span class="price-new">${movies[i].movieName}</span>
    //       </div> <!-- price-wrap.// -->
    //     </div> <!-- bottom-wrap.// -->
    //   </figure>
    // </div>`;

      // details += `<div class="col-md-3" id='abc'><img src="${urlpath+movies[i].imageName}"></div>`;
    }
    main.innerHTML= details;
      // return movies.map(function(movie){
      //   console.log(movie.movieName);
      //     let li = createNode('li'),
      //     img = createNode('img'),
      //     movie_id = createNode('input'),
      //     container = createNode('div'),
      //     button= createNode('button');
      //     button.className = 'btn';
      //     container.className = 'container'
      //     button.innerHTML= 'Buy';
      //     movie_id.type='hidden';
      //     img.src="../../BackEnd/public/images/movie/"+movie.imageName;

      //     movie_id.innerHTML= `${movie.movie_id}`;
      //     append(li, movie_id);
      //     append(li, img);
      //     append(li, button);
      //     append(ul, li);
      // })
    })
  .catch(function(error) {
    console.log(error);
  });   

  