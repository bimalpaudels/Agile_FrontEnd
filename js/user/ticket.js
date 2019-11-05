function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

console.log(window.location.href.split('=').pop());
const movie_id=window.location.href.split('=').pop();
const ul = document.getElementById('screen');
const movie_img = document.getElementById('movie-img');
const screen_details = document.getElementById('screen-details');
const url = 'http://localhost:3000/select_screen_by/movie_id/'+movie_id;
console.log(url);
fetch(url)
.then((resp)=>resp.json())
.then(function(data){
  let screens = data;
 let img = createNode('img');
  img.src="../../BackEnd/public/images/movie/"+screens[0].imageName;
  movie_img.innerHTML=`<span>Movie: ${screens[0].movieName}</span>`;
  append(movie_img, img);
  return screens.map(function(screen){
    console.log(screen.auditorium_id);
    console.log(screen.date);
          let li = createNode('li');
          li.setAttribute('class', 'list-group-item')
          li.innerHTML=`<span><a href='#'>${screen.date} ${screen.time}</a></span>
                                  <span id='audi_id' style='display:none'>${screen.auditorium_id}</span>
                                  <span id='screen_id' style='display:none'>${screen.screening_id}</span>`;
    //     auditorium_id= createNode('input'),
    //     span=createNode('span'),
    
    //     screen_id = createNode('p');
    //     auditorium_id.type='hidden';

    //     span.innerHTML=`${screen.date} ${screen.time}`;
    //     auditorium_id.innerHTML=`${screen.auditorium_id}`;
    //     screen_id.innerHTML=`${screen.screening_id}`;
    //     append(li, auditorium_id);
        
    //     append(li, span);
    //     append(li, screen_id);
        append(ul, li);
  })
})
.catch(function(err){
  console.log(err);
})
