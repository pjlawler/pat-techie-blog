function init(){
    document.querySelector('#edit-title').focus();
}

async function addButtonHandler() {
    console.log('click');
    const title = document.querySelector('#edit-title').value.trim();
    const contents =  document.querySelector('#edit-contents').value.trim();
    
    
    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title: title,
            contents: contents
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

document.querySelector('#add-btn').addEventListener('click', addButtonHandler);

init();
