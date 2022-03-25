const commentButtonEl = document.querySelector('#comment-button');

async function handleLeaveComment(event) {
    const comment = document.querySelector('textarea').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const user_id = 1;

    event.preventDefault();
    console.log('click')

    const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({
            comment,
            post_id,
            user_id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }

};



commentButtonEl.addEventListener('click', handleLeaveComment);