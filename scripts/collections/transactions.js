TransactionsCollection = Backbone.Collection.extend({

	model: Transaction,
	
	localStorage: new Backbone.LocalStorage("TransactionsCollection"),

	comparator: function(transaction) {
		return transaction.get("date");
	},

	moneyMade: function() {
		return this.reduce(function(memo, model) {
			if (model.get("amount") > 0)
				return memo + parseFloat(model.get("amount"), 10);
			else
				return memo;
		}, 0);
	},

	moneySpent: function() {
		return this.reduce(function(memo, model) {
			if (model.get("amount") < 0)
				return memo + parseFloat(model.get("amount"));
			else
				return memo;
		}, 0);
	}

});