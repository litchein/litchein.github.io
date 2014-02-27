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
            exporting: true,
            hideLegend: true
        };  
		var opts = $.extend(defaults, options); 

		function drawEllipse(ctx, x, y, r, w, h, a, fillcolor) {
			var canvas = $("#canvasEllipse")[0]; 
			var context = canvas.getContext("2d");
			context.beginPath();
			context.save();
			context.translate(x, y);
			context.rotate(a*Math.PI/180);
			context.scale(w, h);
			context.arc(0, 0, r, 0, Math.PI * 2);
			context.fillStyle = fillcolor;
			context.fill();
			context.restore();
		};
		
		function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, fillcolor) {
			var canvas = $("#canvasEllipse")[0]; 
			var context = canvas.getContext("2d");
			context.beginPath();
			context.save();
			context.moveTo(x1,y1);
		    context.lineTo(x2,y2);
		    context.lineTo(x3,y3);
			context.fillStyle = fillcolor;
			context.fill();
			context.restore();
		};
		
		function drawLine(ctx, x1, y1, x2, y2, strokecolor) {
			var canvas = $("#canvasEllipse")[0]; 
			var context = canvas.getContext("2d");
		    context.lineWidth = 1;
		    context.beginPath();
		    context.moveTo(x1, y1);
		    context.lineTo(x2, y2);
			context.strokeStyle = strokecolor;
		    context.stroke();
		};
		
		function placeObjects(vennSize) {
			var green   = "rgba(0,102,0, 0.5)",
				red     = "rgba(241,90,96, 0.5)",
				blue    = "rgba(90,155,212, 0.5)",
				yellow  = "rgba(250,250,91, 0.5)",
				orange  = "rgba(255,117,0, 0.5)",
				brown   = "rgba(192,152,83, 0.5)";
			
			if (vennSize == 6) {
				drawTriangle(1, 0,11,    254,160, 174,235, green);
				drawTriangle(1, 188,0,   134,242, 236,202, blue);
				drawTriangle(1, 338,52,  135,123, 191,242, red);
				drawTriangle(1, 500,260, 163,117, 134,219, yellow);
				drawTriangle(1, 250,415, 133,150, 203,67,  orange);
				drawTriangle(1, 11,307,  263,81,  214,220, brown);
				
				$("#label1").css("left",  35).css("top",  10).css("color", "#228B22");
				$("#label2").css("left", 200).css("top",   5).css("color", "#3366BB");
				$("#label3").css("left", 335).css("top",  60).css("color", "#99334E");
				$("#label4").css("left", 410).css("top", 200).css("color", "#FFD700");
				$("#label5").css("left", 255).css("top", 385).css("color", "#FFA54F");
				$("#label6").css("left",  30).css("top", 300).css("color", "#c09853");
				$("#resultC100000").css("left",  93).css("top",  90);
				$("#resultC010000").css("left", 185).css("top",  50);
				$("#resultC001000").css("left", 275).css("top",  80);
				$("#resultC000100").css("left", 320).css("top", 205);
				$("#resultC000010").css("left", 210).css("top", 275);
				$("#resultC000001").css("left",  95).css("top", 240);
				$("#resultC111111").css("left", 185).css("top", 170);

				drawLine(1, 140, 80, 166,110, "#6ea7a8");
				$("#resultC110000").css("left",  130).css("top",  60);
				$("#resultC101000").css("left",  140).css("top", 117);
				drawLine(1,  75,180, 145,185, "#bdd76f");
				drawLine(1,  75,180,  65,175, "#bdd76f");
				$("#resultC100100").css("left",   55).css("top", 157);
				$("#resultC100010").css("left",  140).css("top", 145);
				drawLine(1,  75,200, 142,190, "#a5ab6b");
				drawLine(1,  75,200,  65,195, "#a5ab6b");
				$("#resultC100001").css("left",   55).css("top", 177);
				drawLine(1, 230, 80, 212,115, "#cf94a6");
				$("#resultC011000").css("left",  230).css("top",  60);
				$("#resultC010100").css("left",  225).css("top", 190);
				$("#resultC010010").css("left",  190).css("top",  80);
				$("#resultC010001").css("left",  143).css("top", 219);
				drawLine(1, 295,145, 235,180, "#fad486");
				$("#resultC001100").css("left",  302).css("top", 132);
				drawLine(1, 275,270, 193,233, "#fc9159");
				$("#resultC001010").css("left",  275).css("top", 268);
				$("#resultC001001").css("left",  235).css("top", 110);
				$("#resultC000110").css("left",  215).css("top", 210);
				drawLine(1,  75,220, 140,205, "#dfcb80");
				drawLine(1,  75,220,  65,215, "#dfcb80");
				$("#resultC000101").css("left",   55).css("top", 197);
				drawLine(1, 150,270, 183,230, "#dfa969");
				$("#resultC000011").css("left",  145).css("top", 268);
				opts.hideLegend = false;
				
			} else if (vennSize == 5) {
				
				drawEllipse(1,214,230,10,18.6,9.5,25,green);
				drawEllipse(1,232,187,10,18.6,9.5,98,blue);
				drawEllipse(1,273,196,10,18.6,9.5,170,red);
				drawEllipse(1,282,238,10,18.6,9.5,62,yellow);
				drawEllipse(1,242,260,10,18.6,9.5,134,orange);
				
				$("#label1").css("left", 0).css("top", 100).css("color", "#228B22");
				$("#label2").css("left", 310).css("top", 15).css("color", "#3366BB");
				$("#label3").css("left", 450).css("top", 120).css("color", "#99334E");
				$("#label4").css("left", 410).css("top", 350).css("color", "#FFD700");
				$("#label5").css("left", 40).css("top", 400).css("color", "#FFA54F");
				$("#resultC100000").css("left", 60).css("top", 150);
				$("#resultC010000").css("left", 230).css("top", 30);
				$("#resultC001000").css("left", 420).css("top", 150);
				$("#resultC000100").css("left", 350).css("top", 370);
				$("#resultC000010").css("left", 130).css("top", 370);
				$("#resultC110000").css("left", 151).css("top", 120).addClass("small-number");
				$("#resultC101000").css("left", 110).css("top", 200);
				$("#resultC100100").css("left", 350).css("top", 295);
				$("#resultC100010").css("left", 125).css("top", 275).addClass("small-number");
				$("#resultC011000").css("left", 305).css("top", 97).addClass("small-number");
				$("#resultC010100").css("left", 205).css("top", 85);
				$("#resultC010010").css("left", 195).css("top", 345);
				$("#resultC001100").css("left", 380).css("top", 235).addClass("small-number");
				$("#resultC001010").css("left", 355).css("top", 140);
				$("#resultC000110").css("left", 262).css("top", 350).addClass("small-number");
				$("#resultC111000").css("left", 145).css("top", 180);
				$("#resultC110100").css("left", 167).css("top", 118).addClass("small-number");
				$("#resultC110010").css("left", 180).css("top", 300);
				$("#resultC101100").css("left", 365).css("top", 250).addClass("small-number");
				$("#resultC101010").css("left", 127).css("top", 260).addClass("small-number");
				$("#resultC100110").css("left", 305).css("top", 300);
				$("#resultC011100").css("left", 240).css("top", 110);
				$("#resultC011010").css("left", 317).css("top", 112).addClass("small-number");
				$("#resultC010110").css("left", 248).css("top", 342).addClass("small-number");
				$("#resultC001110").css("left", 340).css("top", 180);
				$("#resultC111100").css("left", 180).css("top", 140);
				$("#resultC111010").css("left", 160).css("top", 250);
				$("#resultC110110").css("left", 250).css("top", 310);
				$("#resultC101110").css("left", 330).css("top", 240);
				$("#resultC011110").css("left", 290).css("top", 140);
				$("#resultC111110").css("left", 245).css("top", 210);				
				$("#resultC000001").css("left", -1000).css("top", -2200);
				$("#resultC100001").css("left", -1000).css("top", -2200);
				$("#resultC010001").css("left", -1000).css("top", -2200);
				$("#resultC001001").css("left", -1000).css("top", -2200);
				$("#resultC000101").css("left", -1000).css("top", -2200);
				$("#resultC000011").css("left", -1000).css("top", -2200);
				$("#resultC110001").css("left", -1000).css("top", -2200);
				$("#resultC101001").css("left", -1000).css("top", -2200);
				$("#resultC100101").css("left", -1000).css("top", -2200);
				$("#resultC100011").css("left", -1000).css("top", -2200);
				$("#resultC011001").css("left", -1000).css("top", -2200);
				$("#resultC010101").css("left", -1000).css("top", -2200);
				$("#resultC010011").css("left", -1000).css("top", -2200);
				$("#resultC001101").css("left", -1000).css("top", -2200);
				$("#resultC001011").css("left", -1000).css("top", -2200);
				$("#resultC000111").css("left", -1000).css("top", -2200);
				$("#resultC111001").css("left", -1000).css("top", -2200);
				$("#resultC110101").css("left", -1000).css("top", -2200);
				$("#resultC110011").css("left", -1000).css("top", -2200);
				$("#resultC101101").css("left", -1000).css("top", -2200);
				$("#resultC101011").css("left", -1000).css("top", -2200);
				$("#resultC100111").css("left", -1000).css("top", -2200);
				$("#resultC011101").css("left", -1000).css("top", -2200);
				$("#resultC011011").css("left", -1000).css("top", -2200);
				$("#resultC010111").css("left", -1000).css("top", -2200);
				$("#resultC001111").css("left", -1000).css("top", -2200);
				$("#resultC111101").css("left", -1000).css("top", -2200);
				$("#resultC111011").css("left", -1000).css("top", -2200);
				$("#resultC110111").css("left", -1000).css("top", -2200);
				$("#resultC101111").css("left", -1000).css("top", -2200);
				$("#resultC011111").css("left", -1000).css("top", -2200);
				$("#resultC111111").css("left", -1000).css("top", -2200);
			} else if (vennSize == 4) {	
				
				drawEllipse(1,181,238,10,18.5,11.5,40,green);
				drawEllipse(1,242,177,10,18.5,11.5,40,blue);
				drawEllipse(1,259,177,10,18.5,11.5,140,red);
				drawEllipse(1,320,238,10,18.5,11.5,140,yellow);
				
				$("#label1").css("left", 5).css("top", 70).css("color", "#228B22");
				$("#label2").css("left", 85).css("top", 5).css("color", "#3366BB");
				$("#label3").css("left", 350).css("top", 5).css("color", "#99334E");
				$("#label4").css("left", 428).css("top", 70).css("color", "#FFD700");
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC100000").css("left", 55).css("top", 190);
				$("#resultC010000").css("left", 140).css("top", 60);
				$("#resultC001000").css("left", 320).css("top", 60);
				$("#resultC000100").css("left", 420).css("top", 190);
				$("#resultC000010").css("left", -1000).css("top", -2200);
				$("#resultC110000").css("left", 105).css("top", 120);
				$("#resultC101000").css("left", 120).css("top", 260);
				$("#resultC100100").css("left", 235).css("top", 340);
				$("#resultC100010").css("left", -1000).css("top", -2200);
				$("#resultC011000").css("left", 235).css("top", 90);
				$("#resultC010100").css("left", 350).css("top", 260);
				$("#resultC010010").css("left", -1000).css("top", -2200);
				$("#resultC001100").css("left", 370).css("top", 120);
				$("#resultC001010").css("left", -1000).css("top", -2200);
				$("#resultC000110").css("left", -1000).css("top", -2200);
				$("#resultC111000").css("left", 160).css("top", 170);
				$("#resultC110100").css("left", 300).css("top", 290);
				$("#resultC110010").css("left", -1000).css("top", -2200);
				$("#resultC101100").css("left", 170).css("top", 290);
				$("#resultC101010").css("left", -1000).css("top", -2200);
				$("#resultC100110").css("left", -1000).css("top", -2200);
				$("#resultC011100").css("left", 310).css("top", 170);
				$("#resultC011010").css("left", -1000).css("top", -2200);
				$("#resultC010110").css("left", -1000).css("top", -2200);
				$("#resultC001110").css("left", -1000).css("top", -2200);
				$("#resultC111100").css("left", 235).css("top", 220);
				$("#resultC111010").css("left", -1000).css("top", -2200);
				$("#resultC110110").css("left", -1000).css("top", -2200);
				$("#resultC101110").css("left", -1000).css("top", -2200);
				$("#resultC011110").css("left", -1000).css("top", -2200);
				$("#resultC111110").css("left", -1000).css("top", -2200);
				$("#resultC000001").css("left", -1000).css("top", -2200);
				$("#resultC100001").css("left", -1000).css("top", -2200);
				$("#resultC010001").css("left", -1000).css("top", -2200);
				$("#resultC001001").css("left", -1000).css("top", -2200);
				$("#resultC000101").css("left", -1000).css("top", -2200);
				$("#resultC000011").css("left", -1000).css("top", -2200);
				$("#resultC110001").css("left", -1000).css("top", -2200);
				$("#resultC101001").css("left", -1000).css("top", -2200);
				$("#resultC100101").css("left", -1000).css("top", -2200);
				$("#resultC100011").css("left", -1000).css("top", -2200);
				$("#resultC011001").css("left", -1000).css("top", -2200);
				$("#resultC010101").css("left", -1000).css("top", -2200);
				$("#resultC010011").css("left", -1000).css("top", -2200);
				$("#resultC001101").css("left", -1000).css("top", -2200);
				$("#resultC001011").css("left", -1000).css("top", -2200);
				$("#resultC000111").css("left", -1000).css("top", -2200);
				$("#resultC111001").css("left", -1000).css("top", -2200);
				$("#resultC110101").css("left", -1000).css("top", -2200);
				$("#resultC110011").css("left", -1000).css("top", -2200);
				$("#resultC101101").css("left", -1000).css("top", -2200);
				$("#resultC101011").css("left", -1000).css("top", -2200);
				$("#resultC100111").css("left", -1000).css("top", -2200);
				$("#resultC011101").css("left", -1000).css("top", -2200);
				$("#resultC011011").css("left", -1000).css("top", -2200);
				$("#resultC010111").css("left", -1000).css("top", -2200);
				$("#resultC001111").css("left", -1000).css("top", -2200);
				$("#resultC111101").css("left", -1000).css("top", -2200);
				$("#resultC111011").css("left", -1000).css("top", -2200);
				$("#resultC110111").css("left", -1000).css("top", -2200);
				$("#resultC101111").css("left", -1000).css("top", -2200);
				$("#resultC011111").css("left", -1000).css("top", -2200);
				$("#resultC111111").css("left", -1000).css("top", -2200);
			} else if (vennSize == 3) {
				
				drawEllipse(1,171,142,120,1,1,0,green);
				drawEllipse(1,327,142,120,1,1,0,blue);
				drawEllipse(1,249,271,120,1,1,0,red);
				
				$("#label1").css("left", 55).css("top", 5).css("color", "#228B22");
				$("#label2").css("left", 380).css("top", 5).css("color", "#3366BB");
				$("#label3").css("left", 220).css("top", 400).css("color", "#99334E");
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC100000").css("left", 120).css("top", 100);
				$("#resultC010000").css("left", 360).css("top", 100);
				$("#resultC001000").css("left", 245).css("top", 330);
				$("#resultC000100").css("left", -1000).css("top", -2200);
				$("#resultC000010").css("left", -1000).css("top", -2200);
				$("#resultC110000").css("left", 245).css("top", 100);
				$("#resultC101000").css("left", 170).css("top", 220);
				$("#resultC100100").css("left", -1000).css("top", -2200);
				$("#resultC100010").css("left", -1000).css("top", -2200);
				$("#resultC011000").css("left", 320).css("top", 220);
				$("#resultC010100").css("left", -1000).css("top", -2200);
				$("#resultC010010").css("left", -1000).css("top", -2200);
				$("#resultC001100").css("left", -1000).css("top", -2200);
				$("#resultC001010").css("left", -1000).css("top", -2200);
				$("#resultC000110").css("left", -1000).css("top", -2200);
				$("#resultC111000").css("left", 245).css("top", 175);
				$("#resultC110100").css("left", -1000).css("top", -2200);
				$("#resultC110010").css("left", -1000).css("top", -2200);
				$("#resultC101100").css("left", -1000).css("top", -2200);
				$("#resultC101010").css("left", -1000).css("top", -2200);
				$("#resultC100110").css("left", -1000).css("top", -2200);
				$("#resultC011100").css("left", -1000).css("top", -2200);
				$("#resultC011010").css("left", -1000).css("top", -2200);
				$("#resultC010110").css("left", -1000).css("top", -2200);
				$("#resultC001110").css("left", -1000).css("top", -2200);
				$("#resultC111100").css("left", -1000).css("top", -2200);
				$("#resultC111010").css("left", -1000).css("top", -2200);
				$("#resultC110110").css("left", -1000).css("top", -2200);
				$("#resultC101110").css("left", -1000).css("top", -2200);
				$("#resultC011110").css("left", -1000).css("top", -2200);
				$("#resultC111110").css("left", -1000).css("top", -2200);
				$("#resultC000001").css("left", -1000).css("top", -2200);
				$("#resultC100001").css("left", -1000).css("top", -2200);
				$("#resultC010001").css("left", -1000).css("top", -2200);
				$("#resultC001001").css("left", -1000).css("top", -2200);
				$("#resultC000101").css("left", -1000).css("top", -2200);
				$("#resultC000011").css("left", -1000).css("top", -2200);
				$("#resultC110001").css("left", -1000).css("top", -2200);
				$("#resultC101001").css("left", -1000).css("top", -2200);
				$("#resultC100101").css("left", -1000).css("top", -2200);
				$("#resultC100011").css("left", -1000).css("top", -2200);
				$("#resultC011001").css("left", -1000).css("top", -2200);
				$("#resultC010101").css("left", -1000).css("top", -2200);
				$("#resultC010011").css("left", -1000).css("top", -2200);
				$("#resultC001101").css("left", -1000).css("top", -2200);
				$("#resultC001011").css("left", -1000).css("top", -2200);
				$("#resultC000111").css("left", -1000).css("top", -2200);
				$("#resultC111001").css("left", -1000).css("top", -2200);
				$("#resultC110101").css("left", -1000).css("top", -2200);
				$("#resultC110011").css("left", -1000).css("top", -2200);
				$("#resultC101101").css("left", -1000).css("top", -2200);
				$("#resultC101011").css("left", -1000).css("top", -2200);
				$("#resultC100111").css("left", -1000).css("top", -2200);
				$("#resultC011101").css("left", -1000).css("top", -2200);
				$("#resultC011011").css("left", -1000).css("top", -2200);
				$("#resultC010111").css("left", -1000).css("top", -2200);
				$("#resultC001111").css("left", -1000).css("top", -2200);
				$("#resultC111101").css("left", -1000).css("top", -2200);
				$("#resultC111011").css("left", -1000).css("top", -2200);
				$("#resultC110111").css("left", -1000).css("top", -2200);
				$("#resultC101111").css("left", -1000).css("top", -2200);
				$("#resultC011111").css("left", -1000).css("top", -2200);
				$("#resultC111111").css("left", -1000).css("top", -2200);
			} else if (vennSize == 2) {	
				
				drawEllipse(1,171,206,140,1,1,0,green);
				drawEllipse(1,327,206,140,1,1,0,blue);
				
				$("#label1").css("left", 95).css("top", 40).css("color", "#228B22");
				$("#label2").css("left", 360).css("top", 40).css("color", "#3366BB");
				$("#label3").css("left", -1000).css("top", -2200);
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC100000").css("left", 120).css("top", 195);
				$("#resultC010000").css("left", 360).css("top", 195);
				$("#resultC001000").css("left", -1000).css("top", -2200);
				$("#resultC000100").css("left", -1000).css("top", -2200);
				$("#resultC000010").css("left", -1000).css("top", -2200);
				$("#resultC110000").css("left", 250).css("top", 195);
				$("#resultC101000").css("left", -1000).css("top", -2200);
				$("#resultC100100").css("left", -1000).css("top", -2200);
				$("#resultC100010").css("left", -1000).css("top", -2200);
				$("#resultC011000").css("left", -1000).css("top", -2200);
				$("#resultC010100").css("left", -1000).css("top", -2200);
				$("#resultC010010").css("left", -1000).css("top", -2200);
				$("#resultC001100").css("left", -1000).css("top", -2200);
				$("#resultC001010").css("left", -1000).css("top", -2200);
				$("#resultC000110").css("left", -1000).css("top", -2200);
				$("#resultC111000").css("left", -1000).css("top", -2200);
				$("#resultC110100").css("left", -1000).css("top", -2200);
				$("#resultC110010").css("left", -1000).css("top", -2200);
				$("#resultC101100").css("left", -1000).css("top", -2200);
				$("#resultC101010").css("left", -1000).css("top", -2200);
				$("#resultC100110").css("left", -1000).css("top", -2200);
				$("#resultC011100").css("left", -1000).css("top", -2200);
				$("#resultC011010").css("left", -1000).css("top", -2200);
				$("#resultC010110").css("left", -1000).css("top", -2200);
				$("#resultC001110").css("left", -1000).css("top", -2200);
				$("#resultC111100").css("left", -1000).css("top", -2200);
				$("#resultC111010").css("left", -1000).css("top", -2200);
				$("#resultC110110").css("left", -1000).css("top", -2200);
				$("#resultC101110").css("left", -1000).css("top", -2200);
				$("#resultC011110").css("left", -1000).css("top", -2200);
				$("#resultC111110").css("left", -1000).css("top", -2200);
				$("#resultC000001").css("left", -1000).css("top", -2200);
				$("#resultC100001").css("left", -1000).css("top", -2200);
				$("#resultC010001").css("left", -1000).css("top", -2200);
				$("#resultC001001").css("left", -1000).css("top", -2200);
				$("#resultC000101").css("left", -1000).css("top", -2200);
				$("#resultC000011").css("left", -1000).css("top", -2200);
				$("#resultC110001").css("left", -1000).css("top", -2200);
				$("#resultC101001").css("left", -1000).css("top", -2200);
				$("#resultC100101").css("left", -1000).css("top", -2200);
				$("#resultC100011").css("left", -1000).css("top", -2200);
				$("#resultC011001").css("left", -1000).css("top", -2200);
				$("#resultC010101").css("left", -1000).css("top", -2200);
				$("#resultC010011").css("left", -1000).css("top", -2200);
				$("#resultC001101").css("left", -1000).css("top", -2200);
				$("#resultC001011").css("left", -1000).css("top", -2200);
				$("#resultC000111").css("left", -1000).css("top", -2200);
				$("#resultC111001").css("left", -1000).css("top", -2200);
				$("#resultC110101").css("left", -1000).css("top", -2200);
				$("#resultC110011").css("left", -1000).css("top", -2200);
				$("#resultC101101").css("left", -1000).css("top", -2200);
				$("#resultC101011").css("left", -1000).css("top", -2200);
				$("#resultC100111").css("left", -1000).css("top", -2200);
				$("#resultC011101").css("left", -1000).css("top", -2200);
				$("#resultC011011").css("left", -1000).css("top", -2200);
				$("#resultC010111").css("left", -1000).css("top", -2200);
				$("#resultC001111").css("left", -1000).css("top", -2200);
				$("#resultC111101").css("left", -1000).css("top", -2200);
				$("#resultC111011").css("left", -1000).css("top", -2200);
				$("#resultC110111").css("left", -1000).css("top", -2200);
				$("#resultC101111").css("left", -1000).css("top", -2200);
				$("#resultC011111").css("left", -1000).css("top", -2200);
				$("#resultC111111").css("left", -1000).css("top", -2200);
			} else {
				
				drawEllipse(1,246,210,140,1,1,0,green);
				
				$("#label1").css("left", 230).css("top", 30).css("color", "#228B22");
				$("#label2").css("left", -1000).css("top", -2200);
				$("#label3").css("left", -1000).css("top", -2200);
				$("#label4").css("left", -1000).css("top", -2200);
				$("#label5").css("left", -1000).css("top", -2200);
				$("#resultC100000").css("left", 240).css("top", 200);
				$("#resultC010000").css("left", -1000).css("top", -2200);
				$("#resultC001000").css("left", -1000).css("top", -2200);
				$("#resultC000100").css("left", -1000).css("top", -2200);
				$("#resultC000010").css("left", -1000).css("top", -2200);
				$("#resultC110000").css("left", -1000).css("top", -2200);
				$("#resultC101000").css("left", -1000).css("top", -2200);
				$("#resultC100100").css("left", -1000).css("top", -2200);
				$("#resultC100010").css("left", -1000).css("top", -2200);
				$("#resultC011000").css("left", -1000).css("top", -2200);
				$("#resultC010100").css("left", -1000).css("top", -2200);
				$("#resultC010010").css("left", -1000).css("top", -2200);
				$("#resultC001100").css("left", -1000).css("top", -2200);
				$("#resultC001010").css("left", -1000).css("top", -2200);
				$("#resultC000110").css("left", -1000).css("top", -2200);
				$("#resultC111000").css("left", -1000).css("top", -2200);
				$("#resultC110100").css("left", -1000).css("top", -2200);
				$("#resultC110010").css("left", -1000).css("top", -2200);
				$("#resultC101100").css("left", -1000).css("top", -2200);
				$("#resultC101010").css("left", -1000).css("top", -2200);
				$("#resultC100110").css("left", -1000).css("top", -2200);
				$("#resultC011100").css("left", -1000).css("top", -2200);
				$("#resultC011010").css("left", -1000).css("top", -2200);
				$("#resultC010110").css("left", -1000).css("top", -2200);
				$("#resultC001110").css("left", -1000).css("top", -2200);
				$("#resultC111100").css("left", -1000).css("top", -2200);
				$("#resultC111010").css("left", -1000).css("top", -2200);
				$("#resultC110110").css("left", -1000).css("top", -2200);
				$("#resultC101110").css("left", -1000).css("top", -2200);
				$("#resultC011110").css("left", -1000).css("top", -2200);
				$("#resultC111110").css("left", -1000).css("top", -2200);
				$("#resultC000001").css("left", -1000).css("top", -2200);
				$("#resultC100001").css("left", -1000).css("top", -2200);
				$("#resultC010001").css("left", -1000).css("top", -2200);
				$("#resultC001001").css("left", -1000).css("top", -2200);
				$("#resultC000101").css("left", -1000).css("top", -2200);
				$("#resultC000011").css("left", -1000).css("top", -2200);
				$("#resultC110001").css("left", -1000).css("top", -2200);
				$("#resultC101001").css("left", -1000).css("top", -2200);
				$("#resultC100101").css("left", -1000).css("top", -2200);
				$("#resultC100011").css("left", -1000).css("top", -2200);
				$("#resultC011001").css("left", -1000).css("top", -2200);
				$("#resultC010101").css("left", -1000).css("top", -2200);
				$("#resultC010011").css("left", -1000).css("top", -2200);
				$("#resultC001101").css("left", -1000).css("top", -2200);
				$("#resultC001011").css("left", -1000).css("top", -2200);
				$("#resultC000111").css("left", -1000).css("top", -2200);
				$("#resultC111001").css("left", -1000).css("top", -2200);
				$("#resultC110101").css("left", -1000).css("top", -2200);
				$("#resultC110011").css("left", -1000).css("top", -2200);
				$("#resultC101101").css("left", -1000).css("top", -2200);
				$("#resultC101011").css("left", -1000).css("top", -2200);
				$("#resultC100111").css("left", -1000).css("top", -2200);
				$("#resultC011101").css("left", -1000).css("top", -2200);
				$("#resultC011011").css("left", -1000).css("top", -2200);
				$("#resultC010111").css("left", -1000).css("top", -2200);
				$("#resultC001111").css("left", -1000).css("top", -2200);
				$("#resultC111101").css("left", -1000).css("top", -2200);
				$("#resultC111011").css("left", -1000).css("top", -2200);
				$("#resultC110111").css("left", -1000).css("top", -2200);
				$("#resultC101111").css("left", -1000).css("top", -2200);
				$("#resultC011111").css("left", -1000).css("top", -2200);
				$("#resultC111111").css("left", -1000).css("top", -2200);
			}
		}
		
		function addLegend(div) {
			$t = div;
			var i=1;
			var div_legend = '<div class="module-legend">';
			$("*[id^=label]").each(function(){
				div_legend += '<div id="item-'+i+'" class="leg-items" style="background-color:' + $(this).css("color") + '">';
				div_legend += '<span style="background-color:white; padding:0px 2px 0px 2px; transition: margin-left .3s ease-in-out;">off</span></div>';
				i += 1;
			});
			div_legend += '</div>';
			div_legend += '<div id="leg-res" class="number-black leg-res"></div>';
			$t.append(div_legend);
			
			$("*[id^=item]").hover(function(){
		        $(this).css('opacity', 0.75);
		        $(this).css('box-shadow',  '0px 0px 8px 1px lightgrey');
		    },function(){
		    	if($(this).children("span").text() === 'off') {
					$(this).css('opacity', 0.5);
					$(this).css('box-shadow',  'none');
				}
		    });
			$("*[id^=item]").click(function(){
				if($(this).children("span").text() === 'off') {
					$(this).children("span").css('margin-left', '13px');
			        $(this).css('opacity', 0.75);
			        $(this).css('color', 'black');
			        $(this).children("span").text('on');
				}
				else {
					$(this).children("span").css('margin-left', '0px');
					$(this).css('opacity', 0.5);
					$(this).children("span").text('off');
				}
				var val = "#resultC";
				$("*[id^=item]").each(function(){
					if($(this).children("span").text() === 'on') { val += "1"; } else { val += "0"; }
				});
				if(val === "#resultC000000") {
					$("#leg-res").text("");
					$("#leg-res").unbind("click");
					$("#leg-res").css('cursor', 'default')
				}
				else {
					$("#leg-res").text($(val).html());
					$("#leg-res").bind("click", opts.fnClickCallback);
					$("#leg-res").css('cursor', 'pointer')
				}
				
				// Add info to the number
				$("#leg-res").each(function(){
					this.listnames = $(val)[0].listnames;
					this.list      = $(val)[0].list;
				});
			});
			if (!opts.disableClick) {
				// Add some eventlistener
				$("#leg-res").mouseover(function(){
	            	$(this).addClass("number-over");
	            });
	            $("#leg-res").mouseout(function(){
	            	$(this).removeClass("number-over");
	            });
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
			actualList[5]=new Array();
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
			for (t=0;t<6;t++) {
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
			if (opts.series.length == 6) {
				$("#label1").html(opts.series[0].name);
				$("#label2").html(opts.series[1].name);
				$("#label3").html(opts.series[2].name);
				$("#label4").html(opts.series[3].name);
				$("#label5").html(opts.series[4].name);
				$("#label6").html(opts.series[5].name);
			} else if (opts.series.length == 5) {
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
				var cvalue = $(this).attr("id").substring(6,13);
				for (cl in classified) {
					if (classified[cl]==cvalue) {
						this.list.push(cl);
					}
				}
            });      
		}
		
		function fillCountVenn() {
			// Update values
			if (opts.series[0].data.A) { $("#resultC100000").html(opts.series[0].data.A); }
			if (opts.series[0].data.B) { $("#resultC010000").html(opts.series[0].data.B); }
			if (opts.series[0].data.C) { $("#resultC001000").html(opts.series[0].data.C); }
			if (opts.series[0].data.D) { $("#resultC000100").html(opts.series[0].data.D); }
			if (opts.series[0].data.E) { $("#resultC000010").html(opts.series[0].data.E); }
			if (opts.series[0].data.F) { $("#resultC000001").html(opts.series[0].data.F); }
			if (opts.series[0].data.AB) { $("#resultC110000").html(opts.series[0].data.AB); }
			if (opts.series[0].data.AC) { $("#resultC101000").html(opts.series[0].data.AC); }
			if (opts.series[0].data.AD) { $("#resultC100100").html(opts.series[0].data.AD); }
			if (opts.series[0].data.AE) { $("#resultC100010").html(opts.series[0].data.AE); }
			if (opts.series[0].data.AF) { $("#resultC100001").html(opts.series[0].data.AF); }
			if (opts.series[0].data.BC) { $("#resultC011000").html(opts.series[0].data.BC); }
			if (opts.series[0].data.BD) { $("#resultC010100").html(opts.series[0].data.BD); }
			if (opts.series[0].data.BE) { $("#resultC010010").html(opts.series[0].data.BE); }
			if (opts.series[0].data.BF) { $("#resultC010001").html(opts.series[0].data.BF); }
			if (opts.series[0].data.CD) { $("#resultC001100").html(opts.series[0].data.CD); }
			if (opts.series[0].data.CE) { $("#resultC001010").html(opts.series[0].data.CE); }
			if (opts.series[0].data.CF) { $("#resultC001001").html(opts.series[0].data.CF); }
			if (opts.series[0].data.DE) { $("#resultC000110").html(opts.series[0].data.DE); }
			if (opts.series[0].data.DF) { $("#resultC000101").html(opts.series[0].data.DF); }
			if (opts.series[0].data.EF) { $("#resultC000011").html(opts.series[0].data.EF); }
			if (opts.series[0].data.ABC) { $("#resultC111000").html(opts.series[0].data.ABC); }
			if (opts.series[0].data.ABD) { $("#resultC110100").html(opts.series[0].data.ABD); }
			if (opts.series[0].data.ABE) { $("#resultC110010").html(opts.series[0].data.ABE); }
			if (opts.series[0].data.ABF) { $("#resultC110001").html(opts.series[0].data.ABF); }
			if (opts.series[0].data.ACD) { $("#resultC101100").html(opts.series[0].data.ACD); }
			if (opts.series[0].data.ACE) { $("#resultC101010").html(opts.series[0].data.ACE); }
			if (opts.series[0].data.ACF) { $("#resultC101001").html(opts.series[0].data.ACF); }
			if (opts.series[0].data.ADE) { $("#resultC100110").html(opts.series[0].data.ADE); }
			if (opts.series[0].data.ADF) { $("#resultC100101").html(opts.series[0].data.ADF); }
			if (opts.series[0].data.AEF) { $("#resultC100011").html(opts.series[0].data.AEF); }
			if (opts.series[0].data.BCD) { $("#resultC011100").html(opts.series[0].data.BCD); }
			if (opts.series[0].data.BCE) { $("#resultC011010").html(opts.series[0].data.BCE); }
			if (opts.series[0].data.BCF) { $("#resultC011001").html(opts.series[0].data.BCF); }
			if (opts.series[0].data.BDE) { $("#resultC010110").html(opts.series[0].data.BDE); }
			if (opts.series[0].data.BDF) { $("#resultC010101").html(opts.series[0].data.BDF); }
			if (opts.series[0].data.BEF) { $("#resultC010011").html(opts.series[0].data.BEF); }
			if (opts.series[0].data.CDE) { $("#resultC001110").html(opts.series[0].data.CDE); }
			if (opts.series[0].data.CDF) { $("#resultC001101").html(opts.series[0].data.CDF); }
			if (opts.series[0].data.CEF) { $("#resultC001011").html(opts.series[0].data.CEF); }
			if (opts.series[0].data.DEF) { $("#resultC000111").html(opts.series[0].data.DEF); }
			if (opts.series[0].data.ABCD) { $("#resultC111100").html(opts.series[0].data.ABCD); }
			if (opts.series[0].data.ABCE) { $("#resultC111010").html(opts.series[0].data.ABCE); }
			if (opts.series[0].data.ABCF) { $("#resultC111001").html(opts.series[0].data.ABCF); }
			if (opts.series[0].data.ABDE) { $("#resultC110110").html(opts.series[0].data.ABDE); }
			if (opts.series[0].data.ABDF) { $("#resultC110101").html(opts.series[0].data.ABDF); }
			if (opts.series[0].data.ACDE) { $("#resultC101110").html(opts.series[0].data.ACDE); }
			if (opts.series[0].data.ACDF) { $("#resultC101101").html(opts.series[0].data.ACDF); }
			if (opts.series[0].data.BCDE) { $("#resultC011110").html(opts.series[0].data.BCDE); }
			if (opts.series[0].data.BCDF) { $("#resultC011101").html(opts.series[0].data.BCDF); }
			if (opts.series[0].data.CDEF) { $("#resultC001111").html(opts.series[0].data.CDEF); }
			if (opts.series[0].data.BDEF) { $("#resultC010111").html(opts.series[0].data.BDEF); }
			if (opts.series[0].data.BCEF) { $("#resultC011011").html(opts.series[0].data.BCEF); }
			if (opts.series[0].data.ADEF) { $("#resultC100111").html(opts.series[0].data.ADEF); }
			if (opts.series[0].data.ACEF) { $("#resultC101011").html(opts.series[0].data.ACEF); }
			if (opts.series[0].data.ABEF) { $("#resultC110011").html(opts.series[0].data.ABEF); }
			if (opts.series[0].data.ABCDE) { $("#resultC111110").html(opts.series[0].data.ABCDE); }
			if (opts.series[0].data.ABCDF) { $("#resultC111101").html(opts.series[0].data.ABCDF); }
			if (opts.series[0].data.ABCEF) { $("#resultC111011").html(opts.series[0].data.ABCEF); }
			if (opts.series[0].data.ABDEF) { $("#resultC110111").html(opts.series[0].data.ABDEF); }
			if (opts.series[0].data.ACDEF) { $("#resultC101111").html(opts.series[0].data.ACDEF); }
			if (opts.series[0].data.BCDEF) { $("#resultC011111").html(opts.series[0].data.BCDEF); }
			if (opts.series[0].data.ABCDEF) { $("#resultC111111").html(opts.series[0].data.ABCDEF); }
			// Update the labels
			if (opts.series[0].name.A) { $("#label1").html(opts.series[0].name.A); }
			if (opts.series[0].name.B) { $("#label2").html(opts.series[0].name.B); }
			if (opts.series[0].name.C) { $("#label3").html(opts.series[0].name.C); }
			if (opts.series[0].name.D) { $("#label4").html(opts.series[0].name.D); }
			if (opts.series[0].name.E) { $("#label5").html(opts.series[0].name.E); }
			if (opts.series[0].name.F) { $("#label6").html(opts.series[0].name.F); }
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
			$t = div;
			var div_export = '<div id="module-export" style="position: relative; left:475px; top: -438px; width: 25px; height: 20px;">';
			div_export += '<canvas id="canvasExport" style="border:1px solid white" width="25" height="20"></canvas>';
        	div_export += '<div id="menu" style="position: relative;width:160px; height:30px; display:none; right:133px; top:-4px;">';
        	div_export += '<div style="box-shadow: 3px 3px 10px rgb(136, 136, 136); border: 1px solid rgb(160, 160, 160); background: none repeat scroll 0% 0% rgb(255, 255, 255);padding: 5px 0px;">';
        	div_export += '<div id ="format-png" style="text-align:center;padding: 0px 10px; background: none repeat scroll 0% 0% transparent; color: rgb(48, 48, 48); font-size: 12px;">Download PNG image</div>';
        	div_export += '</div>';
			div_export += '</div>';
			div_export += '</div>';
			$t.append(div_export);
			
			//draw canvas button
			var canvas = $("#canvasExport")[0];
			var context = canvas.getContext("2d");
			for (i=0;i<3;i++){
				context.lineWidth = 3;
				context.beginPath();
				context.lineCap="round";
				context.moveTo(5,5+i*5.2);
				context.lineTo(20,5+i*5.2);
				context.strokeStyle = "#666";
				context.stroke();
			}		

			var select_form = $("#menu");
			var ceColorOri = $("#canvasExport").css('background');
			$("#canvasExport").click(function (event) {
				$(this).css('background', 'linear-gradient(to bottom, #AECEFF, white) repeat scroll 0 0 transparent')
				$(this).css('border', '1px solid #6688AA')
				$('#canvasExport').unbind('mouseenter mouseleave');
				select_form.show();
				if (select_form.is(":visible")){
					$(document).mouseup(function (event){
						if (select_form.has(event.target).length === 0){
							$("#canvasExport").css('background', ceColorOri)
							$("#canvasExport").css('border-color', "white")
							$("#canvasExport").hover(function() {
								$(this).css('background', 'linear-gradient(to bottom, white, #AECEFF) repeat scroll 0 0 transparent')
								$(this).css('border', '1px solid #6688AA')
								$(this).css('border-radius', '3px')
							}, function() {
								$(this).css('background', ceColorOri)
								$(this).css('border-color', "white")
							});
							select_form.hide();
						}
					});
				}
				var colorOrig=$("div[id^=format-]").css('background');
				$("div[id^=format-]").hover(function() {
					$(this).css('background', 'rgba(69,114,165,0.75)')
					$(this).css('color', 'white')
				}, function() {
					$(this).css('background', colorOrig)
					$(this).css('color', '')
				});
				$("#format-png").click(function(event) {
					select_form.hide();
					html2canvas($("#frame"), {
						onrendered: function(canvas) {
							var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
							window.location.href = img;
						}
					});
				});
				//TODO add format jpeg, pdf
			});
			$("#canvasExport").hover(function() {
				$(this).css('background', 'linear-gradient(to bottom, white, #AECEFF) repeat scroll 0 0 transparent')
				$(this).css('border', '1px solid #6688AA')
				$(this).css('border-radius', '3px')
			}, function() {
				$(this).css('background', ceColorOri)
				$(this).css('border-color', "white")
			});
		}
		
        this.each(function() {
            var $t = $(this);
            $t.css({"width": "500px", "height": "450px"});
            $('<style>.number-black{font-weight:bold;color:#000000;cursor:default;text-decoration:none;font-size:12px;}.small-number{font-weight:bold;color:#FFFFFF;cursor:default;text-decoration:none;font-size:12px;}.number-over{font-weight:bold;color:#0000FF;text-decoration:underline;}.number-empty{font-weight:normal;font-size:12px;}</style>').appendTo('body');
           
            $('<style>.module-legend{border:1px solid lightgrey;border-radius:5px;position:relative;left:405px;top:-150px;width:34px;height:104px}</style>').appendTo('body');
            $('<style>.leg-items{padding-top:1px;margin:3px 3px 0px 3px;cursor:pointer;border: 1px solid grey;border-radius:2px;width:27px;height:11px;font-size:0.6em;line-height:10px;opacity:0.5}</style>').appendTo('body');
            $('<style>.leg-res{text-align:right;padding-right:3px;position:relative;width:34px;height:20px;border:1px solid lightgrey;top:-214px;border-radius:0 5px 5px 0;left:440px}</style>').appendTo('body');
            
            var div_content = '<div id="frame" style="position: relative; left: 0pt; top: 5pt; width: 500px; height: 445px;">';
			div_content += '<canvas id="canvasEllipse" width="500" height="415"></canvas>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111000"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111100"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111010"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111110"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC000111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC001111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC010111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC011111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC100111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC101111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC110111"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111001"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111011"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111101"></div>';
			div_content += '<div class="number-black" style="position: absolute; left: -1000px; top: -2200px;" id="resultC111111"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(255,215,0);"  id="label1"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(153,51,78);"  id="label2"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(51,102,187);" id="label3"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(34,139,34);"  id="label4"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(255,165,79);" id="label5"></div>';
			div_content += '<div style="position: absolute; left: -1000px; top: -1000px; color: rgb(255,165,79);" id="label6"></div>';
			div_content += '</div>';
            $t.html(div_content);

            var type = getVennType();
            
            placeObjects(type[1]);
            
            if (type[0] == "list") {
            	fillListVenn();
            } else if (type[0] == "count") {
            	fillCountVenn();
            }
            
            if (opts.exporting === true){
            	addExportModule($t);
            }
            if (opts.hideLegend === false) {
            	addLegend($t);
            }
        });
        return this;
	};
})(jQuery);


