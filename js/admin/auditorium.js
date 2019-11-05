function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

window.onload = function(){
    const addAuditorium = document.getElementById('add_auditorium');
    addAuditorium.addEventListener('click', function(){
        const auditoriumName = document.getElementById('auditorium_name').value;
        
        const url = "http://localhost:3000/auditorium/add";
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                auditorium_name:auditoriumName
            })
        })
        .then((resp)=>resp.json())
        .then(function(response){
            console.log(response);
            location.reload();
        })
    });

    var table = document.getElementById('auditoriums');
    fetch('http://localhost:3000/auditoriums/select_all')
    .then((resp)=>resp.json())
    .then(function(data){
        var audis = data.results;
        return audis.map(function(audi){
            var tr = createNode('tr');
            tr.innerHTML = "<td>"+ audi.auditorium_id + "</td>"+
                                    "<td>"+ audi.auditorium_name+ "</td>"+
                                    "<td><a href ='./seats.html?audi_id="+audi.auditorium_id+"'>Add Seats</a></td>";
            append(table, tr);
        })
    })
}