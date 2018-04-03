var thumbnailArray;
var tnArray;
var matchNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
var matchArray = [];
var idArray = [ 'one', 
				'two', 
				'three', 
				'four', 
				'five', 
				'six', 
				'seven',
				'eight',
				'nine',
				'ten',
				'eleven',
				'twelve',
				'thirteen',
				'fourteen',
				'fifteen',
				'sixteen'];
var lit;
var counter;
var counter1;
var counter2;
var openBoxes = 0;
var moveCount = 0; 
var matches = 0;

$(document).ready(function () {
	init();
});

$('#start').click(function() {
	
	document.getElementById('start').style.display = "none";
	location.reload();
		
});

//populate the array and add the events  
function init()
{ 
		
	thumbnailArray = $('.thumbnail');
	tnArray = $('h6');
	
	var l = thumbnailArray.length;
		for( i = 0; i < l; i++ )

			{
				var boxh = $('.thumbnail').width();	
				var marginTop = Math.round((boxh / 100) * 15);
				var lineH = (Math.round((boxh / 100) * 50) + 'px');
				var fontS = (Math.round((boxh / 100) * 40) + 'px');
				$(thumbnailArray[i]).css( 'height', boxh) 
								.css( 'background-color', 'green');
				$(tnArray[i]).css( {'margin-top': marginTop, 'line-height': lineH, 'font-size': fontS} );
			}

	$(window).on('resize', function(){
		var l = thumbnailArray.length;
			for( i = 0; i < l; i++ )
	
			{
				var boxh = $('.thumbnail').width();
				var marginTop = Math.round((boxh / 100) * 15);
				var lineH = (Math.round((boxh / 100) * 50) + 'px');
				var fontS = (Math.round((boxh / 100) * 40) + 'px');	
				$(thumbnailArray[i]).css( 'height', boxh);
				$(tnArray[i]).css( {'margin-top': marginTop, 'line-height': lineH, 'font-size': fontS} );
			}
	});
	
	shuffle(matchNumbers, matchArray);
	fill(matchArray, tnArray);
			
	$(thumbnailArray).click( function(){ 
		
		counter = $(thumbnailArray).index(this);
		doMouseClick(this); 
		
		if (matches === 8) {
			document.getElementById('moveCount').innerHTML = ('You win with ' + moveCount + ' moves!');
			document.getElementById('start').style.display = "block";
		}
		
	});
	
}

function doMouseClick( _clickedObject ) {
	
	/* if first time through, the counter is at 0, show the number and save the array position of the clicked object */
	
	if (openBoxes === 0) {
		//alert( 'thumbArray [i] ' +  i , 'counter ' + counter);
		$(tnArray[counter]).css('display', 'block');
		counter1 = counter;
		moveCount++;
		document.getElementById('moveCount').innerHTML = ('Moves: ' + moveCount);
		openBoxes++;
	}	
	/* 
		if the counter is at 1, save the counters, show second number and do an equivalence test.
		if equal change background to red, leave numbers showing, make them non-clickable.
	*/
	else if (openBoxes === 1)
	{
		if (counter !== counter1) {
			counter2 = counter1;
			counter1 = counter;
		}
			
		$(tnArray[counter1]).css('display', 'block');
		openBoxes++; // open boxes is incremented to two in case of non-match event
		moveCount++;
		document.getElementById('moveCount').innerHTML = ('Moves: ' + moveCount);
		if (tnArray[counter1].innerHTML === tnArray[counter2].innerHTML)
		{
			$(thumbnailArray[counter1]).css( 'background-color','#FF0000', 'pointer-events', 'none' );
			$(thumbnailArray[counter2]).css( 'background-color','#FF0000', 'pointer-events', 'none' );
			$(thumbnailArray[counter1]).addClass('match');
			$(thumbnailArray[counter2]).addClass('match');
			counter1 = counter;
			matches++;
			moveCount++;
			document.getElementById('moveCount').innerHTML = ('Moves: ' + moveCount);
			openBoxes = 0; // if you have a match, both boxers will be disabled and open boxes set to zero		}
		}
	}
	else if (openBoxes === 2)
	{
			openBoxes = 1;
			$(tnArray[counter1]).css('display', 'none');
			$(tnArray[counter2]).css('display', 'none');
			$(tnArray[counter]).css('display', 'block');
			counter1 = counter;
			moveCount++;
			document.getElementById('moveCount').innerHTML = ('Moves: ' + moveCount);
	}

}

function shuffle(matchNumbers, matchArray) {
  var n = matchNumbers.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * matchNumbers.length);

    // If not already shuffled, move it to the new array.
    if (i in matchNumbers) {
      matchArray.push(matchNumbers[i]);
      delete matchNumbers[i];
      n--;
    }
  }

  return matchArray;
}


function fill(matchArray) {
	
	// fill squares with shuffled numbers from shuffle function	
	var l = idArray.length;
	for( i = 0; i < l; i++ )
		{
			document.getElementById(idArray[i]).innerHTML = matchArray[i];
		}
		
};

function empty(matchArray) {
	
	// fill squares with shuffled numbers from shuffle function	
	var l = idArray.length;
	for( i = 0; i < l; i++ )
		{
			document.getElementById(idArray[i]).innerHTML = '';
		}
		
};


//alert( 'thumbArray [i] ' +  i );
