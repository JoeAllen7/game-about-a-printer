//////////////////
// INTERACTIONS //
//////////////////

//Interaction object constructor
function interaction(dialogue, alternateDialogue, requiresUserInput, optionsText, optionsSatisfactionChanges, optionsPointers, soundLength, continueConversation) {
    this.dialogue = dialogue;                       //Main dialogue to show
    this.alternateDialogue = alternateDialogue;     //An alternate dialogue option, 50% chance of showing over main dialogue (optional)
    this.requiresUserInput = requiresUserInput;     //Does this interaction require text input from the player?
    this.optionsText = optionsText;                 //Array of text options to respond with
    this.optionsSatisfactionChanges = optionsSatisfactionChanges;   //Array, each element determines how Boss satisfaction will change if this option is chosen
    this.optionsPointers = optionsPointers;                         //Array, each element determines the next interaction to go to if this option is chosen
    this.soundLength = soundLength;                     //Length of the printing sound to play
    this.continueConversation = continueConversation;   //Does the conversation continue after this interaction?
}