/*
html2canvas 0.4.0 <http://html2canvas.hertzen.com>
Copyright (c) 2013 Niklas von Hertzen (@niklasvh)

Released under MIT License
*/
(function(window, document, undefined){

"use strict";

var _html2canvas = {},
previousElement,
computedCSS,
html2canvas;

function h2clog(a) {
if (_html2canvas.logging && window.console && window.console.log) {
  window.console.log(a);
}
}

_html2canvas.Util = {};

_html2canvas.Util.trimText = (function(isNative){
return function(input){
  if(isNative) { return isNative.apply( input ); }
  else { return ((input || '') + '').replace( /^\s+|\s+$/g , '' ); }
};
})( String.prototype.trim );

_html2canvas.Util.parseBackgroundImage = function (value) {
  var whitespace = ' \r\n\t',
      method, definition, prefix, prefix_i, block, results = [],
      c, mode = 0, numParen = 0, quote, args;

  var appendResult = function(){
      if(method) {
          if(definition.substr( 0, 1 ) === '"') {
              definition = definition.substr( 1, definition.length - 2 );
          }
          if(definition) {
              args.push(definition);
          }
          if(method.substr( 0, 1 ) === '-' &&
                  (prefix_i = method.indexOf( '-', 1 ) + 1) > 0) {
              prefix = method.substr( 0, prefix_i);
              method = method.substr( prefix_i );
          }
          results.push({
              prefix: prefix,
              method: method.toLowerCase(),
              value: block,
              args: args
          });
      }
      args = []; //for some odd reason, setting .length = 0 didn't work in safari
      method =
          prefix =
          definition =
          block = '';
  };

  appendResult();
  for(var i = 0, ii = value.length; i<ii; i++) {
      c = value[i];
      if(mode === 0 && whitespace.indexOf( c ) > -1){
          continue;
      }
      switch(c) {
          case '"':
              if(!quote) {
                  quote = c;
              }
              else if(quote === c) {
                  quote = null;
              }
              break;

          case '(':
              if(quote) { break; }
              else if(mode === 0) {
                  mode = 1;
                  block += c;
                  continue;
              } else {
                  numParen++;
              }
              break;

          case ')':
              if(quote) { break; }
              else if(mode === 1) {
                  if(numParen === 0) {
                      mode = 0;
                      block += c;
                      appendResult();
                      continue;
                  } else {
                      numParen--;
                  }
              }
              break;

          case ',':
              if(quote) { break; }
              else if(mode === 0) {
                  appendResult();
                  continue;
              }
              else if (mode === 1) {
                  if(numParen === 0 && !method.match(/^url$/i)) {
                      args.push(definition);
                      definition = '';
                      block += c;
                      continue;
                  }
              }
              break;
      }

      block += c;
      if(mode === 0) { method += c; }
      else { definition += c; }
  }
  appendResult();

  return results;
};

_html2canvas.Util.Bounds = function getBounds (el) {
var clientRect,
bounds = {};

if (el.getBoundingClientRect){
  clientRect = el.getBoundingClientRect();


  // TODO add scroll position to bounds, so no scrolling of window necessary
  bounds.top = clientRect.top;
  bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
  bounds.left = clientRect.left;

  // older IE doesn't have width/height, but top/bottom instead
  bounds.width = clientRect.width || (clientRect.right - clientRect.left);
  bounds.height = clientRect.height || (clientRect.bottom - clientRect.top);

  return bounds;

}
};

_html2canvas.Util.getCSS = function (el, attribute, index) {
// return $(el).css(attribute);

  var val,
  isBackgroundSizePosition = attribute.match( /^background(Size|Position)$/ );

function toPX( attribute, val ) {
  var rsLeft = el.runtimeStyle && el.runtimeStyle[ attribute ],
  left,
  style = el.style;

  // Check if we are not dealing with pixels, (Opera has issues with this)
  // Ported from jQuery css.js
  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels

  if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( val ) && /^-?\d/.test( val ) ) {

    // Remember the original values
    left = style.left;

    // Put in the new values to get a computed value out
    if ( rsLeft ) {
      el.runtimeStyle.left = el.currentStyle.left;
    }
    style.left = attribute === "fontSize" ? "1em" : (val || 0);
    val = style.pixelLeft + "px";

    // Revert the changed values
    style.left = left;
    if ( rsLeft ) {
      el.runtimeStyle.left = rsLeft;
    }

  }

  if (!/^(thin|medium|thick)$/i.test( val )) {
    return Math.round(parseFloat( val )) + "px";
  }

  return val;
}

  if (previousElement !== el) {
    computedCSS = document.defaultView.getComputedStyle(el, null);
  }
  val = computedCSS[attribute];

  if (isBackgroundSizePosition) {
    val = (val || '').split( ',' );
    val = val[index || 0] || val[0] || 'auto';
    val = _html2canvas.Util.trimText(val).split(' ');

    if(attribute === 'backgroundSize' && (!val[ 0 ] || val[ 0 ].match( /cover|contain|auto/ ))) {
      //these values will be handled in the parent function

    } else {
      val[ 0 ] = ( val[ 0 ].indexOf( "%" ) === -1 ) ? toPX(  attribute + "X", val[ 0 ] ) : val[ 0 ];
      if(val[ 1 ] === undefined) {
        if(attribute === 'backgroundSize') {
          val[ 1 ] = 'auto';
          return val;
        }
        else {
          // IE 9 doesn't return double digit always
          val[ 1 ] = val[ 0 ];
        }
      }
      val[ 1 ] = ( val[ 1 ].indexOf( "%" ) === -1 ) ? toPX(  attribute + "Y", val[ 1 ] ) : val[ 1 ];
    }
  } else if ( /border(Top|Bottom)(Left|Right)Radius/.test( attribute) ) {
    var arr = val.split(" ");
    if ( arr.length <= 1 ) {
            arr[ 1 ] = arr[ 0 ];
    }
    arr[ 0 ] = parseInt( arr[ 0 ], 10 );
    arr[ 1 ] = parseInt( arr[ 1 ], 10 );
    val = arr;
  }

return val;
};

_html2canvas.Util.resizeBounds = function( current_width, current_height, target_width, target_height, stretch_mode ){
var target_ratio = target_width / target_height,
  current_ratio = current_width / current_height,
  output_width, output_height;

if(!stretch_mode || stretch_mode === 'auto') {
  output_width = target_width;
  output_height = target_height;

} else {
  if(target_ratio < current_ratio ^ stretch_mode === 'contain') {
    output_height = target_height;
    output_width = target_height * current_ratio;
  } else {
    output_width = target_width;
    output_height = target_width / current_ratio;
  }
}

return { width: output_width, height: output_height };
};

function backgroundBoundsFactory( prop, el, bounds, image, imageIndex, backgroundSize ) {
  var bgposition =  _html2canvas.Util.getCSS( el, prop, imageIndex ) ,
  topPos,
  left,
  percentage,
  val;

  if (bgposition.length === 1){
    val = bgposition[0];

    bgposition = [];

    bgposition[0] = val;
    bgposition[1] = val;
  }

  if (bgposition[0].toString().indexOf("%") !== -1){
    percentage = (parseFloat(bgposition[0])/100);
    left = bounds.width * percentage;
    if(prop !== 'backgroundSize') {
      left -= (backgroundSize || image).width*percentage;
    }

  } else {
    if(prop === 'backgroundSize') {
      if(bgposition[0] === 'auto') {
        left = image.width;

      } else {
        if(bgposition[0].match(/contain|cover/)) {
          var resized = _html2canvas.Util.resizeBounds( image.width, image.height, bounds.width, bounds.height, bgposition[0] );
          left = resized.width;
          topPos = resized.height;
        } else {
          left = parseInt (bgposition[0], 10 );
        }
      }

    } else {
      left = parseInt( bgposition[0], 10 );
    }
  }


  if(bgposition[1] === 'auto') {
    topPos = left / image.width * image.height;
  } else if (bgposition[1].toString().indexOf("%") !== -1){
    percentage = (parseFloat(bgposition[1])/100);
    topPos =  bounds.height * percentage;
    if(prop !== 'backgroundSize') {
      topPos -= (backgroundSize || image).height * percentage;
    }

  } else {
    topPos = parseInt(bgposition[1],10);
  }

  return [left, topPos];
}

_html2canvas.Util.BackgroundPosition = function( el, bounds, image, imageIndex, backgroundSize ) {
  var result = backgroundBoundsFactory( 'backgroundPosition', el, bounds, image, imageIndex, backgroundSize );
  return { left: result[0], top: result[1] };
};
_html2canvas.Util.BackgroundSize = function( el, bounds, image, imageIndex ) {
  var result = backgroundBoundsFactory( 'backgroundSize', el, bounds, image, imageIndex );
  return { width: result[0], height: result[1] };
};

_html2canvas.Util.Extend = function (options, defaults) {
for (var key in options) {
  if (options.hasOwnProperty(key)) {
    defaults[key] = options[key];
  }
}
return defaults;
};


/*
* Derived from jQuery.contents()
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
_html2canvas.Util.Children = function( elem ) {


var children;
try {

  children = (elem.nodeName && elem.nodeName.toUpperCase() === "IFRAME") ?
  elem.contentDocument || elem.contentWindow.document : (function( array ){
    var ret = [];

    if ( array !== null ) {

      (function( first, second ) {
        var i = first.length,
        j = 0;

        if ( typeof second.length === "number" ) {
          for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
          }

        } else {
          while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
          }
        }

        first.length = i;

        return first;
      })( ret, array );

    }

    return ret;
  })( elem.childNodes );

} catch (ex) {
  h2clog("html2canvas.Util.Children failed with exception: " + ex.message);
  children = [];
}
return children;
};

_html2canvas.Util.Font = (function () {

var fontData = {};

return function(font, fontSize, doc) {
  if (fontData[font + "-" + fontSize] !== undefined) {
    return fontData[font + "-" + fontSize];
  }

  var container = doc.createElement('div'),
  img = doc.createElement('img'),
  span = doc.createElement('span'),
  sampleText = 'Hidden Text',
  baseline,
  middle,
  metricsObj;

  container.style.visibility = "hidden";
  container.style.fontFamily = font;
  container.style.fontSize = fontSize;
  container.style.margin = 0;
  container.style.padding = 0;

  doc.body.appendChild(container);

  // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
  img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
  img.width = 1;
  img.height = 1;

  img.style.margin = 0;
  img.style.padding = 0;
  img.style.verticalAlign = "baseline";

  span.style.fontFamily = font;
  span.style.fontSize = fontSize;
  span.style.margin = 0;
  span.style.padding = 0;

  span.appendChild(doc.createTextNode(sampleText));
  container.appendChild(span);
  container.appendChild(img);
  baseline = (img.offsetTop - span.offsetTop) + 1;

  container.removeChild(span);
  container.appendChild(doc.createTextNode(sampleText));

  container.style.lineHeight = "normal";
  img.style.verticalAlign = "super";

  middle = (img.offsetTop-container.offsetTop) + 1;
  metricsObj = {
    baseline: baseline,
    lineWidth: 1,
    middle: middle
  };

  fontData[font + "-" + fontSize] = metricsObj;

  doc.body.removeChild(container);

  return metricsObj;
};
})();

(function(){

_html2canvas.Generate = {};

var reGradients = [
/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
/^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
/^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
/^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
/^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
/^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
/^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
];

/*
* TODO: Add IE10 vendor prefix (-ms) support
* TODO: Add W3C gradient (linear-gradient) support
* TODO: Add old Webkit -webkit-gradient(radial, ...) support
* TODO: Maybe some RegExp optimizations are possible ;o)
*/
_html2canvas.Generate.parseGradient = function(css, bounds) {
  var gradient, i, len = reGradients.length, m1, stop, m2, m2Len, step, m3, tl,tr,br,bl;

  for(i = 0; i < len; i+=1){
    m1 = css.match(reGradients[i]);
    if(m1) {
      break;
    }
  }

  if(m1) {
    switch(m1[1]) {
      case '-webkit-linear-gradient':
      case '-o-linear-gradient':

        gradient = {
          type: 'linear',
          x0: null,
          y0: null,
          x1: null,
          y1: null,
          colorStops: []
        };

        // get coordinates
        m2 = m1[2].match(/\w+/g);
        if(m2){
          m2Len = m2.length;
          for(i = 0; i < m2Len; i+=1){
            switch(m2[i]) {
              case 'top':
                gradient.y0 = 0;
                gradient.y1 = bounds.height;
                break;

              case 'right':
                gradient.x0 = bounds.width;
                gradient.x1 = 0;
                break;

              case 'bottom':
                gradient.y0 = bounds.height;
                gradient.y1 = 0;
                break;

              case 'left':
                gradient.x0 = 0;
                gradient.x1 = bounds.width;
                break;
            }
          }
        }
        if(gradient.x0 === null && gradient.x1 === null){ // center
          gradient.x0 = gradient.x1 = bounds.width / 2;
        }
        if(gradient.y0 === null && gradient.y1 === null){ // center
          gradient.y0 = gradient.y1 = bounds.height / 2;
        }

        // get colors and stops
        m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
        if(m2){
          m2Len = m2.length;
          step = 1 / Math.max(m2Len - 1, 1);
          for(i = 0; i < m2Len; i+=1){
            m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
            if(m3[2]){
              stop = parseFloat(m3[2]);
              if(m3[3] === '%'){
                stop /= 100;
              } else { // px - stupid opera
                stop /= bounds.width;
              }
            } else {
              stop = i * step;
            }
            gradient.colorStops.push({
              color: m3[1],
              stop: stop
            });
          }
        }
        break;

      case '-webkit-gradient':

        gradient = {
          type: m1[2] === 'radial' ? 'circle' : m1[2], // TODO: Add radial gradient support for older mozilla definitions
          x0: 0,
          y0: 0,
          x1: 0,
          y1: 0,
          colorStops: []
        };

        // get coordinates
        m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);
        if(m2){
          gradient.x0 = (m2[1] * bounds.width) / 100;
          gradient.y0 = (m2[2] * bounds.height) / 100;
          gradient.x1 = (m2[3] * bounds.width) / 100;
          gradient.y1 = (m2[4] * bounds.height) / 100;
        }

        // get colors and stops
        m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);
        if(m2){
          m2Len = m2.length;
          for(i = 0; i < m2Len; i+=1){
            m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);
            stop = parseFloat(m3[2]);
            if(m3[1] === 'from') {
              stop = 0.0;
            }
            if(m3[1] === 'to') {
              stop = 1.0;
            }
            gradient.colorStops.push({
              color: m3[3],
              stop: stop
            });
          }
        }
        break;

      case '-moz-linear-gradient':

        gradient = {
          type: 'linear',
          x0: 0,
          y0: 0,
          x1: 0,
          y1: 0,
          colorStops: []
        };

        // get coordinates
        m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);

        // m2[1] == 0%   -> left
        // m2[1] == 50%  -> center
        // m2[1] == 100% -> right

        // m2[2] == 0%   -> top
        // m2[2] == 50%  -> center
        // m2[2] == 100% -> bottom

        if(m2){
          gradient.x0 = (m2[1] * bounds.width) / 100;
          gradient.y0 = (m2[2] * bounds.height) / 100;
          gradient.x1 = bounds.width - gradient.x0;
          gradient.y1 = bounds.height - gradient.y0;
        }

        // get colors and stops
        m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);
        if(m2){
          m2Len = m2.length;
          step = 1 / Math.max(m2Len - 1, 1);
          for(i = 0; i < m2Len; i+=1){
            m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);
            if(m3[2]){
              stop = parseFloat(m3[2]);
              if(m3[3]){ // percentage
                stop /= 100;
              }
            } else {
              stop = i * step;
            }
            gradient.colorStops.push({
              color: m3[1],
              stop: stop
            });
          }
        }
        break;

      case '-webkit-radial-gradient':
      case '-moz-radial-gradient':
      case '-o-radial-gradient':

        gradient = {
          type: 'circle',
          x0: 0,
          y0: 0,
          x1: bounds.width,
          y1: bounds.height,
          cx: 0,
          cy: 0,
          rx: 0,
          ry: 0,
          colorStops: []
        };

        // center
        m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);
        if(m2){
          gradient.cx = (m2[1] * bounds.width) / 100;
          gradient.cy = (m2[2] * bounds.height) / 100;
        }

        // size
        m2 = m1[3].match(/\w+/);
        m3 = m1[4].match(/[a-z\-]*/);
        if(m2 && m3){
          switch(m3[0]){
            case 'farthest-corner':
            case 'cover': // is equivalent to farthest-corner
            case '': // mozilla removes "cover" from definition :(
              tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
              tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
              br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
              bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
              gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
              break;
            case 'closest-corner':
              tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
              tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
              br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
              bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
              gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
              break;
            case 'farthest-side':
              if(m2[0] === 'circle'){
                gradient.rx = gradient.ry = Math.max(
                  gradient.cx,
                  gradient.cy,
                  gradient.x1 - gradient.cx,
                  gradient.y1 - gradient.cy
                  );
              } else { // ellipse

                gradient.type = m2[0];

                gradient.rx = Math.max(
                  gradient.cx,
                  gradient.x1 - gradient.cx
                  );
                gradient.ry = Math.max(
                  gradient.cy,
                  gradient.y1 - gradient.cy
                  );
              }
              break;
            case 'closest-side':
            case 'contain': // is equivalent to closest-side
              if(m2[0] === 'circle'){
                gradient.rx = gradient.ry = Math.min(
                  gradient.cx,
                  gradient.cy,
                  gradient.x1 - gradient.cx,
                  gradient.y1 - gradient.cy
                  );
              } else { // ellipse

                gradient.type = m2[0];

                gradient.rx = Math.min(
                  gradient.cx,
                  gradient.x1 - gradient.cx
                  );
                gradient.ry = Math.min(
                  gradient.cy,
                  gradient.y1 - gradient.cy
                  );
              }
              break;

          // TODO: add support for "30px 40px" sizes (webkit only)
          }
        }

        // color stops
        m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
        if(m2){
          m2Len = m2.length;
          step = 1 / Math.max(m2Len - 1, 1);
          for(i = 0; i < m2Len; i+=1){
            m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
            if(m3[2]){
              stop = parseFloat(m3[2]);
              if(m3[3] === '%'){
                stop /= 100;
              } else { // px - stupid opera
                stop /= bounds.width;
              }
            } else {
              stop = i * step;
            }
            gradient.colorStops.push({
              color: m3[1],
              stop: stop
            });
          }
        }
        break;
    }
  }

  return gradient;
};

