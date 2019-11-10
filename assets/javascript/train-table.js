
        $(document).ready(function(){
        
        // Initialize Firebase
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
        // Capture Button Click
        $("#add-train").on("click", function (event) {
            // prevent form from trying to submit/refresh the page
            event.preventDefault();

            // Capture User Inputs and store them into variables
            var trainNumber = $("#train-number").val().trim();
            var trainLine = $("#line").val().trim();
            var destination = $("#destination").val().trim();
            var nextArrival = $("#next-arrival").val().trim();
            var timeToArrival = $("#time-arrival").val().trim();
            var frequency = $("#frequency").val().trim();
            var platformNumber = $("#platform").val().trim();
            


        
            
         db.collection("ucbBerkeleyClass").add({
            destination,
            frequency,
            nextArrival,
            platformNumber,
            timeToArrival,
            trainLine,
            trainNumber

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $("#train-number").val("");
            $("#line").val("");
            $("#destination").val("");
            $("#next-arrival").val("");
            $("#time-arrival").val("");
            $("#frequency").val("");
            $("#platform").val("");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });  

        

        });
    });