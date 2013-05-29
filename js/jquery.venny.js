/***************************************************************
*  Copyright notice
*
*  (c) 2011 PF bioinformatique de Toulouse
*  All rights reserved
* 
*
*  This script is an adaptation of the venny script developed by
*  Juan Carlos Oliveros, BioinfoGP, CNB-CSIC:
*  Oliveros, J.C. (2007) VENNY. An interactive tool for comparing 
*  lists with Venn Diagrams.
*  http://bioinfogp.cnb.csic.es/tools/venny/index.html.
*  It is distributed under the terms of the GNU General Public 
*  License as published by the Free Software Foundation; either 
*  version 2 of the License, or (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/
(function($) {
	$.fn.venny = function(options) {
        var defaults = {
            series: [{
            	name: 'Actors',
            	data: ["Marilyn Monroe", "Arnold Schwarzenegger", "Jack Nicholson", "Barbra Streisand", "Robert de Niro", "Dean Martin", "Harrison Ford"]
            }, {
            	name: 'Singers',
            	data: ["Freddy Mercury", "Barbra Streisand", "Dean Martin", "Ricky Martin", "Celine Dion", "Marilyn Monroe"]
            }],
            //series: [{
            //	name: 'sample1',
            //	data: ["Otu1", "Otu2", "Otu3", "Otu4", "Otu5", "Otu6", "Otu7"],
            //	values: [5, 15, 250, 20, 23, 58, 89]
            //}, {
            //	name: 'sample2',
            //	data: ["Otu1", "Otu2", "Otu5", "Otu7", "Otu8", "Otu9"],
            //	values: [90, 300, 10, 2, 45, 9]
            //}],
            //series: [{
            //	name: {A: 'List 1',
            //         B: 'List 2',
            //         C: 'List 3',
            //         D: 'List 4'},
            //	data: {A: 340, B: 562, C: 620, D: 592,
            //         AB: 639, AC: 456, AD: 257, BC: 915,
            //         BD: 354, CD: 143, ABC: 552, ABD: 578,
            //         ACD: 298, BCD: 613, ABCD: 148}
            //}],
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
            	alert(value);
            },
            disableClick: false,
            useValues: false,
            exporting:false
        };  
		var opts = $.extend(defaults, options); 


		function drawEllipse(ctx, x, y, r, w, h, a, strokecolor, fillcolor) {
			var canvas = $(document)[0].getElementById("canvasEllipse"); 
			var context = canvas.getContext("2d");
			context.beginPath();
			context.save();
			context.translate(x, y);
			context.rotate(a*Math.PI/180);
			context.scale(w, h);
			context.arc(0, 0, r, 0, Math.PI * 2);
		  	context.lineWidth = 0.1;
		  	context.strokeStyle = strokecolor;
		  	context.fillStyle = fillcolor;
		  	context.stroke();
		  	context.fill();
			context.restore();
		};
		
		function placeObjects(vennSize) {
			green = "rgba(0,102,0,0.5)";
			green2 = "rgba(0,102,0,0.75)";
			red = "rgba(241,90,96,.5)";
			red2 = "rgba(241,90,96,.75)";
			blue = "rgba(90,155,212,.5)";
			blue2 = "rgba(90,155,212,.75)";
			yellow = "rgba(250,250,91,.5)";
			yellow2 = "rgba(250,250,91,.75)";
			orange = "rgba(255, 117, 0, 0.5)";
			orange2 = "rgba(255, 117, 0, 0.75)";
			
			if (vennSize == 5) {
				
				drawEllipse(1,214,230,10,18.6,9.5,25,green2,green);
				drawEllipse(1,232,187,10,18.6,9.5,98,blue2,blue);
				drawEllipse(1,273,196,10,18.6,9.5,170,red2,red);
				drawEllipse(1,282,238,10,18.6,9.5,62,yellow2,yellow);
				drawEllipse(1,242,260,10,18.6,9.5,134,orange2,orange);
				
				$("#label1").css("left", 0).css("top", 100).css("color", "#228B22");
				$("#label2").css("left", 140).css("top", 15).css("color", "#3366BB");
				$("#label3").css("left", 450).css("top", 120).css("color", "#99334E");
				$("#label4").css("left", 410).css("top", 350).css("color", "#FFD700");
				$("#label5").css("left", 40).css("top", 400).css("color", "#FFA54F");
				$("#resultC10000").css("left", 60).css("top", 150);
				$("#resultC01000").css("left", 230).css("top", 30);
				$("#resultC00100").css("left", 420).css("top", 150);
				$("#resultC00010").css("left", 350).css("top", 370);
				$("#resultC00001").css("left", 130).css("top", 370);
				$("#resultC11000").css("left", 151).css("top", 120).addClass("small-number");
				$("#resultC10100").css("left", 110).css("top", 200);
				$("#resultC10010").css("left", 350).css("top", 295);
				$("#resultC10001").css("left", 125).css("top", 275).addClass("small-number");
				$("#resultC01100").css("left", 305).css("top", 97).addClass("small-number");
				$("#resultC01010").css("left", 205).css("top", 85);
				$("#resultC01001").css("left", 195).css("top", 345);
				$("#resultC00110").css("left", 380).css("top", 235).addClass("small-number");
				$("#resultC00101").css("left", 355).css("top", 140);
				$("#resultC00011").css("left", 262).css("top", 350).addClass("small-number");
				$("#resultC11100").css("left", 145).css("top", 180);
				$("#resultC11010").css("left", 167).css("top", 118).addClass("small-number");
				$("#resultC11001").css("left", 180).css("top", 300);
				$("#resultC10110").css("left", 365).css("top", 250).addClass("small-number");
				$("#resultC10101").css("left", 127).css("top", 260).addClass("small-number");
				$("#resultC10011").css("left", 305).css("top", 300);
				$("#resultC01110").css("left", 240).css("top", 110);
				$("#resultC01101").css("left", 317).css("top", 112).addClass("small-number");
				$("#resultC01011").css("left", 248).css("top", 342).addClass("small-number");
				$("#resultC00111").css("left", 340).css("top", 180);
				$("#resultC11110").css("left", 180).css("top", 140);
				$("#resultC11101").css("left", 160).css("top", 250);
				$("#resultC11011").css("left", 250).css("top", 310);
				$("#resultC10111").css("left", 330).css("top", 240);
				$("#resultC01111").css("left", 290).css("top", 140);
				$("#resultC11111").css("left", 245).css("top", 210);
			} else if (vennSize == 4) {	
				
				drawEllipse(1,181,238,10,18.5,11.5,40,green2,green);
				drawEllipse(1,242,177,10,18.5,11.5,40,blue2,blue);
				drawEllipse(1,259,177,10,18.5,11.5,140,red2,red);
				drawEllipse(1,320,238,10,18.5,11.5,140,yellow2,yellow);
				
				$("#label1").css("left", 5).css("top", 80).css("color", "#228B22");
				$("#label2").css("left", 85).css("top", 5).css("color", "#3366BB");
				$("#label3").css("left", 380).css("top", 5).css("color", "#99334E");
				$("#label4").css("left", 450).css("top", 80).css("color", "#FFD700");
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC10000").css("left", 55).css("top", 190);
				$("#resultC01000").css("left", 140).css("top", 60);
				$("#resultC00100").css("left", 320).css("top", 60);
				$("#resultC00010").css("left", 420).css("top", 190);
				$("#resultC00001").css("left", -1000).css("top", -2200);
				$("#resultC11000").css("left", 105).css("top", 120);
				$("#resultC10100").css("left", 120).css("top", 260);
				$("#resultC10010").css("left", 235).css("top", 340);
				$("#resultC10001").css("left", -1000).css("top", -2200);
				$("#resultC01100").css("left", 235).css("top", 90);
				$("#resultC01010").css("left", 350).css("top", 260);
				$("#resultC01001").css("left", -1000).css("top", -2200);
				$("#resultC00110").css("left", 370).css("top", 120);
				$("#resultC00101").css("left", -1000).css("top", -2200);
				$("#resultC00011").css("left", -1000).css("top", -2200);
				$("#resultC11100").css("left", 160).css("top", 170);
				$("#resultC11010").css("left", 300).css("top", 290);
				$("#resultC11001").css("left", -1000).css("top", -2200);
				$("#resultC10110").css("left", 170).css("top", 290);
				$("#resultC10101").css("left", -1000).css("top", -2200);
				$("#resultC10011").css("left", -1000).css("top", -2200);
				$("#resultC01110").css("left", 310).css("top", 170);
				$("#resultC01101").css("left", -1000).css("top", -2200);
				$("#resultC01011").css("left", -1000).css("top", -2200);
				$("#resultC00111").css("left", -1000).css("top", -2200);
				$("#resultC11110").css("left", 235).css("top", 220);
				$("#resultC11101").css("left", -1000).css("top", -2200);
				$("#resultC11011").css("left", -1000).css("top", -2200);
				$("#resultC10111").css("left", -1000).css("top", -2200);
				$("#resultC01111").css("left", -1000).css("top", -2200);
				$("#resultC11111").css("left", -1000).css("top", -2200);
			} else if (vennSize == 3) {
				
				drawEllipse(1,171,142,140,1,1,0,green2,green);
				drawEllipse(1,327,142,140,1,1,0,blue2,blue);
				drawEllipse(1,249,271,140,1,1,0,red2,red);
				
				$("#label1").css("left", 10).css("top", 0).css("color", "#228B22");
				$("#label2").css("left", 420).css("top", 0).css("color", "#3366BB");
				$("#label3").css("left", 180).css("top", 420).css("color", "#99334E");
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC10000").css("left", 120).css("top", 100);
				$("#resultC01000").css("left", 360).css("top", 100);
				$("#resultC00100").css("left", 245).css("top", 330);
				$("#resultC00010").css("left", -1000).css("top", -2200);
				$("#resultC00001").css("left", -1000).css("top", -2200);
				$("#resultC11000").css("left", 245).css("top", 100);
				$("#resultC10100").css("left", 170).css("top", 220);
				$("#resultC10010").css("left", -1000).css("top", -2200);
				$("#resultC10001").css("left", -1000).css("top", -2200);
				$("#resultC01100").css("left", 320).css("top", 220);
				$("#resultC01010").css("left", -1000).css("top", -2200);
				$("#resultC01001").css("left", -1000).css("top", -2200);
				$("#resultC00110").css("left", -1000).css("top", -2200);
				$("#resultC00101").css("left", -1000).css("top", -2200);
				$("#resultC00011").css("left", -1000).css("top", -2200);
				$("#resultC11100").css("left", 245).css("top", 175);
				$("#resultC11010").css("left", -1000).css("top", -2200);
				$("#resultC11001").css("left", -1000).css("top", -2200);
				$("#resultC10110").css("left", -1000).css("top", -2200);
				$("#resultC10101").css("left", -1000).css("top", -2200);
				$("#resultC10011").css("left", -1000).css("top", -2200);
				$("#resultC01110").css("left", -1000).css("top", -2200);
				$("#resultC01101").css("left", -1000).css("top", -2200);
				$("#resultC01011").css("left", -1000).css("top", -2200);
				$("#resultC00111").css("left", -1000).css("top", -2200);
				$("#resultC11110").css("left", -1000).css("top", -2200);
				$("#resultC11101").css("left", -1000).css("top", -2200);
				$("#resultC11011").css("left", -1000).css("top", -2200);
				$("#resultC10111").css("left", -1000).css("top", -2200);
				$("#resultC01111").css("left", -1000).css("top", -2200);
				$("#resultC11111").css("left", -1000).css("top", -2200);
			} else if (vennSize == 2) {	
				
				drawEllipse(1,171,206,140,1,1,0,green2,green);
				drawEllipse(1,327,206,140,1,1,0,blue2,blue);
				
				$("#label1").css("left", 95).css("top", 40).css("color", "#228B22");
				$("#label2").css("left", 360).css("top", 40).css("color", "#3366BB");
				$("#label3").css("left", -1000).css("top", -2200);
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC10000").css("left", 120).css("top", 195);
				$("#resultC01000").css("left", 360).css("top", 195);
				$("#resultC00100").css("left", -1000).css("top", -2200);
				$("#resultC00010").css("left", -1000).css("top", -2200);
				$("#resultC00001").css("left", -1000).css("top", -2200);
				$("#resultC11000").css("left", 250).css("top", 195);
				$("#resultC10100").css("left", -1000).css("top", -2200);
				$("#resultC10010").css("left", -1000).css("top", -2200);
				$("#resultC10001").css("left", -1000).css("top", -2200);
				$("#resultC01100").css("left", -1000).css("top", -2200);
				$("#resultC01010").css("left", -1000).css("top", -2200);
				$("#resultC01001").css("left", -1000).css("top", -2200);
				$("#resultC00110").css("left", -1000).css("top", -2200);
				$("#resultC00101").css("left", -1000).css("top", -2200);
				$("#resultC00011").css("left", -1000).css("top", -2200);
				$("#resultC11100").css("left", -1000).css("top", -2200);
				$("#resultC11010").css("left", -1000).css("top", -2200);
				$("#resultC11001").css("left", -1000).css("top", -2200);
				$("#resultC10110").css("left", -1000).css("top", -2200);
				$("#resultC10101").css("left", -1000).css("top", -2200);
				$("#resultC10011").css("left", -1000).css("top", -2200);
				$("#resultC01110").css("left", -1000).css("top", -2200);
				$("#resultC01101").css("left", -1000).css("top", -2200);
				$("#resultC01011").css("left", -1000).css("top", -2200);
				$("#resultC00111").css("left", -1000).css("top", -2200);
				$("#resultC11110").css("left", -1000).css("top", -2200);
				$("#resultC11101").css("left", -1000).css("top", -2200);
				$("#resultC11011").css("left", -1000).css("top", -2200);
				$("#resultC10111").css("left", -1000).css("top", -2200);
				$("#resultC01111").css("left", -1000).css("top", -2200);
				$("#resultC11111").css("left", -1000).css("top", -2200);
			} else {
				
				drawEllipse(1,246,210,140,1,1,0,green2,green);
				
				$("#label1").css("left", 230).css("top", 30).css("color", "#228B22");
				$("#label2").css("left", -1000).css("top", -2200);
				$("#label3").css("left", -1000).css("top", -2200);
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC10000").css("left", 240).css("top", 200);
				$("#resultC01000").css("left", -1000).css("top", -2200);
				$("#resultC00100").css("left", -1000).css("top", -2200);
				$("#resultC00010").css("left", -1000).css("top", -2200);
				$("#resultC00001").css("left", -1000).css("top", -2200);
				$("#resultC11000").css("left", -1000).css("top", -2200);
				$("#resultC10100").css("left", -1000).css("top", -2200);
				$("#resultC10010").css("left", -1000).css("top", -2200);
				$("#resultC10001").css("left", -1000).css("top", -2200);
				$("#resultC01100").css("left", -1000).css("top", -2200);
				$("#resultC01010").css("left", -1000).css("top", -2200);
				$("#resultC01001").css("left", -1000).css("top", -2200);
				$("#resultC00110").css("left", -1000).css("top", -2200);
				$("#resultC00101").css("left", -1000).css("top", -2200);
				$("#resultC00011").css("left", -1000).css("top", -2200);
				$("#resultC11100").css("left", -1000).css("top", -2200);
				$("#resultC11010").css("left", -1000).css("top", -2200);
				$("#resultC11001").css("left", -1000).css("top", -2200);
				$("#resultC10110").css("left", -1000).css("top", -2200);
				$("#resultC10101").css("left", -1000).css("top", -2200);
				$("#resultC10011").css("left", -1000).css("top", -2200);
				$("#resultC01110").css("left", -1000).css("top", -2200);
				$("#resultC01101").css("left", -1000).css("top", -2200);
				$("#resultC01011").css("left", -1000).css("top", -2200);
				$("#resultC00111").css("left", -1000).css("top", -2200);
				$("#resultC11110").css("left", -1000).css("top", -2200);
				$("#resultC11101").css("left", -1000).css("top", -2200);
				$("#resultC11011").css("left", -1000).css("top", -2200);
				$("#resultC10111").css("left", -1000).css("top", -2200);
				$("#resultC01111").css("left", -1000).css("top", -2200);
				$("#resultC11111").css("left", -1000).css("top", -2200);
			}
		}
		
		function fillListVenn() {
			var classified=new Array();
			var actualList=new Array();
			actualList[0]=new Array();
			actualList[1]=new Array();
			actualList[2]=new Array();
			actualList[3]=new Array();
			actualList[4]=new Array();
			$("*[id^=resultC]").each(function(){
				$(this).html(0);
				$(this).addClass("number-empty");
			});
			for (m=0;m<opts.series.length;m++) {
				actualList[m]=new Array();
				var list = opts.series[m].data;
				for (t=0;t<list.length;t++) {
					if (list[t].length>0) {
						if (actualList[m][list[t]]) {
							actualList[m][list[t]]++;
						} else {
							actualList[m][list[t]]=1;
						}
						classified[list[t]]="C";
					}
				}
			}
			for (t=0;t<5;t++) {
				for (tt in actualList[t]) {
					if (classified[tt]) {
						classified[tt]=classified[tt]+"1";
					}
				}
				
				for (cl in classified) {
					if (classified[cl].length<t+2) {
						classified[cl]=classified[cl]+"0";
					}
				}
			}
			for (cl in classified) {
				var value = parseInt($("#result"+classified[cl]).html());
				if (opts.useValues) {
					for (var m=0;m<opts.series.length;m++) {
						// Is the value in the list
						var index_val = opts.series[m].data.indexOf(cl);
						if (index_val != -1) {
							value += parseInt(opts.series[m].values[index_val]);
						}
					}
				} else {
					value += 1;
				}
				$("#result"+classified[cl]).html(value);
				$("#result"+classified[cl]).removeClass("number-empty");
			}
			
			// Update the labels
			if (opts.series.length == 5) {
				$("#label1").html(opts.series[0].name);
				$("#label2").html(opts.series[1].name);
				$("#label3").html(opts.series[2].name);
				$("#label4").html(opts.series[3].name);
				$("#label5").html(opts.series[4].name);
			} else if (opts.series.length == 4) {
				$("#label1").html(opts.series[0].name);
				$("#label2").html(opts.series[1].name);
				$("#label3").html(opts.series[2].name);
				$("#label4").html(opts.series[3].name);
			} else if (opts.series.length == 3) {
				$("#label1").html(opts.series[0].name);
				$("#label2").html(opts.series[1].name);
				$("#label3").html(opts.series[2].name);
			} else if (opts.series.length == 2) {
				$("#label1").html(opts.series[0].name);
				$("#label2").html(opts.series[1].name);
			} else {
				$("#label1").html(opts.series[0].name);
			}
			
			if (!opts.disableClick) {
				// Add some eventlistener
				$("*[id^=resultC]").mouseover(function(){
	            	$(this).addClass("number-over");
	            });
	            $("*[id^=resultC]").mouseout(function(){
	            	$(this).removeClass("number-over");
	            }); 
	            $("*[id^=resultC]").click(opts.fnClickCallback);
			}
            
            // Add info to the number
            $("*[id^=resultC]").each(function(){
            	this.listnames = new Array();
            	for (var i=6; i<$(this).attr("id").length; i++) {
            		if ($(this).attr("id").substring(i+1,i+2) == "1") {
            			try { this.listnames.push(opts.series[i-6].name); } catch(err) { }
            		}
            	}
				this.list = new Array();
				var cvalue = $(this).attr("id").substring(6,12);
				for (cl in classified) {
					if (classified[cl]==cvalue) {
						this.list.push(cl);
					}
				}
            });      
		}
		
		function fillCountVenn() {
			// Update values
			if (opts.series[0].data.A) { $("#resultC10000").html(opts.series[0].data.A); }
			if (opts.series[0].data.B) { $("#resultC01000").html(opts.series[0].data.B); }
			if (opts.series[0].data.C) { $("#resultC00100").html(opts.series[0].data.C); }
			if (opts.series[0].data.D) { $("#resultC00010").html(opts.series[0].data.D); }
			if (opts.series[0].data.E) { $("#resultC00001").html(opts.series[0].data.E); }
			if (opts.series[0].data.AB) { $("#resultC11000").html(opts.series[0].data.AB); }
			if (opts.series[0].data.AC) { $("#resultC10100").html(opts.series[0].data.AC); }
			if (opts.series[0].data.AD) { $("#resultC10010").html(opts.series[0].data.AD); }
			if (opts.series[0].data.AE) { $("#resultC10001").html(opts.series[0].data.AE); }
			if (opts.series[0].data.BC) { $("#resultC01100").html(opts.series[0].data.BC); }
			if (opts.series[0].data.BD) { $("#resultC01010").html(opts.series[0].data.BD); }
			if (opts.series[0].data.BE) { $("#resultC01001").html(opts.series[0].data.BE); }
			if (opts.series[0].data.CD) { $("#resultC00110").html(opts.series[0].data.CD); }
			if (opts.series[0].data.CE) { $("#resultC00101").html(opts.series[0].data.CE); }
			if (opts.series[0].data.DE) { $("#resultC00011").html(opts.series[0].data.DE); }
			if (opts.series[0].data.ABC) { $("#resultC11100").html(opts.series[0].data.ABC); }
			if (opts.series[0].data.ABD) { $("#resultC11010").html(opts.series[0].data.ABD); }
			if (opts.series[0].data.ABE) { $("#resultC11001").html(opts.series[0].data.ABE); }
			if (opts.series[0].data.ACD) { $("#resultC10110").html(opts.series[0].data.ACD); }
			if (opts.series[0].data.ACE) { $("#resultC10101").html(opts.series[0].data.ACE); }
			if (opts.series[0].data.ADE) { $("#resultC10011").html(opts.series[0].data.ADE); }
			if (opts.series[0].data.BCD) { $("#resultC01110").html(opts.series[0].data.BCD); }
			if (opts.series[0].data.BCE) { $("#resultC01101").html(opts.series[0].data.BCE); }
			if (opts.series[0].data.BDE) { $("#resultC01011").html(opts.series[0].data.BDE); }
			if (opts.series[0].data.CDE) { $("#resultC00111").html(opts.series[0].data.CDE); }
			if (opts.series[0].data.ABCD) { $("#resultC11110").html(opts.series[0].data.ABCD); }
			if (opts.series[0].data.ABCE) { $("#resultC11101").html(opts.series[0].data.ABCE); }
			if (opts.series[0].data.ABDE) { $("#resultC11011").html(opts.series[0].data.ABDE); }
			if (opts.series[0].data.ACDE) { $("#resultC10111").html(opts.series[0].data.ACDE); }
			if (opts.series[0].data.BCDE) { $("#resultC01111").html(opts.series[0].data.BCDE); }
			if (opts.series[0].data.ABCDE) { $("#resultC11111").html(opts.series[0].data.ABCDE); }
			// Update the labels
			if (opts.series[0].name.A) { $("#label1").html(opts.series[0].name.A); }
			if (opts.series[0].name.B) { $("#label2").html(opts.series[0].name.B); }
			if (opts.series[0].name.C) { $("#label3").html(opts.series[0].name.C); }
			if (opts.series[0].name.D) { $("#label4").html(opts.series[0].name.D); }
		}
		
		function getVennType() {
			// If more than 1 sample, it's a list venn
			if (opts.series.length > 1) {
				return (new Array("list", opts.series.length));
			} else {
				if (opts.series[0].name.A) {
					var count = 0;
					for (i in opts.series[0].name){ count++; }
					return (new Array("count", count));
				} else {
					return (new Array("list", opts.series.length));
				} 
			}
		}
		

		
		function addExportModule(div){
	
		}
		
		
		
        this.each(function() {
            var $t = $(this);
            //taille de ma div example
            $t.css({"width": "650px", "height": "420px"});

			var div_content = '<div id="frame" style="position: relative; left: 0pt; top: 5pt; width: 550px; height: 420px;">';
			div_content += '<canvas id="canvasEllipse" width="500" height="415"></canvas>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC00111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC10111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC01111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC11111"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(255,215,0);" id="label1"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(153,51,78);" id="label2"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(51,102,187);" id="label3"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(34,139,34);" id="label4"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(255,165,79);" id="label5"></div>';
			div_content += '</div>';
            $t.html(div_content);

            var type = getVennType();
            placeObjects(type[1]);
            if (type[0] == "list") {
            	fillListVenn();
            } else if (type[0] == "count") {
            	fillCountVenn();
            }
            
            //exporting a true
            if (opts.exporting === true){
    			var div_export = '<div id="module-export" style="position: absolute; left: 600px; top: 65px;">'
				div_export += '<canvas id="canvasExport" width="30" height="20"></canvas>';
				div_export += '<div class="styled" style="display:none;">';
				div_export += '<select id="select" style="width: 180px;height: 30px;padding: 5px;font-size: 14px;border: 1px solid #ccc;background: transparent;position:absolute;left:0px; top:20px;">';
				div_export += '<option disabled="disabled" selected="selected">Choose</option>';
				div_export += '<option value="png">Download PNG image</option>';
//				div_export += '<option value="jpeg">Download JPEG image</option>';
				div_export += '</select>';
				div_export += '</div>';
				div_export += '</div>';
				$t.append(div_export);
				
				//draw canvas button
				var canvas = $("#canvasExport")[0];
				var context = canvas.getContext("2d");
				for (i=0;i<3;i++){
					context.lineWidth = 3;
					context.beginPath();
					context.moveTo(0,2+i*7);
					context.lineTo(100,2+i*7);
					context.strokeStyle = "grey";
					context.stroke();
				}		

				var select_form = $('.styled');
				$("#canvasExport").on("click", function (event) {
					select_form.toggle();
					$(function() {
						$('#select').bind('change', function() {
							var val = $(this).val();
							if (val==='png'){
								select_form.hide();
								html2canvas($("#frame"), {
									onrendered: function(canvas) {
										var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
										window.location.href = img;
									}
								});
							}
							return false;
						});
					});
				});
            }
        });
        return this;
	};
})(jQuery);