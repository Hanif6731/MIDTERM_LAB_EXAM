var db = require('./db');

module.exports ={

    get: function(id, callback){
        var sql = "select * from products where id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                callback(result[0]);
            }else{
                callback([]);
            }
        });
    },

    getAll: function(callback){
        var sql = "select * from products";
        db.getResults(sql, function(result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },

    insert: function(product, callback){
        var sql = "insert into products values('', '"+product.name+"', "+product.quantity+", "+product.price +")";

        console.log(sql);

        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    update: function(product, callback){
        var sql = "UPDATE `products` SET `name`='"+product.name+"',`quantity`="+product.quantity+"," +
            "`price`="+product.price+" WHERE id="+product.id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    delete: function(id, callback){
        var sql = "delete from products where id="+id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    }
}
