/* Global Variables */
const myURL = 'api.openweathermap.org/data/2.5/weather?zip='
const weatherApiKey = '&units=metric&appid=c8e6a2ff531245697180476d09728a50';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();



// click event to add function to HTML element
document.getElementById('generate').addEventListener('click', getYourData);

function getYourData(e) {
const areaZip = document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;



    getData(myURL, areaZip, weatherApiKey)
        .then(function (weatherData) {
            // add the data to POST request
            postData('/add', {
                    date: newDate,
                    temp: weatherData.main.temp,
                    feeling,
                })
                .then(function (newData) {

                    updateUI()
                })

        })
}


// async get func
const getData = async (myURL, areaZip, weatherApiKey) => {
        const res = await fetch("https://"+myURL+areaZip+weatherApiKey);
    try {
        const weatherData = await res.json();
               return weatherData;
    } catch (error) {
        console.log("error", error);
    }
}
// async post func
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await req.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()

        // update entry holders values
        
        document.getElementById('date').innerHTML = "Date is: "+allData.date;
        document.getElementById('temp').innerHTML = "Temp is: "+allData.temp;
        document.getElementById('content').innerHTML = "Feeling is: "+allData.userResponse;
    } catch (error) {
        console.log("error", error);
    }
};