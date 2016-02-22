FlowRouter.route('/',{
	name: 'Welcome',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'welcome'});
	}
});
FlowRouter.route('/history',{
	name: 'History',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'historic'});
	}
});
FlowRouter.route('/prophets',{
	name: 'Prophets',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'prophets'});
	}
});
FlowRouter.route('/letters',{
	name: 'Letters',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'letters'});
	}
});
FlowRouter.route('/Gospels',{
	name: 'Gospels',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'gospels'});
	}
});
FlowRouter.route('/results',{
	name: 'Results',
	action: function(){
		BlazeLayout.render('mainLayout',{content: 'results'});
	}
});