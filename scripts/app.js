$(function() {

	Handlebars.registerHelper('toMoney', function(num) {
		var result = accounting.formatMoney(num);
		return result;
	});

	Transactions = new TransactionsCollection;
	var Expensr = new ExpensrView;
});