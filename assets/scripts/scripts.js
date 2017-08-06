// Global Var
// =======================================================

// Main
// ======================================================
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDKYJPGczZNZX2ywgm4--VHiYf9erZaeZ8",
    authDomain: "traintime-fb042.firebaseapp.com",
    databaseURL: "https://traintime-fb042.firebaseio.com",
    projectId: "traintime-fb042",
    storageBucket: "",
    messagingSenderId: "120590845062"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Listeners
// =======================================================

$("#add-Train").on("click", function() {
  // Get Users input
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();


  // Local temp object
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

//Upload to the database
database.ref().push(newTrain);

// console.log(newTrain.trainName);
// console.log(newTrain.destination);
// console.log(newTrain.firstTrain);
// console.log(newTrain.frequency);


// Clears text-boxes
  $('#name-input').val("");
  $('#destination-input').val("");
  $('#time-input').val("");
  $('#frequency-input').val("");

  return false;

});

// Firebase event for  adding trains to database and html
database.ref().on("child_added", function(childSnapshot){
    //Store in a var
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

//First time
var firstTimeConvert = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTimeConvert);

//current Time
var currentTime = moment();
console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

// the diffrence between times
var timeDiff = moment().diff(moment(firstTimeConvert), "minutes");
  console.log("DIFFERENCE IN TIME: " + timeDiff);

  var remainder = timeDiff % frequency;
  console.log(remainder);

  minutesToTrain = frequency - remainder;
  console.log("minutes till train: "+ minutesToTrain);

  var nextTrain = moment().add(minutesToTrain, "minutes").format("hh:mm");
  console.log("arival " + moment(nextTrain).format("hh:mm"));

  $("#train-table").append("<tr><td>" + trainName + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + nextTrain + "</td> <td>" + minutesToTrain + "</td>");

})
//Functions
// =====================================================