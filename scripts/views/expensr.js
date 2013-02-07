var ExpensrView = Backbone.View.extend({

	el: "#expensr",

	events: {
		"submit #transaction_form": "createTransaction",
		"focus #category": "applyCategoryStyle",
		"focusout #category": "removeCategoryStyle",
		"keypress .form_amount": "restrictKeys"
	},

	initialize: function() {
		this.listenTo(Transactions, "add", this.addTransaction);
		this.listenTo(Transactions, "reset", this.resetTransactions);
		this.listenTo(Transactions, "all", this.updateOverview);
		Transactions.fetch();
	},

	addTransaction: function(trans) {
		var v = new TransactionItem({model:trans});
		this.$("#transaction_history").find(".headings").after(v.render().el);
	},

	resetTransactions: function(transactions) {
		transactions.each(this.addTransaction, this);
	},

	createTransaction: function(e) {
		e.preventDefault();
		var t = Transactions.create({
			desc: this.$(".form_description").val(),
			amount: this.$(".form_amount").val(),
			category: this.$("#category").find(":selected").text(),
			date: (new Date()).getTime()
		}, {wait:true});
		if (t.validationError) {
			alert(t.validationError)
		}
		else {
			this.$(".form_amount").val("");
			this.$(".form_description").val("").focus();
			this.$("#category")[0].selectedIndex = 0;
		}
	},

	applyCategoryStyle: function() {
		this.$("#category_container").addClass("active_container");
	},

	removeCategoryStyle: function() {
		this.$("#category_container").removeClass("active_container");
	},

	updateOverview: function(coll) {
		var spent = Transactions.moneySpent(),
			earned = Transactions.moneyMade();

		this.$(".positive").find(".amt").html(accounting.formatMoney(earned));
		this.$(".negative").find(".amt").html(accounting.formatMoney(spent));
		this.$(".total").find(".amt").html(accounting.formatMoney(spent + earned));
	},

	restrictKeys: function(ev) {
		var charCode = (ev.which) ? ev.which : ev.keyCode;
		//restrict events to numeric keys and decimal
		if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		else {
			return true;
		}
	}
	
});