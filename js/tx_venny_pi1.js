
$(function () {
	
	function getArrayFromArea(areaID) {
		var lines = $("#"+areaID).val().split("\n");
		var table = new Array();
		for (var lindex in lines) {
			table.push(lines[lindex]);
		}
		return (table);
	}

	function updateVenny() {
		var seriesTable = new Array();
		if ($("#area1").val() != "") {
			seriesTable.push({
				name: $("#name1").val(),
				data: getArrayFromArea("area1")
			});
		}
                if ($("#area2").val() != "") { 
                        seriesTable.push({   
                                name: $("#name2").val(),
                                data: getArrayFromArea("area2")
                        });
                }
                if ($("#area3").val() != "") { 
                        seriesTable.push({   
                                name: $("#name3").val(),
                                data: getArrayFromArea("area3")
                        });
                }
                if ($("#area4").val() != "") { 
                        seriesTable.push({   
                                name: $("#name4").val(),
                                data: getArrayFromArea("area4")
                        });
                }
                if ($("#area5").val() != "") { 
                        seriesTable.push({   
                                name: $("#name5").val(),
                                data: getArrayFromArea("area5")
                        });
                }

		$("#venny-container").venny({
			series: seriesTable,
			exporting: true,
			fnClickCallback: function() {
            			var value = "";
 				if (this.listnames.length == 1) {
            				value += "Elements only in ";
            			} else {
            				value += "Common elements in ";
            			}
            			for (name in this.listnames) {
            				value += this.listnames[name] + " ";
            			}
            			value += ":\n";
            			for (val in this.list) {
            				value += this.list[val] + "\n";
            			}
            			$("#names").val(value);
            		}
		});


	}

	$("#setexample").click(function() {
		$("#name1").val("Actors");
		$("#area1").val("Marilyn Monroe\nArnold Schwarzenegger\nJack Nicholson\nBarbra Streisand\nRobert de Niro\nDean Martin\nHarrison Ford");
		$("#name2").val("Singers");
		$("#area2").val("Freddy Mercury\nBarbra Streisand\nDean Martin\nRicky Martin\nCeline Dion\nMarilyn Monroe");
		updateVenny();
	});



	$('[id^="clear"]').click(function() {
		var index = $(this).attr("id").split("_")[1];
		$("#area" + index).val("");
		$("#name" + index).val("List " + index);
		updateVenny();
	});
	

	// update the view when any fields change
	$("[id^=name]").change(function() {
		updateVenny();
	});
	$("[id^=area]").change(function() {
                updateVenny();
        });

	// first init of the venny plugin
	$("#venny-container").venny({ series: [] });

});
