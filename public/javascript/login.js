const options = document.querySelector('.other-options');
const formUser = document.querySelector('#formUser');
const formNewUser = document.querySelector('#formNewUser');
const userEmailEl = document.querySelector('#user-email');
const userPasswordEl = document.querySelector('#user-password');
const newUsernameEl = document.querySelector('#newuser-name');
const newUserEmailEl = document.querySelector('#newuser-email');
const newUserPasswordEl = document.querySelector('#newuser-password');


// Switches between form types
function switchForms(event) {

    event.preventDefault();

    if(options.innerHTML === '<a href="">New User? - Click Here</a>') {
        options.innerHTML = '<a href="">Already a user? - Click Here</a>';
        formUser.style.display = "none";
        formNewUser.style.display = "flex";
        newUsernameEl.value = "";
        newUserEmailEl.value = "";
        newUserPasswordEl.value = "";
        newUsernameEl.focus();
    } else {
        options.innerHTML = '<a href="">New User? - Click Here</a>';
        formUser.style.display = "flex";
        formNewUser.style.display = "none";
        userEmailEl.value = "";
        userPasswordEl.value = "";
        userEmailEl.focus();
    }

}
async function newuserLoginForm(event) {
    event.preventDefault();
    const user_name = newUsernameEl.value.trim();
    const email = newUserEmailEl.value.trim();
    const password = newUserPasswordEl.value.trim();

    if(user_name && email && password ) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok){ 
            console.log('success');
        }
        else {
            alert(response.statusText);
        }
    }
}
async function userLoginForm(event) {
    event.preventDefault();
    const email = userEmailEl.value.trim();
    const password = userPasswordEl.value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type':'application/json'}
        })

        if(response.ok){
            console.log('success')
        } 
        else {
            alert(response.statusText);
        } 
    }
}

options.addEventListener('click', switchForms);
formUser.addEventListener('submit', userLoginForm);
formNewUser.addEventListener('submit', newuserLoginForm);