_html2canvas.Generate.Gradient = function(src, bounds) {
  if(bounds.width === 0 || bounds.height === 0) {
    return;
  }

  var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d'),
  gradient, grad, i, len;

  canvas.width = bounds.width;
  canvas.height = bounds.height;

  // TODO: add support for multi defined background gradients
  gradient = _html2canvas.Generate.parseGradient(src, bounds);

  if(gradient) {
    if(gradient.type === 'linear') {
      grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1);

      for (i = 0, len = gradient.colorStops.length; i < len; i+=1) {
        try {
          grad.addColorStop(gradient.colorStops[i].stop, gradient.colorStops[i].color);
        }
        catch(e) {
          h2clog(['failed to add color stop: ', e, '; tried to add: ', gradient.colorStops[i], '; stop: ', i, '; in: ', src]);
        }
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, bounds.width, bounds.height);

    } else if(gradient.type === 'circle') {

      grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx);

      for (i = 0, len = gradient.colorStops.length; i < len; i+=1) {
        try {
          grad.addColorStop(gradient.colorStops[i].stop, gradient.colorStops[i].color);
        }
        catch(e) {
          h2clog(['failed to add color stop: ', e, '; tried to add: ', gradient.colorStops[i], '; stop: ', i, '; in: ', src]);
        }
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, bounds.width, bounds.height);

    } else if(gradient.type === 'ellipse') {

      // draw circle
      var canvasRadial = document.createElement('canvas'),
      ctxRadial = canvasRadial.getContext('2d'),
      ri = Math.max(gradient.rx, gradient.ry),
      di = ri * 2, imgRadial;

      canvasRadial.width = canvasRadial.height = di;

      grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri);

      for (i = 0, len = gradient.colorStops.length; i < len; i+=1) {
        try {
          grad.addColorStop(gradient.colorStops[i].stop, gradient.colorStops[i].color);
        }
        catch(e) {
          h2clog(['failed to add color stop: ', e, '; tried to add: ', gradient.colorStops[i], '; stop: ', i, '; in: ', src]);
        }
      }

      ctxRadial.fillStyle = grad;
      ctxRadial.fillRect(0, 0, di, di);

      ctx.fillStyle = gradient.colorStops[i - 1].color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry);

    }
  }

  return canvas;
};

