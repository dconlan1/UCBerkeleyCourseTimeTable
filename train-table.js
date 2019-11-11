var firebaseConfig = {
    apiKey: "AIzaSyCRyOzx6jQCzU0Yi-T4_qqxv3jD0fMa8MY",
    authDomain: "test-app-one-142c8.firebaseapp.com",
    databaseURL: "https://test-app-one-142c8.firebaseio.com",
    projectId: "test-app-one-142c8",
    storageBucket: "test-app-one-142c8.appspot.com",
    messagingSenderId: "814569379236",
    appId: "1:814569379236:web:2601278a68031717a45d31",
    measurementId: "G-M5E2WC4Y6H"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
$(document).ready(function () {

    retrieveData();

    // Capture Button Click
    $("#add-train").on("click", function (event) {
        // prevent form from trying to submit/refresh the page
        event.preventDefault();

        // Capture User Inputs and store them into variables
        var trainNumber = $("#train-number").val().trim();
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var frequency = $("#frequency").val().trim();
        var firstDeparture = $("#first-departure").val().trim();

        //push these variables up to the firebase db called ucbBerkeleyClass
        db.collection("ucbBerkeleyClass").add({
            trainNumber,
            trainName,
            destination,
            frequency,
            firstDeparture,

        })
            .then(function (docRef) {
                retrieveData();
                console.log("Document written with ID: ", docRef.id);
                $("#train-number").val("");
                $("#train-name").val("");
                $("#destination").val("");
                $("#frequency").val("");
                $("#first-departure").val("");

            })
            .catch(function (error) {
                alert("Error adding document: ", error);
            });
    });
});

function retrieveData() {
    db.collection("ucbBerkeleyClass").get().then((querySnapshot) => {
        $('#train-rows').html('')
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            var returnedDoc = doc.data();
            $("#template").clone().attr("id", doc.id).appendTo("#train-rows");
            $(`#${doc.id} .train-number`).html(returnedDoc.trainNumber);
            $(`#${doc.id} .train-name`).html(returnedDoc.trainName);
            $(`#${doc.id} .destination`).html(returnedDoc.destination);
            $(`#${doc.id} .frequency`).html(returnedDoc.frequency);
            var currentTime = moment();

//document.getElementByID("my-time").innerHTML = currentTime;

            var firstDeparture = moment(returnedDoc.firstDeparture)
            var difference = currentTime.diff(firstDeparture, "minutes");
            console.log(currentTime);
            console.log(firstDeparture);
            console.log(diff);
            $(`#${doc.id} .next-arrival`).html("something");
            $(`#${doc.id} .minutes-away`).html("anything");
        });
    });
}
var currentTime = moment();
console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));
view.updateCurrentTime();
	setInterval(function() {view.updateCurrentTime()}, 1000);
//updateCurrentTime: () => {
    $('.currentTime').text(moment().format('h:mm:ss A'))
//}

