import Backbone from "backbone";
import piziBackboneIndexedDB from "pizi-backbone-indexedDB";	
import piziBackboneLocalStorage from "pizi-backbone-localStorage";

export default {
	apply : (opts = {models: "indexedDB", session: "localStorage"}) => {
	
		Backbone.defaultSync = Backbone.sync;
		Backbone.sync = (method, model, options = {}) =>  {

			options.dbName = options.dbName || opts.dbName;
			options.dbVersion = options.dbVersion || opts.dbVersion;
			options.persist = options.persist || model.persist || opts.persist || opts.models;
			options.conf = opts.conf;

			var storage;
			if(options.persist){
				storage =  options.persist === "indexedDB" ? piziBackboneIndexedDB : piziBackboneLocalStorage;
			} else {
				console.log('defaults persit options used!');
				storage =  opts.models === "indexedDB" ? piziBackboneIndexedDB : piziBackboneLocalStorage;
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
	
		if(opts.session === "localStorage"){
			piziBackboneLocalStorage.initSession(_.extend(opts, {persist: "localStorage"}));
		} else if(opts.session === "indexedDB"){
			piziBackboneIndexedDB.initSession(_.extend(opts, {persist: "indexedDB"}));
		} else if(opts.success){
			opts.success();
		}
	}
};