_html2canvas.Generate.ListAlpha = function(number) {
  var tmp = "",
  modulus;

  do {
    modulus = number % 26;
    tmp = String.fromCharCode((modulus) + 64) + tmp;
    number = number / 26;
  }while((number*26) > 26);

  return tmp;
};

_html2canvas.Generate.ListRoman = function(number) {
  var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
  decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
  roman = "",
  v,
  len = romanArray.length;

  if (number <= 0 || number >= 4000) {
    return number;
  }

  for (v=0; v < len; v+=1) {
    while (number >= decimal[v]) {
      number -= decimal[v];
      roman += romanArray[v];
    }
  }

  return roman;

};

})();
function h2cRenderContext(width, height) {
var storage = [];
return {
  storage: storage,
  width: width,
  height: height,
  clip: function() {
    storage.push({
      type: "function",
      name: "clip",
      'arguments': arguments
    });
  },
  translate: function() {
    storage.push({
      type: "function",
      name: "translate",
      'arguments': arguments
    });
  },
  fill: function() {
    storage.push({
      type: "function",
      name: "fill",
      'arguments': arguments
    });
  },
  save: function() {
    storage.push({
      type: "function",
      name: "save",
      'arguments': arguments
    });
  },
  restore: function() {
    storage.push({
      type: "function",
      name: "restore",
      'arguments': arguments
    });
  },
  fillRect: function () {
    storage.push({
      type: "function",
      name: "fillRect",
      'arguments': arguments
    });
  },
  createPattern: function() {
    storage.push({
      type: "function",
      name: "createPattern",
      'arguments': arguments
    });
  },
  drawShape: function() {

    var shape = [];

    storage.push({
      type: "function",
      name: "drawShape",
      'arguments': shape
    });

    return {
      moveTo: function() {
        shape.push({
          name: "moveTo",
          'arguments': arguments
        });
      },
      lineTo: function() {
        shape.push({
          name: "lineTo",
          'arguments': arguments
        });
      },
      arcTo: function() {
        shape.push({
          name: "arcTo",
          'arguments': arguments
        });
      },
      bezierCurveTo: function() {
        shape.push({
          name: "bezierCurveTo",
          'arguments': arguments
        });
      },
      quadraticCurveTo: function() {
        shape.push({
          name: "quadraticCurveTo",
          'arguments': arguments
        });
      }
    };

  },
  drawImage: function () {
    storage.push({
      type: "function",
      name: "drawImage",
      'arguments': arguments
    });
  },
  fillText: function () {
    storage.push({
      type: "function",
      name: "fillText",
      'arguments': arguments
    });
  },
  setVariable: function (variable, value) {
    storage.push({
      type: "variable",
      name: variable,
      'arguments': value
    });
  }
};
}
_html2canvas.Parse = function (images, options) {
window.scroll(0,0);

var element = (( options.elements === undefined ) ? document.body : options.elements[0]), // select body by default
numDraws = 0,
doc = element.ownerDocument,
support = _html2canvas.Util.Support(options, doc),
ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
body = doc.body,
getCSS = _html2canvas.Util.getCSS,
pseudoHide = "___html2canvas___pseudoelement",
hidePseudoElements = doc.createElement('style');

hidePseudoElements.innerHTML = '.' + pseudoHide + '-before:before { content: "" !important; display: none !important; }' +
'.' + pseudoHide + '-after:after { content: "" !important; display: none !important; }';

body.appendChild(hidePseudoElements);

images = images || {};

function documentWidth () {
  return Math.max(
    Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
    Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
    Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
    );
}

function documentHeight () {
  return Math.max(
    Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
    Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
    Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    );
}

function getCSSInt(element, attribute) {
  var val = parseInt(getCSS(element, attribute), 10);
  return (isNaN(val)) ? 0 : val; // borders in old IE are throwing 'medium' for demo.html
}

function renderRect (ctx, x, y, w, h, bgcolor) {
  if (bgcolor !== "transparent"){
    ctx.setVariable("fillStyle", bgcolor);
    ctx.fillRect(x, y, w, h);
    numDraws+=1;
  }
}

function textTransform (text, transform) {
  switch(transform){
    case "lowercase":
      return text.toLowerCase();
    case "capitalize":
      return text.replace( /(^|\s|:|-|\(|\))([a-z])/g , function (m, p1, p2) {
        if (m.length > 0) {
          return p1 + p2.toUpperCase();
        }
      } );
    case "uppercase":
      return text.toUpperCase();
    default:
      return text;
  }
}

function noLetterSpacing(letter_spacing) {
  return (/^(normal|none|0px)$/.test(letter_spacing));
}

function drawText(currentText, x, y, ctx){
  if (currentText !== null && _html2canvas.Util.trimText(currentText).length > 0) {
    ctx.fillText(currentText, x, y);
    numDraws+=1;
  }
}

function setTextVariables(ctx, el, text_decoration, color) {
  var align = false,
  bold = getCSS(el, "fontWeight"),
  family = getCSS(el, "fontFamily"),
  size = getCSS(el, "fontSize");

  switch(parseInt(bold, 10)){
    case 401:
      bold = "bold";
      break;
    case 400:
      bold = "normal";
      break;
  }

  ctx.setVariable("fillStyle", color);
  ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" "));
  ctx.setVariable("textAlign", (align) ? "right" : "left");

  if (text_decoration !== "none"){
    return _html2canvas.Util.Font(family, size, doc);
  }
}

