Word = new Mongo.Collection("words");
Readings = new Mongo.Collection("readings");//not really being used
HistoryInputs = new Mongo.Collection("historyInputs");
ProphetInputs = new Mongo.Collection('prophetInputs');
LettersInputs = new Mongo.Collection("lettersInputs");
GospelsInputs = new Mongo.Collection('gospelsInputs');

var wordInput, history, historyChapters, historyVerse, historyAdmonition, historyReading, prophets, prophetsChapters, prophetsVerse, prophetsAdmonition, prophetsReading, letters, lettersChapters, lettersVerse, lettersAdmonition, lettersReading, gospels, gospelsChapters, gospelsVerse, gospelsAdmonition, gospelsReading, userEmail;
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
  Template.results.helpers({
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
    "submit .word_of_day":function(event){

      event.preventDefault();

/*------------------------------------------------------------------

        This block grabs the values of the input fields
        and stores them in their own variable to be used down below

------------------------------------------------------------------*/

      wordInput = event.target.word.value;

      history = event.target.history.value;
      historyChapters = event.target.history_chapter.value;
      historyVerse = event.target.history_verse.value;
      historyAdmonition = event.target.history_admonition.value;
      historyReading = event.target.history_reading.value;
  
      prophets = event.target.prophets.value;
      prophetsChapters = event.target.prophets_chapter.value;
      prophetsVerse = event.target.prophets_verse.value;
      prophetsAdmonition = event.target.prophets_admonition.value;
      prophetsReading = event.target.prophets_reading.value;
 
      letters = event.target.letters.value;
      lettersChapters = event.target.letters_chapter.value;
      lettersVerse = event.target.letters_verse.value;
      lettersAdmonition = event.target.letters_admonition.value;
      lettersReading = event.target.letters_reading.value;

      gospels = event.target.gospels.value;
      gospelsChapters = event.target.gospels_chapter.value;
      gospelsVerse = event.target.gospels_verse.value;
      gospelsAdmonition = event.target.gospels_admonition.value;
      gospelsReading = event.target.gospels_reading.value;

      userEmail = event.target.user_email.value;
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
      

      var htmlData = "<table width='600' align='center'><tr><td colspan='6'>Word: "+wordInput+"</td></tr><tr><td>Category</td><td>Book</td><td>Chapter</td><td>Verse</td><td>Admonition</td><td>Reading</td><tr><tr><td>Historic</td><td>"+history+"</td><td>"+historyChapters+"</td><td>"+historyVerse+"</td><td>"+historyAdmonition+"</td><td>"+historyReading+"</td></tr><tr><td>Prophets</td><td>"+prophets+"</td><td>"+prophetsChapters+"</td><td>"+prophetsVerse+"</td><td>"+prophetsAdmonition+"</td><td>"+prophetsReading+"</td></tr><tr><td>Letters</td><td>"+letters+"</td><td>"+lettersChapters+"</td><td>"+lettersVerse+"</td><td>"+lettersAdmonition+"</td><td>"+lettersReading+"</td></tr><tr><td>Gospels</td><td>"+gospels+"</td><td>"+gospelsChapters+"</td><td>"+gospelsVerse+"</td><td>"+gospelsAdmonition+"</td><td>"+gospelsReading+"</td></tr></table>";
   
      //this should send a call on terminal window
      //need to setup real email alerts...soon
      if(userEmail === ""){
        //Meteor.call('sendEmail', 'gomez.jose853@gmail.com',htmlData);
        $('.error').html('please fill email out');
      }else{
        Meteor.call('sendEmail', userEmail, htmlData, function(err,data){
          if (!err) {
           FlowRouter.go('/confirmation');
          }
        });
      }
      
     // console.log(htmlData);

      return wordInput,
          history,
          historyChapters,
          historyVerse,
          historyAdmonition,
          historyReading,
          prophets,
          prophetsChapters,
          prophetsVerse,
          prophetsAdmonition,
          prophetsReading,
          letters,
          lettersChapters,
          lettersVerse,
          lettersAdmonition,
          lettersReading,
          gospels,
          gospelsChapters,
          gospelsVerse,
          gospelsAdmonition,
          gospelsReading
      
      }
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
    process.env.MAIL_URL = 'smtp://postmaster%40sandboxcadea6d4b0ae451f8a135f736c79d9be.mailgun.org:d8281d65fe75546770d64aa98ea44c87@smtp.mailgun.org:587';
    //SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html-email.html' ) );
    

    //console.log(email);
    Meteor.methods({
        sendEmail: function(to,html){  
          check([to,html],[String]);        
          this.unblock();
          Email.send({
            to: to,
            from: "gomez.jose853@gmail.com",
            subject: "Preparation for Wednesday",
            html: html
          });
        }
          
    });

  });//Meteor.startup()
}//Meteor.isServer
