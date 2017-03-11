var config = {
	apiKey: "AIzaSyDKVNrqIzMXlV6d6gVL6N5XgbYEg7OsxjM",
	authDomain: "trains-ce856.firebaseapp.com",
	databaseURL: "https://trains-ce856.firebaseio.com",
	storageBucket: "trains-ce856.appspot.com",
	messagingSenderId: "558772424162"
	};///END OF DATABASEOBJECT
	
	firebase.initializeApp(config);
	var database= firebase.database();
	
	$("#add-train-btn").on("click", function(){
	event.preventDefault();
	var UserTrain= $("#train-input").val().trim();
	var UserDestination=$("#destination-input").val().trim();
	var UserFirstTrainTime=moment($("#first-train-time-input").val(),"h:mm").format("HH:mm");
	var UserFrequency=$("#frequency-input").val().trim();
	var User={
	train: UserTrain,
	destination: UserDestination,
	FirstTrainTime: UserFirstTrainTime,
	frequency: UserFrequency
	}///END OF OBJECT
	database.ref().push(User);
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#first-train-time-input").val("");
	$("#frequency-input").val("");
	return false;
	})///END OF ON-CLICK FUNCTION
	database.ref().on("child_added", function(data){
	console.log(data.val());
	var UserTrain = data.val().train;
	var UserDestination=data.val().destination;
	var UserFrequency=data.val().frequency;
	
	var UserFirstTrainTime=data.val().FirstTrainTime;
	var Time = moment().format("hh:mm")
	console.log(UserFirstTrainTime)
	console.log("curr: " + Time)



	var firstTimeConverted = moment(UserFirstTrainTime , "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);
	
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("diff: " + diffTime);
	
	
	var tMod = diffTime % UserFrequency;
	console.log(tMod);
	

	var  MinutesAway = UserFrequency - tMod;
	console.log("minutes upon arrival: " +  MinutesAway + " minutes");
	


	var nextTrain = moment().add( MinutesAway, "minutes");
	console.log("arrival: " + moment(nextTrain).format("hh:mm"));

	var nextArrival = moment(nextTrain).format("hh:mm");
	$("#train-table").append("<tr><td>"+ UserTrain + "</td><td>"+ UserDestination + "</td><td>" + UserFrequency +"</td><td>"+ nextArrival +"</td><td>"+  MinutesAway +"</td></tr>" )
	})///END OF DATABASE FUNCTION