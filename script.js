$(function() {
	var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

	IN.Event.on(IN, "auth", function() {
		IN.API.Raw("/people/~:(picture-urls::(original),public-profile-url,firstName,lastName,headline,num-connections,num-connections-capped,summary,specialties,positions)").result(function (data) {
			if (data.pictureUrls._total != 0) {
				$("#profil img").attr("src", data.pictureUrls.values[0]);
				$("#profil img").show();
			}
			$("#profil-text h1").text(data.firstName + " " + data.lastName);
			$("#profil-text h3").text(data.headline);
			$("#profil-text a").attr("href", data.publicProfileUrl);
			$("#profil-text #num-connections").text(data.numConnections + (data.numConnectionsCapped ? "+" : ""));
			$("#profil").show();
			
			if (data.summary) {
				$("#summary pre").text(data.summary);
				$("#summary").show();
			}
			
			if (data.positions._total != 0) {
				var positions = data.positions.values[0];
				$("#positions .startDate").text(months[positions.startDate.month-1] + " " + positions.startDate.year);
				if (positions.isCurrent)
					$("#positions .endDate").text("aujourd'hui");
				else
					$("#positions .endDate").text(months[positions.endDate.month-1] + " " + positions.endDate.year);
				$("#positions .company").text(positions.company.name);
				if (positions.location.name)
					$("#positions .location").text("(" + positions.location.name + ")");
				$("#positions pre").text(positions.summary);
				$("#positions").show();
			}
			
			if (data.specialties) {
				$("#specialties pre").text(data.specialties);
				$("#specialties").show();
			}
		});
	});
});
