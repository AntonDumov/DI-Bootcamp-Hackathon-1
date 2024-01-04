function getVEvents() {
    return volunteerEvents
}

function addVEvent(shortDescription, longDescription, datetime, location, imageFile) {
    getBase64(imageFile).then(imageBase64 => {
        volunteerEvents.push({
            shortDescription: shortDescription,
            longDescription: longDescription,
            datetime: datetime,
            location: location,
            image: imageBase64
        })
        refreshEvents()
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
        reader.readAsDataURL(file)
        reader.onload = () => {
            return {
                data: resolve(reader.result),
                format: file.name.split('.').pop()
            }
        }
    })
}

window.addEventListener("load", () => {
    renderEvents(getVEvents())
})

document.querySelector('#submitEventButton').addEventListener('click', (ev) => {
    addVEvent(
        document.querySelector('#eventAddFormShortDescription').value,
        document.querySelector('#eventAddFormLongDescription').value,
        document.querySelector('#eventAddFormDatetime').value,
        document.querySelector('#eventAddFormLocation').value,
        document.querySelector('#eventAddFormImage').files[0],
    )
    refreshEvents()
})

function searchEvent(location, datetime) {
    renderEvents(getVEvents().filter(vEvent => {
        return (location === '' || vEvent.location === location) && (datetime === '' || datetime === vEvent.datetime.split('T')[0])
    }))
}

document.querySelector('#searchForm').addEventListener('submit', ev => {
    ev.preventDefault()
    searchEvent(
        document.querySelector('#searchFormText').value,
        document.querySelector('#searchFormDateStart').value
    )
})