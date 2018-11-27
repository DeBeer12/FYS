var _ = {};

_.query_handler = function(query, db, callback){
	safe_query = escape(query);
	// console.log({safe_query: safe_query})
	  db.query(query, function (err, result, fields) {
			if (err) throw err;
			// console.log({result: result})
	    callback(result);
	  });
}

module.exports = _;