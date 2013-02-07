TransactionItem = Backbone.View.extend({

	tagName: "tr",

	events: {
		"click .delete_transaction": "deleteTransaction"
	},

	initialize: function() {
		this.template = Handlebars.compile($("#transaction_item_template").html());
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	deleteTransaction: function() {
		var that = this;
		$(this.el).fadeOut(400, function() {
			that.model.destroy();
			that.remove();
		});
	}
	
});