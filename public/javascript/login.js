const options = document.querySelector('.other-options');
const formUser = document.querySelector('#formUser');
const formNewUser = document.querySelector('#formNewUser');
const usernameEl = document.querySelector('#user-name');
const userPasswordEl = document.querySelector('#user-password');
const newUsernameEl = document.querySelector('#newuser-name');
const newUserPasswordEl = document.querySelector('#newuser-password');
const pageTitleEl = document.querySelector('.page-title');


// Switches between form types
function switchForms(event) {

    event.preventDefault();

    if(options.innerHTML === '<a href="">New User? - Click Here</a>') {
        options.innerHTML = '<a href="">Already a user? - Click Here</a>';
        formUser.style.display = "none";
        formNewUser.style.display = "flex";
        newUsernameEl.value = "";
        newUserPasswordEl.value = "";
        pageTitleEl.textContent = "New User Sign-up"
        newUsernameEl.focus();
    } else {
        options.innerHTML = '<a href="">New User? - Click Here</a>';
        formUser.style.display = "flex";
        formNewUser.style.display = "none";
        usernameEl.valu = "";
        userPasswordEl.value = "";
        pageTitleEl.textContent = "User Login"
        userEmailEl.focus();
    }

}
async function newuserLoginForm(event) {
    event.preventDefault();
    const user_name = newUsernameEl.value.trim();
    const password = newUserPasswordEl.value.trim();

    if(user_name && password ) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        
        if(response.ok){ 
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}
async function userLoginForm(event) {
    event.preventDefault();
    const user_name = usernameEl.value.trim();
    const password = userPasswordEl.value.trim();

    if(user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                password
            }),
            headers: {'Content-Type':'application/json'}
        })

        if(response.ok){
            document.location.replace('/dashboard');
        } 
        else {
            alert(response.statusText);
        } 
    }
}

options.addEventListener('click', switchForms);
formUser.addEventListener('submit', userLoginForm);
formNewUser.addEventListener('submit', newuserLoginForm);
