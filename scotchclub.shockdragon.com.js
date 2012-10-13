Scotches = new Meteor.Collection("scotches");
Drinkers = new Meteor.Collection("drinkers");

if (Meteor.isClient) {
  Template.scotch_list.greeting = function () {
    return "Welcome to Scotch Club!";
  };

	Template.scotch_list.scotches = function() {
		return Scotches.find({}, {sort : {name : 1}});
	};

  Template.scotch_list.events({
    'click .drinkers input[type="checkbox"]' : function (e) {
			if ($(e.currentTarget).is(':checked')) {
				Scotches.update({name : $(e.currentTarget).parent().parent().find('h3').text()}, {$addToSet : {drinkers : $(e.currentTarget).data('drinkerName')}});
			}else{
				Scotches.update({name : $(e.currentTarget).parent().parent().find('h3').text()}, {$pull : {drinkers : $(e.currentTarget).data('drinkerName')}});
			}
		}
  });

	Template.scotch.all_drinkers = function() {
		return Drinkers.find({}, {sort : {name : 1}});
	};
	Template.scotch_list.all_drinkers = Template.scotch.all_drinkers();

	Handlebars.registerHelper('drank', function(checked) {
		return _.reduce(Drinkers.find({}, {sort : {name : 1}}).fetch(), function(memo, drinker) {
			return memo + '<input type="checkbox" data-drinker-name="' + drinker.name + '"' + ((_.contains(checked, drinker.name)) ? ' checked="checked"' : '') + '>';
		}, '');
	});
			
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
