var interests = ["Voetbal", "Zwemmen", "Duiken", "Roeien", "India", "Motorrijden"]


$(document).ready(
	function (){
	    var m = "<ul>";

		for (i = 0; i < interests.length; i++){
	        m += '<li class="profile-checkbox" data-interests="'+ interests[i] +'">' + interests[i] + '</li>';
	    }
	    m += "</ul>";
	    document.getElementById('profile-interest').innerHTML =  m;

		 $(".profile-checkbox").click(function () {
			$(this).toggleClass('active');
		});

		$(".edit-image").click(function () {
			document.getElementById("edit-svg").style.display = "none";
			document.getElementById("save-svg").style.display = "block";
		    var parentElms = document.getElementById("profile");
		    var elms = parentElms.getElementsByTagName("p");
		    for(var i=0; elms.length > i; i++){	    

				// Hide it
		        elms[i].style.display = "none";

		        // Get its text
		        text = elms[i].innerHTML;

		       	splitted = text.split(".");
		        var countPeriod = splitted.length;
					console.log(countPeriod);

					checkBigger = 0;

					for (var e = 0; splitted.length > e; e++) {
						if (splitted[e].length >= checkBigger) {
							checkBigger = splitted[e];
						}
						else{
							break;
						}
					}
					console.log(checkBigger.length);

		        // Create an input
		        input = document.createElement("textarea");
		        input.value = text;
		        input.rows = countPeriod + 1;
		        input.cols = checkBigger.length + 8;
		        input.style.resize = "none";
		        elms[i].parentNode.insertBefore(input, elms[i]);
	    	}
		});   

		$(".save-image").click(function () {
			var parentElmsP = document.getElementById("profile");
		    var elmsP = parentElms.getElementsByTagName("p");

			var parentElmsTxt = document.getElementById("profile");
		    var elmsTxt = parentElms.getElementsByTagName("textarea");

		    

		});
	}
);
