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
    // create a manifest and audioPath (above)
    createjs.Sound.addEventListener("loadComplete", handleLoad); 	//SoundJS
    createjs.Sound.registerManifest(manifest, audioPath);			//SoundJS
}
 
var pause_timer:Timer;
var pause_timer2:Timer;
var pause_timer3:Timer;
var counter = 18; //total number of tiles
var components:Array = new Array(1,2,3,4,5,6,7,8,9);
var wordbank:Array = new Array(1,2,3,4,5,6,7,8,9);
//var intro:startPage = new startPage();		
//var button:startBtn = new startBtn();
//var numberOfPairs:int = 9;
var first_clicked = 0;
var second_clicked = 0;
var clickedItems:Array = new Array(null,null);
var correct:correct_feedback = new correct_feedback();
var incorrect:incorrect_feedback = new incorrect_feedback();
var glow:GlowFilter = new GlowFilter(); 
var stopTheClicking = false;
	
	//populate with tiles
	function match_test() {

		for (x=1; x<=3; x++) {
			for (y=1; y<=3; y++) {				
			
				var random_card = Math.floor(Math.random()*wordbank.length);
				var tile:wordbankArray = new wordbankArray();		
				tile.col = wordbank[random_card];
				wordbank.splice(random_card,1);
				tile.gotoAndStop(tile.col);
				tile.x = ((x-1)*131)+550;
				tile.y = ((y-1)*126)+200;		
				tile.name = "wb" + tile.col;
				tile.addEventListener(MouseEvent.CLICK,tile_clicked);		
				addChild(tile);	
				tile.buttonMode = true;
				if(wordbank.length == 0)
					break;
			}
		}	

			var comp0:componentsArray = new componentsArray();		
			var comp1:componentsArray = new componentsArray();
			var comp2:componentsArray = new componentsArray();
			var comp3:componentsArray = new componentsArray();
			var comp4:componentsArray = new componentsArray();
			var comp5:componentsArray = new componentsArray();
			var comp6:componentsArray = new componentsArray();
			var comp7:componentsArray = new componentsArray();
			var comp8:componentsArray = new componentsArray();
			
			comp0.col = components[0];
			comp0.gotoAndStop(comp0.col);
			comp0.x = 435.25;
			comp0.y = 231.75;
			comp0.name = "comp1";
			comp0.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp0);
			
			comp1.col = components[1];
			comp1.gotoAndStop(comp1.col);
			comp1.x = 422.9;
			comp1.y = 261.25;
			comp1.name = "comp2";
			comp1.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp1);
			
			comp2.col = components[2];
			comp2.gotoAndStop(comp2.col);
			comp2.x = 422.9;
			comp2.y = 280.15;
			comp2.name = "comp3";
			comp2.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp2);
			
			comp3.col = components[3];
			comp3.gotoAndStop(comp3.col);
			comp3.x = 434.15;
			comp3.y = 381.90;
			comp3.name = "comp4";
			comp3.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp3);
			
			comp4.col = components[4];
			comp4.gotoAndStop(comp4.col);
			comp4.x = 426.35;
			comp4.y = 408.50;
			comp4.name = "comp5";
			comp4.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp4);
			
			comp5.col = components[5];
			comp5.gotoAndStop(comp5.col);
			comp5.x = 414.25;
			comp5.y = 463.45;
			comp5.name = "comp6";
			comp5.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp5);
			
			comp6.col = components[6];
			comp6.gotoAndStop(comp6.col);
			comp6.x = 434.65;
			comp6.y = 463.45;
			comp6.name = "comp7";
			comp6.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp6);
			
			comp7.col = components[7];
			comp7.gotoAndStop(comp7.col);
			comp7.x = 454.05;
			comp7.y = 463.45;
			comp7.name = "comp8";
			comp7.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp7);
			
			comp8.col = components[8];
			comp8.gotoAndStop(comp8.col);
			comp8.x = 421.45;
			comp8.y = 231.75;
			comp8.name = "comp9";
			comp8.addEventListener(MouseEvent.CLICK,tile_clicked);	
			addChild(comp8);
	}
	
	
	//if tile is clicked
	public function tile_clicked(event:MouseEvent) {
		var clicked:wordbankArray = (event.currentTarget as wordbankArray);
		var clickedElement:String = null;
		
		clickedElement = event.currentTarget.name;
		
		//trace(clickedElement);
		if(!stopTheClicking){
			if(clickedElement.substring(0,2) == "wb"){ //wordbank tile was clicked
				
				// if something is already stored here, turn off filters before reassigning clickedItems[0]
				// added || clickedItems[0] == clickedElement
				if (clickedItems[0] != null || clickedItems[0] == clickedElement){
					getChildByName(clickedItems[0]).filters = undefined;
				}
				
				// added if statement and moved rest of code to else block				
				if(clickedItems[0] == clickedElement) // clickedElement is a string retrieved from event.currentTarget.name
					clickedItems[0] = null;
				else{ 
					clickedItems[0] = clickedElement;
					
					first_clicked = parseInt(clickedElement.substring(2)); //assign value to first clicked tile
					
					glow.color = 0x1673b6; 
					glow.alpha = 1; 
					glow.blurX = 10; 
					glow.blurY = 10; 
					glow.quality = BitmapFilterQuality.HIGH; 
					glow.inner = false;
					glow.knockout = false;
							 
					getChildByName(clickedItems[0]).filters = [glow];
					
					
					
					var mysound:SelectClick = new SelectClick(); 
					mysound.play();	
					
					if(clickedItems[1] != null){
						check_answer();
					}
				}
			}// end if(clickedElement.subString(0,2) == "wb")
			else{   //components was clicked
			
				// if something is already stored here, turn off filters before reassigning clickedItems[0]
				// added || clickedItems[1] == clickedElement
				if (clickedItems[1] != null || clickedItems[1] == clickedElement){
					getChildByName(clickedItems[1]).filters = undefined;
				}
				
				// added if statement and moved rest of code to else block
				if(clickedItems[1] == clickedElement)
					clickedItems[1] = null;
				else{ 
					clickedItems[1] = clickedElement;
					second_clicked = parseInt(clickedElement.substring(4)); //assign value to second clicked tile
					
					glow.color = 0x1673b6; 
					glow.alpha = 1; 
					glow.blurX = 5; 
					glow.blurY = 5; 
					glow.quality = BitmapFilterQuality.HIGH; 
					glow.inner = false;
					glow.knockout = false;
							 
					getChildByName(clickedItems[1]).filters = [glow];
					
					
					
					//trace('correct');
					if(clickedItems[0] != null){
						check_answer();
					}// end if(clickedItems[0] != null)
				}// end else for if(clickedItems[1] == clickedElement)
			}// end else
		}// end if(!stopTheClicking)
		
	}
	
	public function check_answer(){
		stopTheClicking = true;
				if(first_clicked == second_clicked){   //correct
					var mysound1:SoundCorrect = new SoundCorrect(); 
					mysound1.play();
					glow.color = 0x1673b6; 
					glow.alpha = 1; 
					glow.blurX = 15; 
					glow.blurY = 15; 
					glow.quality = BitmapFilterQuality.MEDIUM; 
					glow.inner = false;
					glow.knockout = false;
					 
					getChildByName(clickedItems[0]).filters = [glow];
					getChildByName(clickedItems[1]).filters = [glow];
					
					var mysound3:SelectClick = new SelectClick(); 
					mysound3.play();
					
					//trace('correct');
					correct.x = 600;
					correct.y = 600;
					addChild(correct);
					pause_timer = new Timer(1000,1);
					pause_timer.addEventListener(TimerEvent.TIMER_COMPLETE,remove_tiles);
					pause_timer.start();
					
					
				}
				else{		//incorrect
					
					var mysound2:SoundWrong = new SoundWrong();
					mysound2.play();
					//trace('incorrect');
					incorrect.x = 600;
					incorrect.y = 600;
					addChild(incorrect);
					pause_timer = new Timer(1000,1);
					pause_timer.addEventListener(TimerEvent.TIMER_COMPLETE,reset_tiles);
					pause_timer.start();
					
				}
		
		}
	
	
	//reset tiles
	public function reset_tiles(event:TimerEvent) {
		
		//trace('reset');
		getChildByName(clickedItems[0]).filters = undefined;
		getChildByName(clickedItems[1]).filters = undefined;
		clickedItems[0] = null;
		clickedItems[1] = null;
		removeChild(incorrect);
		stopTheClicking = false;
		
	}
	//remove tiles
	public function remove_tiles(event:TimerEvent) {
		
		//trace('remove');
		//trace(clickedItems[0]);
		getChildByName(clickedItems[0]).alpha = .5;
		var wbBut:SimpleButton = MovieClip(   MovieClip(    getChildByName(clickedItems[0])   ).getChildAt(0)   ).getChildAt(0) as SimpleButton;//.enabled = false;
		wbBut.enabled = false;
		getChildByName(clickedItems[0]).removeEventListener(MouseEvent.CLICK,tile_clicked);
		//getChildByName(clickedItems[0]).visible = false;

		getChildByName(clickedItems[1]).alpha = .5;

		//create a SimpleButton that holds a reference to the button on the current key frame of the component MovieClip object being used
		var but:SimpleButton = MovieClip(getChildByName(clickedItems[1])).getChildAt(0) as SimpleButton;
		but.enabled = false;
		
		getChildByName(clickedItems[1]).removeEventListener(MouseEvent.CLICK,tile_clicked);
		//getChildByName(clickedItems[1]).visible = false;
		removeChild(correct);
		
		getChildByName(clickedItems[0]).filters = undefined;
		getChildByName(clickedItems[1]).filters = undefined;
		clickedItems[0] = null;
		clickedItems[1] = null;
		
		counter = counter-2;
		if(counter == 0)
		{
			for(var i:Number = 1; i < 10; i++){
				var objName = "wb"+i;
				var tmpMC:MovieClip = getChildByName(objName) as MovieClip;
				removeChild(tmpMC);
			}// end for loop
			
			var theEnd:congratulations = new congratulations();
			theEnd.x = 495;
			theEnd.y = 310;
			addChild(theEnd);
			//correct sound ****************************
			var mysound1:SoundCorrect = new SoundCorrect(); 
			mysound1.play();
		}
		stopTheClicking = false;
	}	

}