if (accessToken) {
  const teamList = window.document.getElementById('team-list')

  fetch(`https://dev.mapping.team/api/teams?osmId=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
  })
    .then(data => {
      if (data.length === 0) {
        teamList.innerHTML = 'You don\'t have any teams yet! Go to <a href="https://dev.mapping.team">dev.mapping.team</a> to find a community.'

      } else {
        data.forEach(team => {
          var item = document.createElement('li')
          item.innerHTML = `<a href="https://dev.mapping.team/teams/${team.id}">${team.name}</a>`
          teamList.appendChild(item)
        })

      }
    })
    .catch(e => {
      console.error(e)
    })
}

