define(['backbone',
	'pizi-backbone-localStorage',
	'pizi-backbone-indexedDB'],
function(Backbone,
	bbLocalStorage,
	bbIndexedDB){

	function overrideBackboneSync(opts){
		opts = opts || {models: "indexedDB", session: "localStorage"};

		if(Backbone){
			Backbone.defaultSync = Backbone.sync;
			Backbone.sync = function(method, model, options) {

				options = options || (options = {}) ;
				options.dbName = options.dbName || opts.dbName;
				options.dbVersion = options.dbVersion || opts.dbVersion;
				options.persist = options.persist || model.persist || opts.models;

				var storage = bbIndexedDB;
				if(options.persist){
					storage =  options.persist === "indexedDB" ? bbIndexedDB : bbLocalStorage;
				} else {
					console.log('defaults persit options used!');
					storage =  opts.models === "indexedDB" ? bbIndexedDB : bbLocalStorage;
				}

				switch (method) {
					case 'create':
						storage.saveEntity(model, options);
					break;

					case 'update':
						storage.saveEntity(model, options);
					break;

					case 'delete':
						storage.deleteEntity(model, options);
					break;

					case 'read':
						options = _.extend({validate: true}, options);
						if(model instanceof Backbone.Model){
							storage.getEntity(model, options);
						} else if(model instanceof Backbone.Collection){
							storage.getAllEntity(model, options);
						}
					break;
				}
			};
		}

		if(opts.session === "localStorage"){
			bbLocalStorage.initSession(_.extend(opts, {persist: "localStorage"}));
		} else if(opts.session === "indexedDB"){
			bbIndexedDB.initSession(_.extend(opts, {persist: "indexedDB"}));
		} else if(opts.success){
			opts.success();
		}
	}

	return {
		apply : overrideBackboneSync
	};
	
});