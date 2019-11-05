

window.onload=function(){

    function createNode(element) {
        return document.createElement(element);
    }
    
    function append(parent, el) {
      return parent.appendChild(el);
    }
    var url_string = window.location.href;
var url = new URL(url_string);
var audi_id = url.searchParams.get('audi_id');
console.log(audi_id);


//fetch auditorium name by ID
fetch('http://localhost:3000/auditorium/select_by_id/'+audi_id)
.then((resp)=>resp.json())
.then(function(resp){
    console.log(resp[0].auditorium_name);
    document.getElementById('auditorium').value=resp[0].auditorium_name;
})


//Add seats to auditorium
var add_seats= document.getElementById('add_seats');
add_seats.addEventListener('click', function(){
    fetch('http://localhost:3000/seat/add',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        row: document.getElementById('row').value,
        seat_no: document.getElementById('no_of_seats').value,
        auditorium_id:audi_id
    })
})
    .then((resp)=>resp.json())
    .then(function(resp){
        console.log(resp);
    })
    .catch(err=>console.log(err));

})

var ul = document.getElementById('forseats');

fetch('http://localhost:3000/seat/select_by_audi_id/'+audi_id)
.then((resp)=>resp.json())
.then(function(resp){
    let seats = resp.results;
    console.log(seats);
    for(let i=0; i<seats.length; i++)
    {
        let li = createNode('li'),
            span=createNode('span');
            span.innerHTML =   `${seats[i].seat_no}`;
            append(li, span);
            append(ul, li);

    }

})
}