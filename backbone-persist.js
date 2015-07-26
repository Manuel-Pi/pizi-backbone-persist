(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'pizi-backbone-localStorage', 'pizi-backbone-indexedDB'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('backbone', 'pizi-backbone-localStorage', 'pizi-backbone-indexedDB'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.backbone, root.pizi-backbone-localStorage, root.pizi-backbone-indexedDB);
    }
}(this, function(Backbone,
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
	
}));