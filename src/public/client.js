let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = renderRoverInfo(state);
}


// create content
/*const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies.

                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}*/

const renderRoverInfo = (state) => {
    const roverData = state.latest_photos;
    const roverDetails = ` 
    <div id="roverInfo">
        <table>
            <tr>
                <th>Name</th>
                <td>${roverData[0].rover.name}</td>
            </tr>
            <tr>
                <th>Launch date</th>
                <td>${roverData[0].rover.launch_date}</td>
            </tr>
            <tr>
                <th>Landing date</th>
                <td>${roverData[0].rover.landing_date}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>${roverData[0].rover.status}</td>
            </tr>
            <tr>
                <th>Most recent photos taken on</th>
                <td>${roverData.slice(-1).pop().earth_date}</td>
            </tr>
        </table>
    </div>
        `;
    return roverDetails;
};


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {

getSpiritdata_frombackend();
getCuriousitydata_frombackend();
getOpportunitydata_frombackend();

})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}
// ------------------------------------------------------  API CALLS

// Example API call

const getSpiritdata_frombackend = () => {

    fetch(`http://localhost:3000/getSpiritData`)
    .then(res => res.json())
    .then((roverData) => {
    const latest_photos = roverData.latest_photos;
    updateStore(store, { latest_photos });
    render(root, store)
 
})}

const getOpportunitydata_frombackend = () => {

    fetch(`http://localhost:3000/getCuriousitytData`)
    .then(res => res.json())
    .then((roverData) => {
    const latest_photos = roverData.latest_photos;
    updateStore(store, { latest_photos });
    render(root, store)
 
})}

const getCuriousitydata_frombackend = () => {

    fetch(`http://localhost:3000/getOpportunitytData`)
    .then(res => res.json())
    .then((roverData) => {
    const latest_photos = roverData.latest_photos;
    updateStore(store, { latest_photos });
    render(root, store)
 
})}