function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
  switch(text_decoration) {
    case "underline":
      // Draws a line at the baseline of the font
      // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
      renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
      break;
    case "overline":
      renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
      break;
    case "line-through":
      // TODO try and find exact position for line-through
      renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
      break;
  }
}

function getTextBounds(state, text, textDecoration, isLast) {
  var bounds;
  if (support.rangeBounds) {
    if (textDecoration !== "none" || _html2canvas.Util.trimText(text).length !== 0) {
      bounds = textRangeBounds(text, state.node, state.textOffset);
    }
    state.textOffset += text.length;
  } else if (state.node && typeof state.node.nodeValue === "string" ){
    var newTextNode = (isLast) ? state.node.splitText(text.length) : null;
    bounds = textWrapperBounds(state.node);
    state.node = newTextNode;
  }
  return bounds;
}

function textRangeBounds(text, textNode, textOffset) {
  var range = doc.createRange();
  range.setStart(textNode, textOffset);
  range.setEnd(textNode, textOffset + text.length);
  return range.getBoundingClientRect();
}

function textWrapperBounds(oldTextNode) {
  var parent = oldTextNode.parentNode,
  wrapElement = doc.createElement('wrapper'),
  backupText = oldTextNode.cloneNode(true);

  wrapElement.appendChild(oldTextNode.cloneNode(true));
  parent.replaceChild(wrapElement, oldTextNode);

  var bounds = _html2canvas.Util.Bounds(wrapElement);
  parent.replaceChild(backupText, wrapElement);
  return bounds;
}

