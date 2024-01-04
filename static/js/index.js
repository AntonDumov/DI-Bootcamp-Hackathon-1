function getVEvents() {
    return volunteerEvents
}

function addVEvent(shortDescription, longDescription, datetime, location, imageFile) {
    const imageBase64 =
        volunteerEvents.push({
            shortDescription: shortDescription,
            longDescription: longDescription,
            datetime: datetime,
            location: location,
            image: `data:image/png;base64, ${getBase64(imageFile)}`
        })
}

function refreshEvents() {
    const vEvents = getVEvents()
    renderEvents(vEvents)
}

function renderEvents(vEvents) {
    const vEventsContainer = document.querySelector('#eventsContainer')
    vEventsContainer.innerHTML = ''
    vEvents.forEach(vEvent => {
        vEventsContainer.innerHTML += `<div class="col"><div class="card h-100 v-event-card" data-event-id="${vEvent.id}">
    <img src="${vEvent.image}" class="card-img-top" alt="image">
    <div class="card-body">
        <h5 class="card-title">${vEvent.shortDescription}</h5>
        <p class="card-text">${vEvent.longDescription}</p>
        <a href="#" id="eventAddButton" class="btn btn-primary">I'll go!</a>
    </div>
</div></div>`
    })
}

function getBase64(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL()
        reader.onload = () => {
            resolve(reader.result)
        }
    })
}

window.addEventListener("load", () => {
    renderEvents(getVEvents())
})