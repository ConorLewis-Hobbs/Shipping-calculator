import { shippingData } from "/shipping-calculator.js"

const postcodeInput = document.getElementById('postcodeInput');
const result = document.getElementById('result');


export const inputHandler = function(e) {
    const value = e.target.value

    const matches = []
    const letters = value.slice(0, 2)

    for (let index = 0; index < shippingData.length; index++) {
        const current = shippingData[index]

        if (letters && letters.toUpperCase() === current.postcode.toUpperCase()) {
            matches.push(current)
            break
        }

    }

    console.log(matches)
    let place = matches[0]
    const name = place.name
    document.getElementById("name-change").innerHTML = name;
    const postcode = place.postcode
    document.getElementById("postcode-change").innerHTML = postcode;
    const price = place.price
    document.getElementById("price-change").innerHTML = `£${price}`;
    const availability = place.availability
    let availabilityTxt = availability.join(', ');
    document.getElementById("availability-change").innerHTML = availabilityTxt;

    const daysToDeliver = place.daysToDeliver
    document.getElementById("days-to-deliver-change").innerHTML = daysToDeliver;


    console.log(place)
    console.log(name)
    console.log(postcode)
    console.log(price)
    console.log(availability)
    console.log(daysToDeliver)

    // Get the name of the weekday (not just a number)
    const d = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // get todays date
    let day = days[d.getDay()];
    let dayNub = [d.getDay()]
    console.log(day)
    console.log(dayNub)

    for (let beans = 0; beans < availability.length; beans++) {
        if (availability.indexOf(day) >= 0) {
            document.getElementById("can-be-delivered").innerHTML = ("Your package can be sent today!");
            console.log("yay")
            break
        } else {
            document.getElementById("can-be-delivered").innerHTML = ("Your package will be sent on the next avalible day");
            console.log("nay")
        }
    }

    const deliveryDate = new Date();
    const numberOfDaysToAdd = daysToDeliver;
    const result = deliveryDate.setDate(deliveryDate.getDate() + numberOfDaysToAdd);
    const displayDate = new Date(result);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    document.getElementById("will-arrive-in").innerHTML = displayDate.toDateString("en-UK", options);
    console.log(new Date())
}

postcodeInput.addEventListener('input', inputHandler);
postcodeInput.addEventListener('propertychange', inputHandler);