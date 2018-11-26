function query_handler(query){
	safe_query = escape(query);
	  db.query(safe_query, function (err, result, fields) {
	    if (err) throw err;
	    return result;
	  });
}