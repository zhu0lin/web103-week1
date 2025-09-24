const detailEl = document.getElementById('event-detail')

function getEventIdFromPath() {
  const parts = window.location.pathname.split('/')
  return parseInt(parts[parts.length - 1], 10)
}

async function fetchEvents() {
  const res = await fetch('/events')
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

async function render() {
  try {
    const id = getEventIdFromPath()
    const events = await fetchEvents()
    const ev = events.find(e => e.id === id)
    if (!ev) {
      detailEl.innerHTML = '<p>Event not found.</p>'
      return
    }

    detailEl.innerHTML = `
      <header>
        <h2>${ev.name}</h2>
        <p>Price: $${ev.pricePoint.toFixed(2)}</p>
      </header>
      <img src="${ev.image}" alt="${ev.name}" style="max-width:100%; height:360px; object-fit:cover; margin: 1rem 0;">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a sample description for the event.</p>
    `
  } catch (err) {
    detailEl.innerHTML = `<p class="error">${err.message}</p>`
  }
}

render()
