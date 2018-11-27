var _ = {};

_.query_handler = function(query, db, callback){
	safe_query = escape(query);
	  db.query(query, function (err, result, fields) {
			if (err) throw err;
	    callback(result);
	  });
}

module.exports = _;