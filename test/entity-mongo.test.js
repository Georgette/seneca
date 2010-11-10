/* Copyright (c) 2010 Ricebridge */

var common   = require('common');
var entity   = require('entity');
require('entity-mongo');

var E = common.E;

var sys     = common.sys;
var eyes    = common.eyes;

var Entity = entity.Entity;


module.exports = {
  mem: function(assert) {
    Entity.init$('mongo://localhost/entity_mongo_test',function(entity) {
      assert.equal('mongo',entity.$.store$.name);

      try {

        var ent1 = entity.make$({tenant$:'test',base$:'foo',name$:'bar',p1:'v1'});
        ent1.p2 = 100;
        
        sys.puts( 'pre save: '+ent1);
        
        ent1.save$( function(err,ent1) {
          E(err);
          sys.puts( 'post save: '+ent1);

          ent1.find$( ent1.id, function(err,ent1 ) {
            E(err);
            sys.puts( 'found: '+ent1);
            ent1.p1 = 'v1x';
            
            ent1.save$( function(err,ent1) {
              E(err);
              sys.puts( 'post save: '+ent1);
              
              ent1.find$( ent1.id, function(err,ent1 ) {
                sys.puts( 'found: '+ent1);

                ent1.remove$( ent1.id, function(err) {
                  sys.puts( 'removed: '+ent1);
                  
                  ent1.find$( ent1.id, function(err,ent1 ) {
                    sys.puts( 'found: '+ent1);

                    entity.close$();
                  });
                });
              });
            });
          });
        });
      }
      catch( e ) {
        sys.puts(e);
        entity.close$();
      }
    });
  },

}