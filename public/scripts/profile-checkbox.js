$(document).ready(
	function (){

		 $(".profile-checkbox").click(function () {
			$(this).toggleClass('active');
		});

		$(".edit-image").click(function () {
			$( "div.profile" ).toggleClass( "hide" )
		    var parentElms = document.getElementById("profile");
		    var elms = parentElms.getElementsByTagName("p");
		    var elmsTxt = parentElms.getElementsByTagName("textarea");

		    for(var i = 0; elmsTxt.length > i; i++){
		    	elmsTxt[i].value = elms[i].innerHTML;
		    }

		});   

		$(".save-image").click(function () {
			var parentElmsP = document.getElementById("profile");
		    var elmsP = parentElmsP.getElementsByTagName("p");

			var parentElmsTxt = document.getElementById("profile");
		    var elmsTxt = parentElmsTxt.getElementsByTagName("textarea");
		    for(var t=0; elmsP.length > t; t++){	
		    	elmsP[t].innerHTML = elmsTxt[t].value;
		    }
			$( "div.profile" ).toggleClass( "hide" )

		});
	}
);
