function init() {
    const title_area = document.querySelector('#edit-title');
    title_area.select();
}
async function updateButtonHandler() {
    const title = document.querySelector('#edit-title').value.trim();
    const contents =  document.querySelector('#edit-contents').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'put',
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
async function deleteButtonHandler(){
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    if(!confirm("Delete this post?")){ return false; }
        
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'delete',
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok){
        document.location.replace('/dashboard');
    } 
    else {
        alert(response.statusText);
    } 
    
}

document.querySelector('#update-btn').addEventListener('click', updateButtonHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteButtonHandler);

init();