function renderText(el, textNode, stack) {
  var ctx = stack.ctx,
  color = getCSS(el, "color"),
  textDecoration = getCSS(el, "textDecoration"),
  textAlign = getCSS(el, "textAlign"),
  metrics,
  textList,
  state = {
    node: textNode,
    textOffset: 0
  };

  if (_html2canvas.Util.trimText(textNode.nodeValue).length > 0) {
    textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform"));
    textAlign = textAlign.replace(["-webkit-auto"],["auto"]);

    textList = (!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing"))) ?
    textNode.nodeValue.split(/(\b| )/)
    : textNode.nodeValue.split("");

    metrics = setTextVariables(ctx, el, textDecoration, color);

    if (options.chinese) {
      textList.forEach(function(word, index) {
        if (/.*[\u4E00-\u9FA5].*$/.test(word)) {
          word = word.split("");
          word.unshift(index, 1);
          textList.splice.apply(textList, word);
        }
      });
    }

    textList.forEach(function(text, index) {
      var bounds = getTextBounds(state, text, textDecoration, (index < textList.length - 1));
      if (bounds) {
        drawText(text, bounds.left, bounds.bottom, ctx);
        renderTextDecoration(ctx, textDecoration, bounds, metrics, color);
      }
    });
  }
}

function listPosition (element, val) {
  var boundElement = doc.createElement( "boundelement" ),
  originalType,
  bounds;

  boundElement.style.display = "inline";

  originalType = element.style.listStyleType;
  element.style.listStyleType = "none";

  boundElement.appendChild(doc.createTextNode(val));

  element.insertBefore(boundElement, element.firstChild);

  bounds = _html2canvas.Util.Bounds(boundElement);
  element.removeChild(boundElement);
  element.style.listStyleType = originalType;
  return bounds;
}

function elementIndex( el ) {
  var i = -1,
  count = 1,
  childs = el.parentNode.childNodes;

  if (el.parentNode) {
    while( childs[ ++i ] !== el ) {
      if ( childs[ i ].nodeType === 1 ) {
        count++;
      }
    }
    return count;
  } else {
    return -1;
  }
}

function listItemText(element, type) {
  var currentIndex = elementIndex(element),
  text;
  switch(type){
    case "decimal":
      text = currentIndex;
      break;
    case "decimal-leading-zero":
      text = (currentIndex.toString().length === 1) ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
      break;
    case "upper-roman":
      text = _html2canvas.Generate.ListRoman( currentIndex );
      break;
    case "lower-roman":
      text = _html2canvas.Generate.ListRoman( currentIndex ).toLowerCase();
      break;
    case "lower-alpha":
      text = _html2canvas.Generate.ListAlpha( currentIndex ).toLowerCase();
      break;
    case "upper-alpha":
      text = _html2canvas.Generate.ListAlpha( currentIndex );
      break;
  }

  text += ". ";
  return text;
}

function renderListItem(element, stack, elBounds) {
  var x,
  text,
  ctx = stack.ctx,
  type = getCSS(element, "listStyleType"),
  listBounds;

  if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
    text = listItemText(element, type);
    listBounds = listPosition(element, text);
    setTextVariables(ctx, element, "none", getCSS(element, "color"));

    if (getCSS(element, "listStylePosition") === "inside") {
      ctx.setVariable("textAlign", "left");
      x = elBounds.left;
    } else {
      return;
    }

    drawText(text, x, listBounds.bottom, ctx);
  }
}

function loadImage (src){
  var img = images[src];
  if (img && img.succeeded === true) {
    return img.img;
  } else {
    return false;
  }
}

function clipBounds(src, dst){
  var x = Math.max(src.left, dst.left),
  y = Math.max(src.top, dst.top),
  x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
  y2 = Math.min((src.top + src.height), (dst.top + dst.height));

  return {
    left:x,
    top:y,
    width:x2-x,
    height:y2-y
  };
}

function setZ(zIndex, parentZ){
  // TODO fix static elements overlapping relative/absolute elements under same stack, if they are defined after them
  var newContext;
  if (!parentZ){
    newContext = h2czContext(0);
    return newContext;
  }

  if (zIndex !== "auto"){
    newContext = h2czContext(zIndex);
    parentZ.children.push(newContext);
    return newContext;

  }

  return parentZ;
}

function renderImage(ctx, element, image, bounds, borders) {

  var paddingLeft = getCSSInt(element, 'paddingLeft'),
  paddingTop = getCSSInt(element, 'paddingTop'),
  paddingRight = getCSSInt(element, 'paddingRight'),
  paddingBottom = getCSSInt(element, 'paddingBottom');

  drawImage(
    ctx,
    image,
    0, //sx
    0, //sy
    image.width, //sw
    image.height, //sh
    bounds.left + paddingLeft + borders[3].width, //dx
    bounds.top + paddingTop + borders[0].width, // dy
    bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
    bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
    );
}

function getBorderData(element) {
  return ["Top", "Right", "Bottom", "Left"].map(function(side) {
    return {
      width: getCSSInt(element, 'border' + side + 'Width'),
      color: getCSS(element, 'border' + side + 'Color')
    };
  });
}

function getBorderRadiusData(element) {
  return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
    return getCSS(element, 'border' + side + 'Radius');
  });
}

var getCurvePoints = (function(kappa) {

  return function(x, y, r1, r2) {
    var ox = (r1) * kappa, // control point offset horizontal
    oy = (r2) * kappa, // control point offset vertical
    xm = x + r1, // x-middle
    ym = y + r2; // y-middle
    return {
      topLeft: bezierCurve({
        x:x,
        y:ym
      }, {
        x:x,
        y:ym - oy
      }, {
        x:xm - ox,
        y:y
      }, {
        x:xm,
        y:y
      }),
      topRight: bezierCurve({
        x:x,
        y:y
      }, {
        x:x + ox,
        y:y
      }, {
        x:xm,
        y:ym - oy
      }, {
        x:xm,
        y:ym
      }),
      bottomRight: bezierCurve({
        x:xm,
        y:y
      }, {
        x:xm,
        y:y + oy
      }, {
        x:x + ox,
        y:ym
      }, {
        x:x,
        y:ym
      }),
      bottomLeft: bezierCurve({
        x:xm,
        y:ym
      }, {
        x:xm - ox,
        y:ym
      }, {
        x:x,
        y:y + oy
      }, {
        x:x,
        y:y
      })
    };
  };
})(4 * ((Math.sqrt(2) - 1) / 3));

function bezierCurve(start, startControl, endControl, end) {

  var lerp = function (a, b, t) {
    return {
      x:a.x + (b.x - a.x) * t,
      y:a.y + (b.y - a.y) * t
    };
  };

  return {
    start: start,
    startControl: startControl,
    endControl: endControl,
    end: end,
    subdivide: function(t) {
      var ab = lerp(start, startControl, t),
      bc = lerp(startControl, endControl, t),
      cd = lerp(endControl, end, t),
      abbc = lerp(ab, bc, t),
      bccd = lerp(bc, cd, t),
      dest = lerp(abbc, bccd, t);
      return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
    },
    curveTo: function(borderArgs) {
      borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
    },
    curveToReversed: function(borderArgs) {
      borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
    }
  };
}

function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
  if (radius1[0] > 0 || radius1[1] > 0) {
    borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
    corner1[0].curveTo(borderArgs);
    corner1[1].curveTo(borderArgs);
  } else {
    borderArgs.push(["line", x, y]);
  }

  if (radius2[0] > 0 || radius2[1] > 0) {
    borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
  }
}

function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
  var borderArgs = [];

  if (radius1[0] > 0 || radius1[1] > 0) {
    borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
    outer1[1].curveTo(borderArgs);
  } else {
    borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
  }

  if (radius2[0] > 0 || radius2[1] > 0) {
    borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
    outer2[0].curveTo(borderArgs);
    borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
    inner2[0].curveToReversed(borderArgs);
  } else {
    borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
    borderArgs.push([ "line", borderData.c3[0], borderData.c3[1]]);
  }

  if (radius1[0] > 0 || radius1[1] > 0) {
    borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
    inner1[1].curveToReversed(borderArgs);
  } else {
    borderArgs.push([ "line", borderData.c4[0], borderData.c4[1]]);
  }

  return borderArgs;
}

function calculateCurvePoints(bounds, borderRadius, borders) {

  var x = bounds.left,
  y = bounds.top,
  width = bounds.width,
  height = bounds.height,

  tlh = borderRadius[0][0],
  tlv = borderRadius[0][1],
  trh = borderRadius[1][0],
  trv = borderRadius[1][1],
  brv = borderRadius[2][0],
  brh = borderRadius[2][1],
  blh = borderRadius[3][0],
  blv = borderRadius[3][1],

  topWidth = width - trh,
  rightHeight = height - brv,
  bottomWidth = width - brh,
  leftHeight = height - blv;

  return {
    topLeftOuter: getCurvePoints(
      x,
      y,
      tlh,
      tlv
      ).topLeft.subdivide(0.5),

    topLeftInner: getCurvePoints(
      x + borders[3].width,
      y + borders[0].width,
      Math.max(0, tlh - borders[3].width),
      Math.max(0, tlv - borders[0].width)
      ).topLeft.subdivide(0.5),

    topRightOuter: getCurvePoints(
      x + topWidth,
      y,
      trh,
      trv
      ).topRight.subdivide(0.5),

    topRightInner: getCurvePoints(
      x + Math.min(topWidth, width + borders[3].width),
      y + borders[0].width,
      (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width,
      trv - borders[0].width
      ).topRight.subdivide(0.5),

    bottomRightOuter: getCurvePoints(
      x + bottomWidth,
      y + rightHeight,
      brh,
      brv
      ).bottomRight.subdivide(0.5),

    bottomRightInner: getCurvePoints(
      x + Math.min(bottomWidth, width + borders[3].width),
      y + Math.min(rightHeight, height + borders[0].width),
      Math.max(0, brh - borders[1].width),
      Math.max(0, brv - borders[2].width)
      ).bottomRight.subdivide(0.5),

    bottomLeftOuter: getCurvePoints(
      x,
      y + leftHeight,
      blh,
      blv
      ).bottomLeft.subdivide(0.5),

    bottomLeftInner: getCurvePoints(
      x + borders[3].width,
      y + leftHeight,
      Math.max(0, blh - borders[3].width),
      Math.max(0, blv - borders[2].width)
      ).bottomLeft.subdivide(0.5)
  };
}

function getBorderClip(element, borderPoints, borders, radius, bounds) {
  var backgroundClip = getCSS(element, 'backgroundClip'),
  borderArgs = [];

  switch(backgroundClip) {
    case "content-box":
    case "padding-box":
      parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
      parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
      parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
      parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
      break;

    default:
      parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
      parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
      parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
      parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
      break;
  }

  return borderArgs;
}

function parseBorders(element, bounds, borders){
  var x = bounds.left,
  y = bounds.top,
  width = bounds.width,
  height = bounds.height,
  borderSide,
  bx,
  by,
  bw,
  bh,
  borderArgs,
  // http://www.w3.org/TR/css3-background/#the-border-radius
  borderRadius = getBorderRadiusData(element),
  borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
  borderData = {
    clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
    borders: []
  };

  for (borderSide = 0; borderSide < 4; borderSide++) {

    if (borders[borderSide].width > 0) {
      bx = x;
      by = y;
      bw = width;
      bh = height - (borders[2].width);

      switch(borderSide) {
        case 0:
          // top border
          bh = borders[0].width;

          borderArgs = drawSide({
            c1: [bx, by],
            c2: [bx + bw, by],
            c3: [bx + bw - borders[1].width, by + bh],
            c4: [bx + borders[3].width, by + bh]
          }, borderRadius[0], borderRadius[1],
          borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
          break;
        case 1:
          // right border
          bx = x + width - (borders[1].width);
          bw = borders[1].width;

          borderArgs = drawSide({
            c1: [bx + bw, by],
            c2: [bx + bw, by + bh + borders[2].width],
            c3: [bx, by + bh],
            c4: [bx, by + borders[0].width]
          }, borderRadius[1], borderRadius[2],
          borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
          break;
        case 2:
          // bottom border
          by = (by + height) - (borders[2].width);
          bh = borders[2].width;

          borderArgs = drawSide({
            c1: [bx + bw, by + bh],
            c2: [bx, by + bh],
            c3: [bx + borders[3].width, by],
            c4: [bx + bw - borders[2].width, by]
          }, borderRadius[2], borderRadius[3],
          borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
          break;
        case 3:
          // left border
          bw = borders[3].width;

          borderArgs = drawSide({
            c1: [bx, by + bh + borders[2].width],
            c2: [bx, by],
            c3: [bx + bw, by + borders[0].width],
            c4: [bx + bw, by + bh]
          }, borderRadius[3], borderRadius[0],
          borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
          break;
      }

      borderData.borders.push({
        args: borderArgs,
        color: borders[borderSide].color
      });

    }
  }

  return borderData;
}

function createShape(ctx, args) {
  var shape = ctx.drawShape();
  args.forEach(function(border, index) {
    shape[(index === 0) ? "moveTo" : border[0] + "To" ].apply(null, border.slice(1));
  });
  return shape;
}

function renderBorders(ctx, borderArgs, color) {
  if (color !== "transparent") {
    ctx.setVariable( "fillStyle", color);
    createShape(ctx, borderArgs);
    ctx.fill();
    numDraws+=1;
  }
}

function renderFormValue (el, bounds, stack){

  var valueWrap = doc.createElement('valuewrap'),
  cssPropertyArray = ['lineHeight','textAlign','fontFamily','color','fontSize','paddingLeft','paddingTop','width','height','border','borderLeftWidth','borderTopWidth'],
  textValue,
  textNode;

  cssPropertyArray.forEach(function(property) {
    try {
      valueWrap.style[property] = getCSS(el, property);
    } catch(e) {
      // Older IE has issues with "border"
      h2clog("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
    }
  });

  valueWrap.style.borderColor = "black";
  valueWrap.style.borderStyle = "solid";
  valueWrap.style.display = "block";
  valueWrap.style.position = "absolute";

  if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT"){
    valueWrap.style.lineHeight = getCSS(el, "height");
  }

  valueWrap.style.top = bounds.top + "px";
  valueWrap.style.left = bounds.left + "px";

  textValue = (el.nodeName === "SELECT") ? (el.options[el.selectedIndex] || 0).text : el.value;
  if(!textValue) {
    textValue = el.placeholder;
  }

  textNode = doc.createTextNode(textValue);

  valueWrap.appendChild(textNode);
  body.appendChild(valueWrap);

  renderText(el, textNode, stack);
  body.removeChild(valueWrap);
}

function drawImage (ctx) {
  ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
  numDraws+=1;
}

function getPseudoElement(el, which) {
  var elStyle = window.getComputedStyle(el, which);
  if(!elStyle || !elStyle.content || elStyle.content === "none" || elStyle.content === "-moz-alt-content") {
    return;
  }
  var content = elStyle.content + '',
  first = content.substr( 0, 1 );
  //strips quotes
  if(first === content.substr( content.length - 1 ) && first.match(/'|"/)) {
    content = content.substr( 1, content.length - 2 );
  }

  var isImage = content.substr( 0, 3 ) === 'url',
  elps = document.createElement( isImage ? 'img' : 'span' );

  elps.className = pseudoHide + "-before " + pseudoHide + "-after";

  Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
    // Prevent assigning of read only CSS Rules, ex. length, parentRule
    try {
      elps.style[prop] = elStyle[prop];
    } catch (e) {
      h2clog(['Tried to assign readonly property ', prop, 'Error:', e]);
    }
  });

  if(isImage) {
    elps.src = _html2canvas.Util.parseBackgroundImage(content)[0].args[0];
  } else {
    elps.innerHTML = content;
  }
  return elps;
}

function indexedProperty(property) {
  return (isNaN(window.parseInt(property, 10)));
}

function injectPseudoElements(el, stack) {
  var before = getPseudoElement(el, ':before'),
  after = getPseudoElement(el, ':after');
  if(!before && !after) {
    return;
  }

  if(before) {
    el.className += " " + pseudoHide + "-before";
    el.parentNode.insertBefore(before, el);
    parseElement(before, stack, true);
    el.parentNode.removeChild(before);
    el.className = el.className.replace(pseudoHide + "-before", "").trim();
  }

  if (after) {
    el.className += " " + pseudoHide + "-after";
    el.appendChild(after);
    parseElement(after, stack, true);
    el.removeChild(after);
    el.className = el.className.replace(pseudoHide + "-after", "").trim();
  }

}

function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
  var offsetX = Math.round(bounds.left + backgroundPosition.left),
  offsetY = Math.round(bounds.top + backgroundPosition.top);

  ctx.createPattern(image);
  ctx.translate(offsetX, offsetY);
  ctx.fill();
  ctx.translate(-offsetX, -offsetY);
}

function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
  var args = [];
  args.push(["line", Math.round(left), Math.round(top)]);
  args.push(["line", Math.round(left + width), Math.round(top)]);
  args.push(["line", Math.round(left + width), Math.round(height + top)]);
  args.push(["line", Math.round(left), Math.round(height + top)]);
  createShape(ctx, args);
  ctx.save();
  ctx.clip();
  renderBackgroundRepeat(ctx, image, backgroundPosition, bounds);
  ctx.restore();
}

function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
  renderRect(
    ctx,
    backgroundBounds.left,
    backgroundBounds.top,
    backgroundBounds.width,
    backgroundBounds.height,
    bgcolor
    );
}

function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
  var backgroundSize = _html2canvas.Util.BackgroundSize(el, bounds, image, imageIndex),
  backgroundPosition = _html2canvas.Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
  backgroundRepeat = getCSS(el, "backgroundRepeat").split(",").map(function(value) {
    return value.trim();
  });

  image = resizeImage(image, backgroundSize);

  backgroundRepeat = backgroundRepeat[imageIndex] || backgroundRepeat[0];

  switch (backgroundRepeat) {
    case "repeat-x":
      backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
        bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
      break;

    case "repeat-y":
      backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
        bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
      break;

    case "no-repeat":
      backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
        bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
      break;

    default:
      renderBackgroundRepeat(ctx, image, backgroundPosition, {
        top: bounds.top,
        left: bounds.left,
        width: image.width,
        height: image.height
      });
      break;
  }
}

