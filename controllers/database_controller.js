var _ = {};

_.query_handler = function(query, db){
	safe_query = escape(query);
	console.log({safe_query: safe_query})
	  db.query(query, function (err, result, fields) {
			if (err) throw err;
			console.log({result: result})
	    return result;
	  });
}

module.exports = _;