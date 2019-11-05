function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

console.log(window.localStorage.getItem('user_id'));
var user_id = window.localStorage.getItem('user_id');

var url_string= window.location.href;
var url = new URL(url_string);
var screen_id = url.searchParams.get('screen_id');



var buy = document.getElementById('buy');
buy.addEventListener('click', function(){
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
        var apiurl= "http://localhost:3000/reserve/add";
    fetch(apiurl, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            screening_id:screen_id,
            user_id: user_id,
            reserve_time:dateTime
        })
    })
    .then((resp)=>resp.json())
    .then(function(response){
        fetch('http://localhost:3000/reservation/select/'+user_id+"/"+dateTime)
        .then((res)=>res.json())
        .then(function(res){
            console.log(res)
            var ticketdetails = [];
             for(let i=0; i<seatdetails.length; i++)
            {
                var screenres = {reservation_id:res, screen_id:screen_id, seat_no:seatdetails[i]};
                ticketdetails.push(screenres);
            }
            fetch('http://localhost:3000/seat/add', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(ticketdetails)
            })
            .then((resp)=>resp.json())
            .then(function(response){
                location.href='../user/printticket.html?reserve_id='+res;
            })
            .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
})