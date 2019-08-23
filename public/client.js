if (accessToken) {
  const teamList = window.document.getElementById('team-list')

  fetch(`http://dev.mapping.team/api/teams?id=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if (res.ok) {
      console.log(res.json())
    }
  })
    .catch(e => {
      console.error(e)
    })
}