function renderBackgroundImage(element, bounds, ctx) {
  var backgroundImage = getCSS(element, "backgroundImage"),
  backgroundImages = _html2canvas.Util.parseBackgroundImage(backgroundImage),
  image,
  imageIndex = backgroundImages.length;

  while(imageIndex--) {
    backgroundImage = backgroundImages[imageIndex];

    if (!backgroundImage.args || backgroundImage.args.length === 0) {
      continue;
    }

    var key = backgroundImage.method === 'url' ?
    backgroundImage.args[0] :
    backgroundImage.value;

    image = loadImage(key);

    // TODO add support for background-origin
    if (image) {
      renderBackgroundRepeating(element, bounds, ctx, image, imageIndex);
    } else {
      h2clog("html2canvas: Error loading background:", backgroundImage);
    }
  }
}

function resizeImage(image, bounds) {
  if(image.width === bounds.width && image.height === bounds.height) {
    return image;
  }

  var ctx, canvas = doc.createElement('canvas');
  canvas.width = bounds.width;
  canvas.height = bounds.height;
  ctx = canvas.getContext("2d");
  drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height );
  return canvas;
}

function setOpacity(ctx, element, parentStack) {
  var opacity = getCSS(element, "opacity") * ((parentStack) ? parentStack.opacity : 1);
  ctx.setVariable("globalAlpha", opacity);
  return opacity;
}

function createStack(element, parentStack, bounds) {

  var ctx = h2cRenderContext((!parentStack) ? documentWidth() : bounds.width , (!parentStack) ? documentHeight() : bounds.height),
  stack = {
    ctx: ctx,
    zIndex: setZ(getCSS(element, "zIndex"), (parentStack) ? parentStack.zIndex : null),
    opacity: setOpacity(ctx, element, parentStack),
    cssPosition: getCSS(element, "position"),
    borders: getBorderData(element),
    clip: (parentStack && parentStack.clip) ? _html2canvas.Util.Extend( {}, parentStack.clip ) : null
  };

  // TODO correct overflow for absolute content residing under a static position
  if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === true && /(BODY)/i.test(element.nodeName) === false){
    stack.clip = (stack.clip) ? clipBounds(stack.clip, bounds) : bounds;
  }

  stack.zIndex.children.push(stack);

  return stack;
}

function getBackgroundBounds(borders, bounds, clip) {
  var backgroundBounds = {
    left: bounds.left + borders[3].width,
    top: bounds.top + borders[0].width,
    width: bounds.width - (borders[1].width + borders[3].width),
    height: bounds.height - (borders[0].width + borders[2].width)
  };

  if (clip) {
    backgroundBounds = clipBounds(backgroundBounds, clip);
  }

  return backgroundBounds;
}

function renderElement(element, parentStack, pseudoElement){
  var bounds = _html2canvas.Util.Bounds(element),
  image,
  bgcolor = (ignoreElementsRegExp.test(element.nodeName)) ? "#efefef" : getCSS(element, "backgroundColor"),
  stack = createStack(element, parentStack, bounds),
  borders = stack.borders,
  ctx = stack.ctx,
  backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
  borderData = parseBorders(element, bounds, borders);

  createShape(ctx, borderData.clip);

  ctx.save();
  ctx.clip();

  if (backgroundBounds.height > 0 && backgroundBounds.width > 0){
    renderBackgroundColor(ctx, bounds, bgcolor);
    renderBackgroundImage(element, backgroundBounds, ctx);
  }

  ctx.restore();

  borderData.borders.forEach(function(border) {
    renderBorders(ctx, border.args, border.color);
  });

  if (!pseudoElement) {
    injectPseudoElements(element, stack);
  }

  switch(element.nodeName){
    case "IMG":
      if ((image = loadImage(element.getAttribute('src')))) {
        renderImage(ctx, element, image, bounds, borders);
      } else {
        h2clog("html2canvas: Error loading <img>:" + element.getAttribute('src'));
      }
      break;
    case "INPUT":
      // TODO add all relevant type's, i.e. HTML5 new stuff
      // todo add support for placeholder attribute for browsers which support it
      if (/^(text|url|email|submit|button|reset)$/.test(element.type) && (element.value || element.placeholder).length > 0){
        renderFormValue(element, bounds, stack);
      }
      break;
    case "TEXTAREA":
      if ((element.value || element.placeholder || "").length > 0){
        renderFormValue(element, bounds, stack);
      }
      break;
    case "SELECT":
      if ((element.options||element.placeholder || "").length > 0){
        renderFormValue(element, bounds, stack);
      }
      break;
    case "LI":
      renderListItem(element, stack, backgroundBounds);
      break;
    case "CANVAS":
      renderImage(ctx, element, element, bounds, borders);
      break;
  }

  return stack;
}

function isElementVisible(element) {
  return (getCSS(element, 'display') !== "none" && getCSS(element, 'visibility') !== "hidden" && !element.hasAttribute("data-html2canvas-ignore"));
}

function parseElement (el, stack, pseudoElement) {

  if (isElementVisible(el)) {
    stack = renderElement(el, stack, pseudoElement) || stack;
    if (!ignoreElementsRegExp.test(el.nodeName)) {
      _html2canvas.Util.Children(el).forEach(function(node) {
        if (node.nodeType === 1) {
          parseElement(node, stack, pseudoElement);
        } else if (node.nodeType === 3) {
          renderText(el, node, stack);
        }
      });
    }
  }
}

function svgDOMRender(body, stack) {
  var img = new Image(),
  docWidth = documentWidth(),
  docHeight = documentHeight(),
  html = "";

  function parseDOM(el) {
    var children = _html2canvas.Util.Children( el ),
    len = children.length,
    attr,
    a,
    alen,
    elm,
    i;
    for ( i = 0; i < len; i+=1 ) {
      elm = children[ i ];
      if ( elm.nodeType === 3 ) {
        // Text node
        html += elm.nodeValue.replace(/</g,"&lt;").replace(/>/g,"&gt;");
      } else if ( elm.nodeType === 1 ) {
        // Element
        if ( !/^(script|meta|title)$/.test(elm.nodeName.toLowerCase()) ) {

          html += "<" + elm.nodeName.toLowerCase();

          // add attributes
          if ( elm.hasAttributes() ) {
            attr = elm.attributes;
            alen = attr.length;
            for ( a = 0; a < alen; a+=1 ) {
              html += " " + attr[ a ].name + '="' + attr[ a ].value + '"';
            }
          }


          html += '>';

          parseDOM( elm );


          html += "</" + elm.nodeName.toLowerCase() + ">";
        }
      }

    }

  }

  parseDOM(body);
  img.src = [
  "data:image/svg+xml,",
  "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='" + docWidth + "' height='" + docHeight + "'>",
  "<foreignObject width='" + docWidth + "' height='" + docHeight + "'>",
  "<html xmlns='http://www.w3.org/1999/xhtml' style='margin:0;'>",
  html.replace(/\#/g,"%23"),
  "</html>",
  "</foreignObject>",
  "</svg>"
  ].join("");

  img.onload = function() {
    stack.svgRender = img;
  };

}

function init() {
  var stack = renderElement(element, null);

  if (support.svgRendering) {
    svgDOMRender(document.documentElement, stack);
  }

  Array.prototype.slice.call(element.children, 0).forEach(function(childElement) {
    parseElement(childElement, stack);
  });

  stack.backgroundColor = getCSS(document.documentElement, "backgroundColor");
  body.removeChild(hidePseudoElements);
  return stack;
}

return init();
};

function h2czContext(zindex) {
return {
  zindex: zindex,
  children: []
};
}
_html2canvas.Preload = function( options ) {

var images = {
  numLoaded: 0,   // also failed are counted here
  numFailed: 0,
  numTotal: 0,
  cleanupDone: false
},
pageOrigin,
methods,
i,
count = 0,
element = options.elements[0] || document.body,
doc = element.ownerDocument,
domImages = doc.images, // TODO probably should limit it to images present in the element only
imgLen = domImages.length,
link = doc.createElement("a"),
supportCORS = (function( img ){
  return (img.crossOrigin !== undefined);
})(new Image()),
timeoutTimer;

link.href = window.location.href;
pageOrigin  = link.protocol + link.host;

function isSameOrigin(url){
  link.href = url;
  link.href = link.href; // YES, BELIEVE IT OR NOT, that is required for IE9 - http://jsfiddle.net/niklasvh/2e48b/
  var origin = link.protocol + link.host;
  return (origin === pageOrigin);
}

function start(){
  h2clog("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
  if (!images.firstRun && images.numLoaded >= images.numTotal){
    h2clog("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");

    if (typeof options.complete === "function"){
      options.complete(images);
    }

  }
}

// TODO modify proxy to serve images with CORS enabled, where available
function proxyGetImage(url, img, imageObj){
  var callback_name,
  scriptUrl = options.proxy,
  script;

  link.href = url;
  url = link.href; // work around for pages with base href="" set - WARNING: this may change the url

  callback_name = 'html2canvas_' + (count++);
  imageObj.callbackname = callback_name;

  if (scriptUrl.indexOf("?") > -1) {
    scriptUrl += "&";
  } else {
    scriptUrl += "?";
  }
  scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;
  script = doc.createElement("script");

  window[callback_name] = function(a){
    if (a.substring(0,6) === "error:"){
      imageObj.succeeded = false;
      images.numLoaded++;
      images.numFailed++;
      start();
    } else {
      setImageLoadHandlers(img, imageObj);
      img.src = a;
    }
    window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
    try {
      delete window[callback_name];  // for all browser that support this
    } catch(ex) {}
    script.parentNode.removeChild(script);
    script = null;
    delete imageObj.script;
    delete imageObj.callbackname;
  };

  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", scriptUrl);
  imageObj.script = script;
  window.document.body.appendChild(script);

}

function loadPseudoElement(element, type) {
  var style = window.getComputedStyle(element, type),
  content = style.content;
  if (content.substr(0, 3) === 'url') {
    methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]);
  }
  loadBackgroundImages(style.backgroundImage, element);
}

