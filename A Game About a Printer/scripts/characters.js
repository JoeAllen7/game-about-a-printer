////////////////
// CHARACTERS //
////////////////

var characters = [];        //Aray of all chacacters in the game
var characterImages = [];   //Array of images for each character
var currentInteraction;     //The current interaction to show in the UI

//Character events
var hasBossBathOccured = false;
var showBossBath = false;

//Instantiate character objects and add them to the characters array
function setupCharacters() {

    //Create the Boss character
    var characterBoss = new character("Boss", 486, 221, 0, 0,
    //Talk 1 (Briefing) | First time
        //Interaction 0
        [new interaction("Well, if it isn't my most valued worker, umm... Remind me of your name?", "", true,
            [""], [0], [1], 0, true),
        //Interaction 1
        new interaction("[[name]], that's it! You know me, always forgetting things. What am I like?", "", false,
            ["You must be getting old, boss!", "Don't worry about it", "That *is* the 3rd time you've asked me today"], [-1, 0, -1], [2, 3, 4], 1, true),
        //Interaction 2
        new interaction("Getting old? Not a chance! You know me, I don't age!", "", false,
            ["Your wrinkles tell a different story", "What was it you wanted to ask me?"], [-1, 0], [5, 5], 0, true),
        //Interaction 3
        new interaction("Oh, I won't. You know me, I don't worry. Leave that to the snowflakes of today, eh?", "", false,
            ["*Smile and move on*"], [0], [5], 0, true),
        //Interaction 4
        new interaction("I'm not sure I like your tone.", "", false,
            ["I'm not sure I like *yours*", "I didn't mean to offend you"], [-100, 0], [5, 5], 0, true),
        //Interaction 5
        new interaction("I could do with getting this document printed. I've sent it from the old computing device, but I can't get the printing machine to spit it out. You know me, always struggling with the new gizmos. Get that done for me, will you? Oh, and make it snappy. It's a *very* important piece of paper!", "", false,
            ["Absolutely", "If I have to"], [0, -1], [6, 6], 2, false),
    //Talk 1 | Subsequent times
        //Interaction 6
        new interaction("Why are you still here? Find the printer and get that document printed! Pronto!", "", false,
            ["Got it"], [-1], [6], 1, false),
    //Talk 2 (Bath) | First time
        //Interaction 7
        new interaction("What are you doing in here?! Get out! Get *out*! This is my private space! My, err… my thinking room! I come here to think. And… and bathe.", "", false,
            ["Sorry! I'll just leave", "I thought your office was your private space", "Can I take baths at work?"], [-1, -1, -1], [8, 9, 10], 2, true),
        //Interaction 8
        new interaction("Yes. I think that would be best. Go find that printer.", "", false,
            ["Okay"], [0], [11], 0, false),
        //Interaction 9
        new interaction("Oh, did you? Well *I* didn't think it was any of your business. I suggest you leave. Go find that printer.", "", false,
            ["Okay", "How about *no*?"], [-1, -100], [11, 11], 1, false),
        //Interaction 10
        new interaction("Absolutely not. This is Boss stuff, you wouldn't understand. Now go and find that printer.", "", false,
            ["Okay"], [0], [11], 1, false),
    //Talk 2 | Subsequent times
        //Interaction 11
        new interaction("I told you to get *out*!", "Leave! NOW!", false,
            ["Will do"], [-1], [11], 0, false),
    //Talk 3 (Caught in the office) | First time
        //Interaction 12
        new interaction("I hope you have a good reason for snooping around in my office, [[name]].", "", false,
            ["I need this key to access floor 5!", "What's this business with the Queen?"], [0, -1], [13, 15], 0, true),
        //Interaction 13
        new interaction("I see. Then how about this - Take the key, and leave my office as quickly as humanly possible. Deal?", "", false,
            ["Deal", "What you're doing isn't right"], [0, 0], [14, 15], 0, true),
        //Interaction 14
        new interaction("Excellent. Now do the right thing and print me off that document.", "", false,
            ["Okay"], [0], [18], 0, false),
        //Interaction 15
            new interaction("What I'm doing is of no importance to you, [[name]]. Now here's an idea for you - forget everything you've seen in this room, leave promptly, print off my *private* document, and get on with your sad life. Capeesh?", "", false,
                ["Understood", "I'm not going to let this go"], [0, 0], [16, 17], 2, true),
        //Interaction 16
        new interaction("I'm glad you know what's good for you.", "", false,
            ["*End conversation*"], [0], [18], 0, false),
        //Interaction 17
        new interaction("Then I'll have to let you go.", "", false,
            ["*End conversation*"], [-100], [18], 0, false),
        //Interaction 18
        new interaction("Get out of my office.", "Leave this office right now, [[name]].", false,
            ["Okay"], [-1], [18], 0, false)
        ]);
    characters.push(characterBoss);
    var bossImage = new Image(); bossImage.src = "images/characterBoss.png";
    characterImages.push(bossImage);

    //Worker 1 :: Floor 0
    var characterMitch = new character("Mitch", 1000, 280, 0, 0,
        //Interaction 0
        [new interaction("Anything you need my friend?", "Did you want to ask me something, friend-o?", false,
            ["Not really", "Where's the printer?"], [0, 0], [1, 2], 0, true),
        //Interaction 1
        new interaction("Okay, if you need anything just ask.", "", false,
            ["Okay"], [0], [0], 0, false),
        //Interaction 2
        new interaction("Hmm... I can't say I know for sure, but it's definitely on one of the upper floors. I'm sure someone else can help!", "", false,
            ["Okay"], [0], [3], 0, true),
        //Interaction 3
        new interaction("Oh, by the way - the stairs are out of order again. There's oil cascading down every step apparently. Who knew we even used oil! It's probably Jill's fault, she managed to break the staff room floor last week so at this point anything's possible.", "", false,
            ["How do I get upstairs?", "So I'll have to use the lift?"], [0, 0], [4, 4], 2, true),
        //Interaction 4
        new interaction("The dodgy lift is your only option I'm afraid. That thing has a mind of its own, I had a right game trying to reach the top floor the other day. Hopefully you'll have more luck!", "", false,
            ["Thank you", "Let's hope so!"], [0, 0], [5, 5], 2, false),
        //Interaction 5
        new interaction("Good luck with that lift!", "Hope the lift doesn't give you too much trouble!", false,
            ["Thanks Mitch"], [0], [5], 1, false)
        ]);
    characters.push(characterMitch);
    var mitchImage = new Image(); mitchImage.src = "images/characterMitch.png";
    characterImages.push(mitchImage);

    //Worker 2 :: Floor 1
    var characterCarol = new character("Carol", 200, 100, 1, 0,
        //Interaction 0
        [new interaction("I AM CAROL!", "", false,
            ["That's nice", "Good to know", "Are you okay?"], [0, 0, 0], [1, 1, 1], 0, true),
        //Interaction 1
        new interaction("I AM HUMAN WORKING IN OFFICE. I ENJOY OFFICE TASKS. WORK FULFILLS MY HUMAN NEEDS.", "", false,
            ["You're very... enthusiastic", "I'm glad you enjoy your job"], [0, 0], [2, 3], 0, true),
        //Interaction 2
        new interaction("ENTHUSIASM IS CRUCIAL HUMAN EMOTION.", "", false,
            ["Indeed", "I'm going to leave now"], [0, 0], [4, 4], 0, false),
        //Interaction 3
        new interaction("THANK. I AM ENJOY JOB WITH THOROUGHNESS.", "", false,
            ["Great", "I'm going to leave now"], [0, 0], [4, 4], 0, false),
        //Interaction 4
        new interaction("I AM CAROL!!", "I SEE YOU WITH MY HUMAN EYES.", false,
            ["Okay..."], [0], [4], 0, false)
        ]);
    characters.push(characterCarol);
    var carolImage = new Image(); carolImage.src = "images/characterCarol.png";
    characterImages.push(carolImage);

    //Worker 3 :: Floor 1
    var characterJill = new character("Jill", 1000, 320, 1, 0,
        //Interaction 0
        [new interaction("Do you mind if I ask you something?", "Can I ask you a question?", false,
            ["Go ahead", "I was going to ask *you* something"], [0, 0], [1, 4], 0, true),
        //Interaction 1
        new interaction("I'm probably crazy, but I feel like there's something... 'off'... about the Boss? Do you think so?", "", false,
            ["I was going to say the same thing!", "Yes! And some others, too"], [0, 0], [2, 3], 0, true),
        //Interaction 2
        new interaction("Oh, that's a relief! I tried talking to Carol about it but couldn't get a straight answer from her. In fact, she's a strange one too.", "", false,
            ["She certainly is", "How unusual"], [0, 0], [5, 5], 0, true),
        //Interaction 3
        new interaction("So I'm not crazy! HAH! If the office wasn't such a dull place I'd think something was going on...", "", false,
            ["Maybe it's not such a dull place", "It's probably nothing"], [0, 0], [5, 5], 0, true),
        //Interaction 4
        new interaction("Oh, do you mind if I go first? It's just, this has been on my mind for a while now.", "", false,
            ["Sure", "What is it?"], [0, 0], [1, 1], 0, true),
        //Interaction 5
        new interaction("Yeah. There sure are a lot of strange people around.", "", false,
            ["Yes there are"], [0], [6], 0, false),
        //Interaction 6
        new interaction("All these weirdos are giving me the spooks!", "", false,
            ["*Laugh politely*", "Me too"], [0, 0], [6, 6], 0, false)
        ]);
    characters.push(characterJill);
    var jillImage = new Image(); jillImage.src = "images/characterJill.png";
    characterImages.push(jillImage);

    //Picture of Queen :: Floor 1
    var characterQueenPic = new character("Viewing Queen Picture", 1197, 230, 1, 0,
        //Interaction 0
        [new interaction("I wonder why the Boss put up that picture of the queen...", "The Boss sure seems to be a fan of the queen...", false,
            ["*Stop viewing*"], [0], [0], 0, false)
        ]);
    characters.push(characterQueenPic);
    var queenPicImage = new Image(); queenPicImage.src = "images/characterQueenPic.png";
    characterImages.push(queenPicImage);

    //Worker 4 :: Floor 3
    var characterGregg = new character("Gregg", 496, 221, 3, 0,
        //Interaction 0
        [new interaction("Hey there!", "", false,
            ["Hi Gregg!"], [0], [1], 0, true),
        //Interaction 1
        new interaction("Look, I'm not trying to be rude, but you've been saying my name wrong ever since I met you, [[name]].", "", false,
            ["Your name's not Gregg?", "How do I say it?"], [0, 0], [2, 2], 0, true),
        //Interaction 2
        new interaction("It's like Gregg, but the 'G' and 'R' are silent.", "", false,
            ["Your name is... egg?", "You're joking with me, right?"], [0, 0], [3, 3], 0, true),
        //Interaction 3
        new interaction("My name is egg. ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ I am egg.", "", false,
            ["Do you have a key to floor 5, 'egg?", "Can you help me find the printer?"], [0, 0], [4, 5], 0, true),
        //Interaction 4
        new interaction("The Boss keeps all the keys in his office. You'll have to go in there. I think it's open.", "", false,
            ["Thank you Gr... 'egg", "Are you sure I'm allowed in there?"], [0, 0], [6, 7], 0, true),
        //Interaction 5
        new interaction("You have to go via floor 5 to get to the printer. The Boss keeps floor 5 locked, so you'll need to get the key.", "", false,
            ["How do I get the key?"], [0], [4], 0, true),
        //Interaction 6
        new interaction("Not a problem! Go get that key!", "", false,
            ["I will!"], [0], [8], 0, false),
        //Interaction 7
        new interaction("I don't see why not. It's the only way you're gonna get that key!", "", false,
            ["Okay"], [0], [8], 0, false),
        //Interaction 8
        new interaction("What are you still doing here? Go print that thing!", "You're still here? You must find this floor more interesting than me!", false,
            ["*End conversation*"], [0], [8], 0, false),
        ]);
    characters.push(characterGregg);
    var greggImage = new Image(); greggImage.src = "images/characterGregg.png";
    characterImages.push(greggImage);

    //Worker 5 :: Floor 4
    var characterJamie = new character("Jamie", 130, 320, 4, 0,
        //Interaction 0
        [new interaction("That broken elevator has turned this place into a maze!", "", false,
            ["Why's it like that?", "Do you know your way around?"], [0, 0], [1, 2], 0, true),
        //Interaction 1
        new interaction("I have no idea. There's talk the Boss did it on purpose just to mess with us. Seems like something he would do.", "", false,
            ["But he can't even use a printer", "He is quite unpleasant"], [0, 0], [3, 4], 1, true),
        //Interaction 2
        new interaction("I thought I knew my way around yesterday, but I swear the buttons that work on each floor have changed. No matter where you're trying to go, I'd recommend staying away from floor 2. I was there the other day and, well... I still haven't quite recovered from what I saw.", "", false,
            ["Was it something suspicious?", "I've been there", "Sounds terrible"], [0, 0, 0], [5, 6, 4], 2, true),
        //Interaction 3
        new interaction("Funny you should say that. I saw him trying to use the printer the other day. He was kicking it, shaking it, calling it every name under the sun - everything except for pressing the right button. I probably should have helped but I kind of liked seeing him struggle.", "", false,
            ["So you know where the printer is?"], [0], [7], 2, true),
        //Interaction 4
        new interaction("Indeed. Anyway, have a nice day! I have to get some work done. While standing here. Motionless.", "", false,
            ["Have fun with that", "You have a great day too"], [0, 0], [10, 10], 1, false),
        //Interaction 5
        new interaction("Not suspicious. Just disturbing.", "", false,
            ["This place keeps getting stranger"], [0], [4], 0, true),
        //Interaction 6
        new interaction("Oh, you have? I'm glad I'm not the only one who has to live with that image in my head. I'll never be able to take a bath again.", "", false,
            ["Me neither", "I'm gonna go find the printer"], [0, 0], [9, 8], 1, true),
        //Interaction 7
        new interaction("Yep! It was on the 3rd... no, no, wait - 5th floor. 5th? Yeah, that was it. I think. Something like that.", "", false,
            ["I'll head towards floor 5 then", "I'm sure I'll find it"], [0, 0], [8, 8], 1, true),
        //Interaction 8
        new interaction("Good luck!", "", false,
            ["Thank you"], [0], [10], 0, false),
        //Interaction 9
        new interaction("Anyway, I'll let you get on with your day.", "", false,
            ["Okay. Have a good one!", "See you soon"], [0, 0], [10, 10], 0, false),
        //Interaction 10
        new interaction("Can't talk right now. Working very hard. On my breathing exercises. *inhale*... *exhale*...", "Can't talk right now. I'm focusing... extreeeeemely hard... on that wall. If it moves, I'll know about it.", false,
            ["Okay", "Interesting"], [0, 0], [10, 10], 1, false)]);
    characters.push(characterJamie);
    var jamieImage = new Image(); jamieImage.src = "images/characterJamie.png";
    characterImages.push(jamieImage);

    //Worker 6 :: Floor 5
    var characterLily = new character("Lily", 500, 300, 5, 0,
        //Interaction 0
        [new interaction("It's not often we see you up on floor 5, [[name]]! Is everything okay?", "", false,
            ["I'm trying to find the printer", "Everything's fine"], [0, 0], [1, 2], 0, true),
        //Interaction 1
        new interaction("The printer? It's just up there on the 6th floor! No idea who thought putting it right at the top of the office was a good idea.", "", false,
            ["Thank you!"], [0], [5], 0, false),
        //Interaction 2
        new interaction("That's good. Wish I could say the same - I'm having a real bad hair day today.", "", false,
            ["It looks good!", "You look... different"], [0, 0], [3, 4], 0, true),
        //Interaction 3
        new interaction("Oh thank you! I guess it would't be so bad if 'iced gem' was the look I was going for. Which it isn't. But still, thanks!", "", false,
            ["No problem!"], [0], [5], 0, false),
        //Interaction 4
        new interaction("I like being different. Maybe not quite to this extent, though. I'm gonna go find a hairbrush.", "", false,
            ["Okay"], [0], [5], 0, false),
        //Interaction 5
        new interaction("I'm looking for a hairbrush, but I can't seem to find one. Maybe I should try moving from this position. Nah - sounds too difficult.", "", false,
            ["Moving is overrated", "Hope you find one"], [0, 0], [5, 5], 0, false)
        ]);
    characters.push(characterLily);
    var lilyImage = new Image(); lilyImage.src = "images/characterLily.png";
    characterImages.push(lilyImage);

    //Worker 7 :: Floor 5
    var characterArlo = new character("Arlo", 150, 100, 5, 0,
        //Interaction 0
        [new interaction("Everything okay there, fella? You look like you've seen a ghost!", "", false,
            ["Absolutely fine", "Nothing strange here", "There's something going on with the Boss"], [0, 0, 0], [1, 1, 2], 0, true),
        //Interaction 1
        new interaction("Oh good, sorry for assuming! I guess you just always look like... that.", "", false,
            ["Charming!", "*End conversation*"], [0, 0], [7, 7], 1, false),
        //Interaction 2
        new interaction("The Boss, huh? Oh, you mean that new stuffed giraffe head he bought? It *is* pretty messed up.", "", false,
            ["Yep, that's it", "No, it's something more serious"], [0, 0], [3, 4], 1, true),
        //Interaction 3
        new interaction("That explains it then. I call it Phil the giraffe, it's much less disturbing if you give it a name.", "", false,
            ["I feel better already", "What a lovely name"], [0, 0], [7, 7], 1, false),
        //Interaction 4
        new interaction("I see. I'm not interested then, I don't do serious. Life's much more enjoyable if you don't think about all the bad things that happen.", "", false,
            ["Maybe I shouldn't worry", "Isn't that just being ignorant?"], [0, 0], [5, 6], 2, true),
        //Interaction 5
        new interaction("That's the spirit! Hakuna matata and all that. It's what Phil the giraffe would have wanted.", "", false,
            ["Hakuna matata!"], [0], [7], 1, false),
        //Interaction 6
        new interaction("Ignorance is bliss my friend!", "", false,
            ["*End conversation*"], [0], [7], 0, false),
        //Interaction 7
        new interaction("That giraffe sure looks peaceful. And bendy.", "We should really get some furnature in this room.", false,
            ["*End conversation*"], [0], [7], 0, false),
        ]);
    characters.push(characterArlo);
    var arloImage = new Image(); arloImage.src = "images/characterArlo.png";
    characterImages.push(arloImage);

    //Printer confirmation message :: Floor 7
    var printConfirmation = new character("Sent to Printer", 0, 0, 7, 0,
        [new interaction("You sent the Boss' email to the printer.", "", false, ["Okay"], [0], [0], 0, false)]);
    characters.push(printConfirmation);
    characterImages.push(null);

    //Elevator not usable message :: Floor 0
    var elevatorMessage = new character("Can't use Elevator", 0, 0, 7, 0,
        [new interaction("Try talking to your Boss before using the elevator.", "", false, ["Okay"], [0], [0], 0, false)]);
    characters.push(elevatorMessage);
    characterImages.push(null);
}

