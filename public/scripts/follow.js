
function followUser(fields) {
    fetch(`/api/follows?followedUser=${fields.user}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
    fetch(`/api/follows?followedUser=${fields.user}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

