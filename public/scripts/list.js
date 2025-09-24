const listEl = document.getElementById('events-list')

async function fetchEvents() {
  const res = await fetch('/events')
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

function createCard(event) {
  const card = document.createElement('article')
  card.className = 'card'
  card.innerHTML = `
    <a href="/events/${event.id}">
      <img src="${event.image}" alt="${event.name}" style="max-width:100%; height:180px; object-fit:cover;">
      <div class="card-body">
        <h3>${event.name}</h3>
        <p>Price: $${event.pricePoint.toFixed(2)}</p>
      </div>
    </a>
  `
  return card
}

async function render() {
  try {
    const events = await fetchEvents()
    listEl.innerHTML = ''
    const grid = document.createElement('div')
    grid.className = 'grid' // Pico grid

    events.forEach(ev => {
      const card = createCard(ev)
      grid.appendChild(card)
    })

    listEl.appendChild(grid)
  } catch (err) {
    listEl.innerHTML = `<p class="error">${err.message}</p>`
  }
}

render()