function getCharacterWithName(name) {
    //Loop through all characters until one with the passed name is found, then return it
    for (var i = 0; i < characters.length; i++) {
        if (characters[i].name === name) {
            return characters[i];
        }
    }
    //If no character with the given name is found, write a message to the console & return null
    console.log("Trying to get character with name that does not exist");
    return null;
}

//Character object constructor
function character(name, xPos, yPos, floorNum, startIndex, interactions) {
    this.interactionIndex = startIndex;
    this.name = name;
    this.xPos = xPos;
    this.yPos = yPos;
    this.floorNum = floorNum;
    this.startIndex = startIndex;
    this.interactions = interactions;
    this.button = new customButton(xPos, yPos, 116, 224); //Custom button with the bounds for this character
}

//Used to start interacting with a character
character.prototype.talkTo = function () {
    //Set the current character and interaction to this one
    interactingCharacter = this;
    currentInteraction = this.interactions[this.interactionIndex];

    //Get the dialogue text to show
    var displayText = currentInteraction.dialogue;
    //If this interaction has alternate dialogue, decide whether to show it
    //using a random number - 50/50 chance for each dialogue option
    if (currentInteraction.alternateDialogue != "") {
        var randomNum = Math.random();
        if (randomNum > 0.5) {
            displayText = currentInteraction.alternateDialogue;
        }
    }
    //Replace any occurence of [[name]] with the name the player entered at the start
    displayText = displayText.replace("[[name]]", userNameInput);

    //Show the dialogue UI with the correct name, dialogue etc.
    showDialoguePopup(this.name, displayText, currentInteraction.requiresUserInput,
                        currentInteraction.optionsText, currentInteraction.soundLength);
}

//Called when a dialogue option button is clicked/input is confirmed
character.prototype.interactionResponse = function (result) {

    //Update boss satisfaction based on choice
    bossSatisfaction += currentInteraction.optionsSatisfactionChanges[result];
    if (bossSatisfaction <= 0) {
        //Show fired screen
        loadEndScreen("fired");
        //Return so no more code is run
        return;
    }

    //Go to the next interaction index so different dialogue is shown next time
    this.interactionIndex = currentInteraction.optionsPointers[result];
    //If the conversation is not over, continue talking
    if (currentInteraction.continueConversation) {
        this.talkTo();
    }
    //Otherwise hide dialogue UI
    else {
        hideDialoguePopup();
    }
}

//Move the character to a different floor, for example when the Boss moves from ground to floor 2
character.prototype.moveToFloor = function (newFloor, newInteractionIndex, newX, newY) {
    this.floorNum = newFloor;                       //Set a new floor number and update the interactionIndex
    this.interactionIndex = newInteractionIndex;    //to give relevant dialogue for the new location
    this.xPos = newX;                               //Update the character's
    this.yPos = newY;                               //  position in the room
    this.button.startX = newX;                      //Update the button's position
    this.button.startY = newY;                      //  so clicks are registered correctly
}