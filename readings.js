Word = new Mongo.Collection("words");
Readings = new Mongo.Collection("readings");//not really being used
HistoryInputs = new Mongo.Collection("historyInputs");
ProphetInputs = new Mongo.Collection('prophetInputs');
LettersInputs = new Mongo.Collection("lettersInputs");
GospelsInputs = new Mongo.Collection('gospelsInputs');


  /*------------------------------------------------------------------
      http://docs.meteor.com/#/full/template_body
      https://github.com/nodemailer/mailcomposer/blob/7c0422b2de2dc61a60ba27cfa3353472f662aeb5/README.md
      https://kadira.io/academy/meteor-routing-guide/content/rendering-blaze-templates
      http://meteortips.com/first-meteor-tutorial/forms/
      https://docs.mongodb.org/manual/tutorial/remove-documents/
      https://github.com/meteor/meteor/blob/master/packages/spacebars/README.md
      Array of books broken into categories

  ------------------------------------------------------------------*/
var historicChapters = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Acts', 'Joshua', 'Judges', 'Ruth','1st Samuel', '2nd Samuel', '1st Kings', '2nd Kings', '1st Chronicles', '2nd Chronicles', 'Ezra', 'Esther'];
var prophetChapters = ['Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
var gospelChapters = ['Matthew','Mark','Luke','John'];
var letterChapters = ['Romans','1st Corinthians','2nd Corinthians','Galatians','Ephesians','Philppians','Colossians','1st Thessalonians','2nd Thessalonians','1st Timothy','2nd Timothy','Titus','Philemon', 'Hebrews','James','1st Peter','2nd Peter','1st John','2nd John','3rd John','Jude','Revelation'];
 
if (Meteor.isClient) {
  //Word
  Template.body.helpers({

/*------------------------------------------------------------------

        This block find()'s the object values and passes them into their
        template tags on index.html. You can check out the table in that file

------------------------------------------------------------------*/
    words: function(){
      return Word.find();
    },
    historyInputs: function(){
      return HistoryInputs.find();
    },
    prophetInputs: function(){
      return ProphetInputs.find();
    },
    lettersInputs: function(){
      return LettersInputs.find();
    },
    gospelsInputs: function(){
      return GospelsInputs.find();
    }
  });
  Template.form.events({
    "click #next": function(event){
      console.log('click');
      template.$('#next').removeClass('view');      
    }
  });
  Template.form.events({
    "submit .word_of_day":function(event){

      event.preventDefault();

/*------------------------------------------------------------------

        This block grabs the values of the input fields
        and stores them in their own variable to be used down below

------------------------------------------------------------------*/

      var wordInput = event.target.word.value;

      var history = event.target.history.value;
      var historyChapters = event.target.history_chapter.value;
      var historyVerse = event.target.history_verse.value;
      var historyAdmonition = event.target.history_admonition.value;
      var historyReading = event.target.history_reading.value;
  
      var prophets = event.target.prophets.value;
      var prophetsChapters = event.target.prophets_chapter.value;
      var prophetsVerse = event.target.prophets_verse.value;
      var prophetsAdmonition = event.target.prophets_admonition.value;
      var prophetsReading = event.target.prophets_reading.value;
 
      var letters = event.target.letters.value;
      var lettersChapters = event.target.letters_chapter.value;
      var lettersVerse = event.target.letters_verse.value;
      var lettersAdmonition = event.target.letters_admonition.value;
      var lettersReading = event.target.letters_reading.value;

      var gospels = event.target.gospels.value;
      var gospelsChapters = event.target.gospels_chapter.value;
      var gospelsVerse = event.target.gospels_verse.value;
      var gospelsAdmonition = event.target.gospels_admonition.value;
      var gospelsReading = event.target.gospels_reading.value;

/*------------------------------------------------------------------

        This block throws stores the information grabbed from the 
        input fields and stores them in their own collections as records

        Want to figure out a better to do this, I'm sure there is

------------------------------------------------------------------*/
      Word.insert({
        text: wordInput,
        createdAt: new Date()
      });

      HistoryInputs.insert({
        book: history,
        chapter: historyChapters,
        verse: historyVerse,
        admonition: historyAdmonition,
        reading: historyReading,
        createdAt: new Date()
      });
     
      ProphetInputs.insert({
        book: prophets,
        chapter: prophetsChapters,
        verse: prophetsVerse,
        admonition: prophetsAdmonition,
        reading: prophetsReading,
        createdAt: new Date()
      });

      LettersInputs.insert({
        book: letters,
        chapter: lettersChapters,
        verse: lettersVerse,
        admonition: lettersAdmonition,
        reading: lettersReading,
        createdAt: new Date()
      });

      GospelsInputs.insert({
        book: gospels,
        chapter: gospelsChapters,
        verse: gospelsVerse,
        admonition: gospelsAdmonition,
        reading: gospelsReading,
        createdAt: new Date()
      });
      //Clear form field
      //event.target.text.value = "";
    }
  });

  //Historic section only
  Template.welcome.helpers({
    chapter: [{name: "History"}, {name: "Prophets"}, {name: "Letters"}, {name: "Gospels"}]
  });

/*------------------------------------------------------------------

        This block throws in the values into the option fields
        and is called by the {{#each}} tag.

------------------------------------------------------------------*/
  Template.historic.readings = function(){
    return historicChapters;
  };

  //Prophets
  Template.prophets.readings = function(){
    return prophetChapters;
  };

  //Letters
  Template.letters.readings = function(){
    return letterChapters;
  };

  //Gospels
  Template.gospels.readings = function(){
    return gospelChapters;
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  // Meteor.methods({
  //   sendEmail: function(to, from, subject, text){
  //     check([to,from,subject, text], [String]);

  //     this.unblock();
  //     Email.send({
  //       to: to,
  //       from: from,
  //       subject: subject,
  //       text: text
  //     });
  //   }
  // });
  // Meteor.call(
  //   'sendEmail',
  //   'gomez.jose853@gmail.com',
  //   'jose.gomez@mmiagency.com',
  //   'Hello from Meteor!',
  //   'This is a test of Email.send.'
  // );
}
