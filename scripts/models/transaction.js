Transaction = Backbone.Model.extend({
	
	validate: function(attrs, options) {
		if (!attrs.desc || /^\s*$/.test(attrs.desc)) {
			return "Pleae enter a description";
		}
		if (!attrs.amount || isNaN(attrs.amount)) {
			return "Please enter a valid amount";
		}
	}

});