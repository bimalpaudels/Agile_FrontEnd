function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


var url_string= window.location.href;
var url = new URL(url_string);
var reserve_id = url.searchParams.get('reserve_id');
console.log(reserve_id);


var makeQrCode = function(ticketId, text) {
    let qrCodeHtmlId = 'ticket-' + ticketId;

    $("#tickets").append(
        `<div class="col-sm"><div id="${qrCodeHtmlId}">Ticket QR ${qrCodeHtmlId}</div></div>`
    );

    var qrcode = new QRCode(document.getElementById(qrCodeHtmlId), {
        text: text,
        width: 110,
        height: 110,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    return qrCodeHtmlId;
};


var addQrDetail = function(ticketId, moviedetails, data, seat) {
    let detail = `
<div id="qr">
  <p class="mov-date">Show Date: ${moviedetails.date}</p>
  <p class="mov-time">Show Time: ${moviedetails.time}</p>
  <p class="mov-name">Movie Name: ${moviedetails.movieName}</p>
  <p class="audi-name">Auditorium: ${data[0].auditorium_name}- - - -Seat: ${seat.seat_no}</p>
  _______________________
</div>
`;

    // adding it to the qr code
    $(`#ticket-${ticketId}`).prepend(detail);

};


var tickets=document.getElementById('tickets');
fetch('http://localhost:3000/select_seats/'+reserve_id)
.then((resp)=>resp.json())
.then(function(response){
    var seats = response;
    console.log(seats);
   
    var screen_id= seats[0].screen_id;
    fetch('http://localhost:3000/screen/select/'+screen_id)
    .then((res)=>res.json())
    .then(function(result){
        console.log(result);
        var moviedetails = result;
        fetch('http://localhost:3000/screen/select_audi/'+screen_id)
        .then((resp)=>resp.json())
        .then(function(data){
            for(let i =0; i < seats.length; i++)
            {
                // TODO: pass real ticket ID instead of `i`
                makeQrCode(seats[i].seat_reserved_id, reserve_id+" "+seats[i].seat_no);
                addQrDetail(seats[i].seat_reserved_id, moviedetails, data, seats[i]);

                // use $.append
                // document.head.appendChild(forqrcode); 
                // tickets.innerHTML+=`<div class="col-md-3" id="qr">
                //                                 <p class="mov-date">Show Date: ${moviedetails[0].date}</p>
                //                                 <p class="mov-time">Show Time: ${moviedetails[0].time}</p>
                //                                 <p class="mov-name">Movie Name: ${moviedetails[0].movieName}</p>
                //                                 <p class="audi-name">Auditorium: ${data[0].auditorium_name}- - - -Seat: ${seats[i].seat_no}</p>
                //                                 _______________________
 
                //                                 </div>

                //                                 `;
            }

        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));

})
.catch(err=>console.log(err));
// fetch('http://localhost:3000/screen/select/')