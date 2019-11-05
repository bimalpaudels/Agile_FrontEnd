window.onload = function()
{
    const register = document.getElementById("register");
    const login = document.getElementById('login');

    register.addEventListener('click', function(e){
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        //Making API request
        const url = "http://localhost:3000/user/register";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName:firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email:username,
                password:password
            })
        })
        .then((resp)=>resp.json())
        .then(function(response){
            console.log(response);
            location.href='./user.html';
        })
        .catch(error => {
            console.log(error);
        })
    });

    login.addEventListener('click', function(e){
        e.preventDefault();
        const email = document.getElementById('loginemail').value;
        const password = document.getElementById('loginpassword').value;

        //Making API request
        const url = "http://localhost:3000/user/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        })
        .then((resp)=>resp.json())
        .then(function(response){
            if(response.userdata)
            {
                if(response.userdata[0].email=='admin')
                {
                    location.href='./admin/adminDashboard.html';
                }
                else
                {
                    location.href='./user/dashboard.html?user_id='+response.userdata[0].user_id;
                }

                window.localStorage.setItem('token', response.token);
                var token = window.localStorage.getItem('token');
                console.log(token);
                window.localStorage.setItem('user_id', response.userdata[0].user_id);
                console.log(response.userdata[0].user_id);
            }
            else if(!response.userdata)
            {
                console.log('failed');
            }

        })
        .catch(error => {
            console.log(error);
        })
    })
}