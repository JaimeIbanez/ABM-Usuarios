var Mongo = require('mongodb').MongoClient;

var database; //undefined - conectarse (primera vez)

var mongoURL = (process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/') + 'abm';

module.exports = {
	connectToServer: function (callback) {
        if (database) {
            return process.nextTick(callback);
        }
        Mongo.connect(mongoURL, function (err, db) {
                database = db;
                console.log('Connected to ' + mongoURL);
                return callback(err, db);
            });
    },

    getDB: function() {
        if (!database) {
            throw new Error('Not initialized.');
        }
        return database;
    },

};


// Notas / Beta test:

// exportar 1 función recibir un callback con err y db
// requerir los parámetros de conexión
// variable globlal

// function dbConnection (onDBConnection) {
// 	if (database === undefined) { // Si es undefined es primera vez que se conecta, conectarse
// 		Mongo.connect('mongodb://localhost:27017/abm', function (err, db){
// 			onDBConnection(err, db);
// 		});
// 	}
// 	onDBConnection(err, db);
// };
