/* ===================================================
 * matching.js v1
 * 
 * ===================================================
 * Copyright 2013 1st American Systems and Services
 *
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

//Selected Item Variables
var selected;
var selected2;
var answer1;
var answer2;
//SoundJS
var audioPath = "media/sounds/";
var manifest = [
    {id:"SelectClick", src:"SelectClick.mp3"},
    {id:"SELECTCLICKwav", src:"SELECTCLICKwav.mp3"},
	{id:"SoundCorrect", src:"SoundCorrect.mp3"},
	{id:"SoundWrong", src:"SoundWrong.mp3"}
];
createjs.Sound.alternateExtensions = ["mp3"];

//END SoundJS 

function init() {
	
	$("#rightSide").html($(".random").children().sort(function() { return 0.5 - Math.random() }));
	
	// if initializeDefaultPlugins returns false, we cannot play sound
    if (!createjs.Sound.initializeDefaultPlugins()) {return;}
	
    // create a manifest and audioPath (above)
    createjs.Sound.addEventListener("loadComplete", handleLoad); 	//SoundJS
    createjs.Sound.registerManifest(manifest, audioPath);			//SoundJS
}
 
 
function handleLoad(event) {
    // Do something with the loaded sound
	handleClick();
}


function handleClick(event) {
    createjs.Sound.play("SelectClick");
	console.log('clicked');
}

var clickable1 = document.getElementsByClassName("clickable1");
var selectEvent1 = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? 'touchstart' : 'click';

    for(var i=0;i<clickable1.length;i++){
        clickable1[i].addEventListener(selectEvent1, handleClick1, false);
    }
	
function handleClick1(event){
	if(!$(this).hasClass('matched')){
		createjs.Sound.play("SelectClick"); // Play Clicked Sound
		// find out if any boxes are selected
		$('.clickable1').removeClass('clicked');
		selected = $("div.clickable1.selected");
		answer1 = $(this).attr('data-answerId');
		console.log(answer1);
		
		
		selected.toggleClass('clicked');
		
		if ($('.clickable2').hasClass('clicked2')){
			
			if (answer1 === answer2 ) {
					createjs.Sound.play("SoundCorrect"); // Play Correct Sound
					
					$(this).removeClass("selected clicked clickable1").addClass("matched").off('click');
					$(".clicked2").removeClass("selected clicked2 clickable2").addClass("matched").off('click');
					console.log('matched, Correct!' + selected2.attr('data-answerId'));
					$('.feedbackBox').fadeOut(0).text("Correct!").fadeIn(800);
					
				}
				else {
					// if we didn't match, send the click event to whatever was selected to deselect it
					//selected.click();
					createjs.Sound.play("SoundWrong"); // Play Correct Sound
					$(".clicked").removeClass("selected clicked");
					$(".clicked2").removeClass("selected clicked2");
					console.log('Not matched' + answer2);
					$('.feedbackBox').fadeOut(0).text("Incorrect. Try Again").fadeIn(800);
				  	}
		} 
		else {
				// if nothing else was selected, this element should toggle.
				$(this).toggleClass('clicked');
		}
	}
	if(($('.clickable1').length + $('.clickable2').length) === 0) {
			$('.feedbackBox').hide();
			$('#rightSideCont').hide().html("<div id='finished'><h1>Congratulations!</h1><p>You found all the matches.</p><p class='gray'>Click 'Exit' to continue.</p></div>").fadeIn();
	}
	
}

var clickable2 = document.getElementsByClassName("clickable2");
var selectEvent2 = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? 'touchstart' : 'click';

    for(var i=0;i<clickable2.length;i++){
        clickable2[i].addEventListener(selectEvent2, handleClick2, false);
    }
	
function handleClick2(event){
	if(!$(this).hasClass('matched')){
	createjs.Sound.play("SelectClick"); // Play Clicked Sound
	$('.clickable2').removeClass('clicked2');
    selected2 = $("div.clickable2.selected");
	answer2 = $(this).attr('data-answerId');
	console.log($(this).attr('data-answerId'));
	
	if ($('.clickable1').hasClass('clicked')){
		selected2.toggleClass('clicked2');
		
		console.log(selected2.answer2);
	  // if the selected box is our match, add the matched class
	  // your stylesheet can determine matched means invisible, special location, whatever
		 if (answer2 === answer1 ) {
			 	createjs.Sound.play("SoundCorrect"); // Play Correct Sound
				$(".clicked").removeClass("selected clicked clickable1").addClass("matched").off('click');
				$(this).removeClass("selected clicked2 clickable2").addClass("matched").off('click');
				console.log('matched, Correct!' + selected2.attr('data-answerId'));
				$('.feedbackBox').fadeOut(0).text("Correct!").fadeIn(800);
		 }
		  
		  else {
			// if we didn't match, send the click event to whatever was selected to deselect it
			//selected.click();
			createjs.Sound.play("SoundWrong"); // Play Correct Sound
			$(".clicked").removeClass("selected clicked");
			$(".clicked2").removeClass("selected clicked2");
			$('.feedbackBox').fadeOut(0).text("Incorrect. Try Again").fadeIn(800);
		  }
		} 
		else {
			// if nothing else was selected, this element should toggle.
			$(this).toggleClass('clicked2');
		}
	}
	if(($('.clickable1').length + $('.clickable2').length) === 0) {
			$('.feedbackBox').hide();
			$('#rightSideCont').hide().html("<div id='finished'><h1>Congratulations!</h1><p>You found all the matches.</p><p class='gray'>Click 'Exit' to continue.</p></div>").fadeIn();
	}
}