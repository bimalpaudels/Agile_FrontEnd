function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

var url_string = window.location.href;
var url = new URL(url_string);
var movie_id = url.searchParams.get('movie_id');
console.log(movie_id);

fetch('http://localhost:3000/movie/'+movie_id)
.then((resp)=>resp.json())
.then(function(data){
    console.log(data[0].movieName);
    document.getElementById('movie_id').value=data[0].movieName;
})
.catch(err=>console.log(err));

var audi = document.getElementById('audi');
fetch('http://localhost:3000/auditoriums/select_all')
.then((resp)=>resp.json())
.then(function(data){
    let auditoriums = data.results;
    for(let i = 0; i< auditoriums.length; i++)
    {
        console.log(auditoriums[i].auditorium_name);
        let option = createNode('option');
        option.text = auditoriums[i].auditorium_name;
        option.value = auditoriums[i].auditorium_id;
        append(audi, option);
    }    
})

window.onload= function()
{
    const add_screens = document.getElementById('add_screen');
    add_screens.addEventListener('click', function(){
        fetch('http://localhost:3000/screen/add', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                movie_id:movie_id,
                auditorium_id:document.getElementById('audi').value,
                date:document.getElementById('date').value.toString(),
                time:document.getElementById('time').value.toString()
            })
        })
        .then((resp)=>resp.json())
        .then(function(data){
            console.log(data);
        })
        console.log(document.getElementById('time').value.toString());
    })
}