function loadPseudoElementImages(element) {
  loadPseudoElement(element, ":before");
  loadPseudoElement(element, ":after");
}

function loadGradientImage(backgroundImage, bounds) {
  var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);

  if (img !== undefined){
    images[backgroundImage] = {
      img: img,
      succeeded: true
    };
    images.numTotal++;
    images.numLoaded++;
    start();
  }
}

function invalidBackgrounds(background_image) {
  return (background_image && background_image.method && background_image.args && background_image.args.length > 0 );
}

function loadBackgroundImages(background_image, el) {
  var bounds;

  _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
    if (background_image.method === 'url') {
      methods.loadImage(background_image.args[0]);
    } else if(background_image.method.match(/\-?gradient$/)) {
      if(bounds === undefined) {
        bounds = _html2canvas.Util.Bounds(el);
      }
      loadGradientImage(background_image.value, bounds);
    }
  });
}

function getImages (el) {
  var elNodeType = false;

  // Firefox fails with permission denied on pages with iframes
  try {
    _html2canvas.Util.Children(el).forEach(function(img) {
      getImages(img);
    });
  }
  catch( e ) {}

  try {
    elNodeType = el.nodeType;
  } catch (ex) {
    elNodeType = false;
    h2clog("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
  }

  if (elNodeType === 1 || elNodeType === undefined) {
    loadPseudoElementImages(el);
    try {
      loadBackgroundImages(_html2canvas.Util.getCSS(el, 'backgroundImage'), el);
    } catch(e) {
      h2clog("html2canvas: failed to get background-image - Exception: " + e.message);
    }
    loadBackgroundImages(el);
  }
}

function setImageLoadHandlers(img, imageObj) {
  img.onload = function() {
    if ( imageObj.timer !== undefined ) {
      // CORS succeeded
      window.clearTimeout( imageObj.timer );
    }

    images.numLoaded++;
    imageObj.succeeded = true;
    img.onerror = img.onload = null;
    start();
  };
  img.onerror = function() {
    if (img.crossOrigin === "anonymous") {
      // CORS failed
      window.clearTimeout( imageObj.timer );

      // let's try with proxy instead
      if ( options.proxy ) {
        var src = img.src;
        img = new Image();
        imageObj.img = img;
        img.src = src;

        proxyGetImage( img.src, img, imageObj );
        return;
      }
    }

    images.numLoaded++;
    images.numFailed++;
    imageObj.succeeded = false;
    img.onerror = img.onload = null;
    start();
  };
}

methods = {
  loadImage: function( src ) {
    var img, imageObj;
    if ( src && images[src] === undefined ) {
      img = new Image();
      if ( src.match(/data:image\/.*;base64,/i) ) {
        img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
        imageObj = images[src] = {
          img: img
        };
        images.numTotal++;
        setImageLoadHandlers(img, imageObj);
      } else if ( isSameOrigin( src ) || options.allowTaint ===  true ) {
        imageObj = images[src] = {
          img: img
        };
        images.numTotal++;
        setImageLoadHandlers(img, imageObj);
        img.src = src;
      } else if ( supportCORS && !options.allowTaint && options.useCORS ) {
        // attempt to load with CORS

        img.crossOrigin = "anonymous";
        imageObj = images[src] = {
          img: img
        };
        images.numTotal++;
        setImageLoadHandlers(img, imageObj);
        img.src = src;

        // work around for https://bugs.webkit.org/show_bug.cgi?id=80028
        img.customComplete = function () {
          if (!this.img.complete) {
            this.timer = window.setTimeout(this.img.customComplete, 100);
          } else {
            this.img.onerror();
          }
        }.bind(imageObj);
        img.customComplete();

      } else if ( options.proxy ) {
        imageObj = images[src] = {
          img: img
        };
        images.numTotal++;
        proxyGetImage( src, img, imageObj );
      }
    }

  },
  cleanupDOM: function(cause) {
    var img, src;
    if (!images.cleanupDone) {
      if (cause && typeof cause === "string") {
        h2clog("html2canvas: Cleanup because: " + cause);
      } else {
        h2clog("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
      }

      for (src in images) {
        if (images.hasOwnProperty(src)) {
          img = images[src];
          if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
            // cancel proxy image request
            window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
            try {
              delete window[img.callbackname];  // for all browser that support this
            } catch(ex) {}
            if (img.script && img.script.parentNode) {
              img.script.setAttribute("src", "about:blank");  // try to cancel running request
              img.script.parentNode.removeChild(img.script);
            }
            images.numLoaded++;
            images.numFailed++;
            h2clog("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
          }
        }
      }

      // cancel any pending requests
      if(window.stop !== undefined) {
        window.stop();
      } else if(document.execCommand !== undefined) {
        document.execCommand("Stop", false);
      }
      if (document.close !== undefined) {
        document.close();
      }
      images.cleanupDone = true;
      if (!(cause && typeof cause === "string")) {
        start();
      }
    }
  },

  renderingDone: function() {
    if (timeoutTimer) {
      window.clearTimeout(timeoutTimer);
    }
  }
};

if (options.timeout > 0) {
  timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
}

h2clog('html2canvas: Preload starts: finding background-images');
images.firstRun = true;

getImages(element);

h2clog('html2canvas: Preload: Finding images');
// load <img> images
for (i = 0; i < imgLen; i+=1){
  methods.loadImage( domImages[i].getAttribute( "src" ) );
}

images.firstRun = false;
h2clog('html2canvas: Preload: Done.');
if ( images.numTotal === images.numLoaded ) {
  start();
}

return methods;

};
_html2canvas.Renderer = function(parseQueue, options){

function createRenderQueue(parseQueue) {
  var queue = [];

  var sortZ = function(zStack){
    var subStacks = [],
    stackValues = [];

    zStack.children.forEach(function(stackChild) {
      if (stackChild.children && stackChild.children.length > 0){
        subStacks.push(stackChild);
        stackValues.push(stackChild.zindex);
      } else {
        queue.push(stackChild);
      }
    });

    stackValues.sort(function(a, b) {
      return a - b;
    });

    stackValues.forEach(function(zValue) {
      var index;

      subStacks.some(function(stack, i){
        index = i;
        return (stack.zindex === zValue);
      });
      sortZ(subStacks.splice(index, 1)[0]);

    });
  };

  sortZ(parseQueue.zIndex);

  return queue;
}

function getRenderer(rendererName) {
  var renderer;

  if (typeof options.renderer === "string" && _html2canvas.Renderer[rendererName] !== undefined) {
    renderer = _html2canvas.Renderer[rendererName](options);
  } else if (typeof rendererName === "function") {
    renderer = rendererName(options);
  } else {
    throw new Error("Unknown renderer");
  }

  if ( typeof renderer !== "function" ) {
    throw new Error("Invalid renderer defined");
  }
  return renderer;
}

return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue), _html2canvas);
};

_html2canvas.Util.Support = function (options, doc) {

function supportSVGRendering() {
  var img = new Image(),
  canvas = doc.createElement("canvas"),
  ctx = (canvas.getContext === undefined) ? false : canvas.getContext("2d");
  if (ctx === false) {
    return false;
  }
  canvas.width = canvas.height = 10;
  img.src = [
  "data:image/svg+xml,",
  "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
  "<foreignObject width='10' height='10'>",
  "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
  "sup",
  "</div>",
  "</foreignObject>",
  "</svg>"
  ].join("");
  try {
    ctx.drawImage(img, 0, 0);
    canvas.toDataURL();
  } catch(e) {
    return false;
  }
  h2clog('html2canvas: Parse: SVG powered rendering available');
  return true;
}

// Test whether we can use ranges to measure bounding boxes
// Opera doesn't provide valid bounds.height/bottom even though it supports the method.

function supportRangeBounds() {
  var r, testElement, rangeBounds, rangeHeight, support = false;

  if (doc.createRange) {
    r = doc.createRange();
    if (r.getBoundingClientRect) {
      testElement = doc.createElement('boundtest');
      testElement.style.height = "123px";
      testElement.style.display = "block";
      doc.body.appendChild(testElement);

      r.selectNode(testElement);
      rangeBounds = r.getBoundingClientRect();
      rangeHeight = rangeBounds.height;

      if (rangeHeight === 123) {
        support = true;
      }
      doc.body.removeChild(testElement);
    }
  }

  return support;
}

return {
  rangeBounds: supportRangeBounds(),
  svgRendering: options.svgRendering && supportSVGRendering()
};
};
window.html2canvas = function(elements, opts) {
elements = (elements.length) ? elements : [elements];
var queue,
canvas,
options = {
  // general
  logging: false,
  elements: elements,
  background: "#fff",

  // preload options
  proxy: null,
  timeout: 0,    // no timeout
  useCORS: false, // try to load images as CORS (where available), before falling back to proxy
  allowTaint: false, // whether to allow images to taint the canvas, won't need proxy if set to true

  // parse options
  svgRendering: false, // use svg powered rendering where available (FF11+)
  ignoreElements: "IFRAME|OBJECT|PARAM",
  useOverflow: true,
  letterRendering: false,
  chinese: false,

  // render options

  width: null,
  height: null,
  taintTest: true, // do a taint test with all images before applying to canvas
  renderer: "Canvas"
};

options = _html2canvas.Util.Extend(opts, options);

_html2canvas.logging = options.logging;
options.complete = function( images ) {

  if (typeof options.onpreloaded === "function") {
    if ( options.onpreloaded( images ) === false ) {
      return;
    }
  }
  queue = _html2canvas.Parse( images, options );

  if (typeof options.onparsed === "function") {
    if ( options.onparsed( queue ) === false ) {
      return;
    }
  }

  canvas = _html2canvas.Renderer( queue, options );

  if (typeof options.onrendered === "function") {
    options.onrendered( canvas );
  }


};

// for pages without images, we still want this to be async, i.e. return methods before executing
window.setTimeout( function(){
  _html2canvas.Preload( options );
}, 0 );

return {
  render: function( queue, opts ) {
    return _html2canvas.Renderer( queue, _html2canvas.Util.Extend(opts, options) );
  },
  parse: function( images, opts ) {
    return _html2canvas.Parse( images, _html2canvas.Util.Extend(opts, options) );
  },
  preload: function( opts ) {
    return _html2canvas.Preload( _html2canvas.Util.Extend(opts, options) );
  },
  log: h2clog
};
};

window.html2canvas.log = h2clog; // for renderers
window.html2canvas.Renderer = {
Canvas: undefined // We are assuming this will be used
};
_html2canvas.Renderer.Canvas = function(options) {

options = options || {};

var doc = document,
safeImages = [],
testCanvas = document.createElement("canvas"),
testctx = testCanvas.getContext("2d"),
canvas = options.canvas || doc.createElement('canvas');


function createShape(ctx, args) {
  ctx.beginPath();
  args.forEach(function(arg) {
    ctx[arg.name].apply(ctx, arg['arguments']);
  });
  ctx.closePath();
}

function safeImage(item) {
  if (safeImages.indexOf(item['arguments'][0].src ) === -1) {
    testctx.drawImage(item['arguments'][0], 0, 0);
    try {
      testctx.getImageData(0, 0, 1, 1);
    } catch(e) {
      testCanvas = doc.createElement("canvas");
      testctx = testCanvas.getContext("2d");
      return false;
    }
    safeImages.push(item['arguments'][0].src);
  }
  return true;
}

function isTransparent(backgroundColor) {
  return (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)");
}

function renderItem(ctx, item) {
  switch(item.type){
    case "variable":
      ctx[item.name] = item['arguments'];
      break;
    case "function":
      if (item.name === "createPattern") {
        if (item['arguments'][0].width > 0 && item['arguments'][0].height > 0) {
          try {
            ctx.fillStyle = ctx.createPattern(item['arguments'][0], "repeat");
          }
          catch(e) {
            h2clog("html2canvas: Renderer: Error creating pattern", e.message);
          }
        }
      } else if (item.name === "drawShape") {
        createShape(ctx, item['arguments']);
      } else if (item.name === "drawImage") {
        if (item['arguments'][8] > 0 && item['arguments'][7] > 0) {
          if (!options.taintTest || (options.taintTest && safeImage(item))) {
            ctx.drawImage.apply( ctx, item['arguments'] );
          }
        }
      } else {
        ctx[item.name].apply(ctx, item['arguments']);
      }
      break;
  }
}

return function(zStack, options, doc, queue, _html2canvas) {

  var ctx = canvas.getContext("2d"),
  storageContext,
  i,
  queueLen,
  newCanvas,
  bounds,
  fstyle;

  canvas.width = canvas.style.width =  options.width || zStack.ctx.width;
  canvas.height = canvas.style.height = options.height || zStack.ctx.height;

  fstyle = ctx.fillStyle;
  ctx.fillStyle = (isTransparent(zStack.backgroundColor) && options.background !== undefined) ? options.background : zStack.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fstyle;


  if ( options.svgRendering && zStack.svgRender !== undefined ) {
    // TODO: enable async rendering to support this
    ctx.drawImage( zStack.svgRender, 0, 0 );
  } else {
    for ( i = 0, queueLen = queue.length; i < queueLen; i+=1 ) {
      storageContext = queue.splice(0, 1)[0];
      storageContext.canvasPosition = storageContext.canvasPosition || {};

      // set common settings for canvas
      ctx.textBaseline = "bottom";

      if (storageContext.clip){
        ctx.save();
        ctx.beginPath();
        // console.log(storageContext);
        ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
        ctx.clip();
      }

      if (storageContext.ctx.storage) {
        storageContext.ctx.storage.forEach(renderItem.bind(null, ctx));
      }

      if (storageContext.clip){
        ctx.restore();
      }
    }
  }

  h2clog("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

  queueLen = options.elements.length;

  if (queueLen === 1) {
    if (typeof options.elements[0] === "object" && options.elements[0].nodeName !== "BODY") {
      // crop image to the bounds of selected (single) element
      bounds = _html2canvas.Util.Bounds(options.elements[0]);
      newCanvas = doc.createElement('canvas');
      newCanvas.width = bounds.width;
      newCanvas.height = bounds.height;
      ctx = newCanvas.getContext("2d");

      ctx.drawImage(canvas, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
      canvas = null;
      return newCanvas;
    }
  }

  return canvas;
};
};
})(window,document);