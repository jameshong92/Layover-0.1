$(document).ready(function() {
    init()
    function init() {
        if (!store.enabled) {
            alert('Local storage is not supported by your browser. Please disabled "Private Mode", or upgrade to a modern browser')
            return
        }   
    }

    function initialize() {
          var options = {
                types: ['(cities)'],
            };

          var input = document.getElementById('location-input');

          var autocomplete = new google.maps.places.Autocomplete(input, options);
       }
       google.maps.event.addDomListener(window, 'load', initialize);  


 		$('.input-daterange').datepicker({
                            format: 'yyyy-mm-dd',
                            startDate: (new Date()).toString()
					        // orientation: "bottom auto"	
                            })





        // Iterate through all the stored itineraries and display them using jquery

        //Assuming I am in a for loop and that i am dealing with an intinerary object: 
           
        // var itID = 

        var $itineraries = $('<div id="listOfItin"></div>');

        store.forEach(function(itID, value) {
           
            var itObject = store.get(itID);
            //alert(itObject);
            var cityN = itObject.city;
            var countryN = itObject.country;
            var startDate = itObject.startD;
            var endDate = itObject.endD;

            var $itineraryHTML = $('<a href="day.html?id='+ itID +'" class="smoothScroll"><div class="itinerary">' +cityN +', '+countryN +" · " +'<span class="small light">' + startDate + ' -' + endDate + '</span></a><button type="button"  id=' +itID +' class="btn btn-danger btn-small delete-button "><span class="glyphicon glyphicon-remove"></span></button></div>')
            $itineraries.append($itineraryHTML);

        });

        $("#itineraries").html($itineraries);
        //end for loop


        $('.delete-button').click(function(){
            // console.log($(this).attr("id"));
	            var id = $(this).attr("id");

	            			alert(id);

            store.remove(id);
            window.location.reload(true);

        });


        $('#add-button').click(function(){
            //here the add button is called, I want to get the information
            //from the add button to create a new itinerary 

            var location = $("#location-input").val();

            var locID = location.replace(" ", "_");
            locID = locID.replace(",", "");

            var res = location.split(",");

            var cityName = res[0];
            var countryName  = res[1];



            var startDate = $("#from-input").val();
            var endDate = $("#to-input").val();

            var sDate = new Date(startDate);
            var eDate = new Date(endDate);

            var startDay = sDate.getDate();
            var startMonth = sDate.getMonth()
            var startYear = sDate.getFullYear();

            var endDay = eDate.getDate();
            var endMonth = eDate.getMonth()
            var endYear = eDate.getFullYear();


            //We need to get the dates from here and save it as day, month, and year


            var itineraryID = locID+startDay+startMonth+startYear+endDay+endMonth+endYear;
            var arrayofEvents = new Array();

            console.dir(locID);


            store.set(itineraryID, {city: cityName, country: countryName, 
            sDay: startDay, sMonth: startMonth, sYear: startYear, 
            eDay: endDay, eMonth: endMonth, eYear: endYear, startD: startDate, endD: endDate, 
            events: arrayofEvents });

            window.location = 'day.html?id=' + itineraryID;

        });



});
