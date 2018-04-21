'use strict';

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
var mysql = require('mysql');
const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 3001,
})

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "new_project"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Mysql Connected to demo_user!");
});

server.route([{
	method: 'GET',
	path: '/product/list',
	handler: function(req, res) {

		var sql = "SELECT * from tb_products";
		con.query(sql, function(err, row) {
			if(err)
				throw err;
			res(row);
		});
	}
},
{
	method: 'POST',
	path: '/product/insert',
	handler: function(req, res) {
		let product_name = req.payload.product_name;
		var sql = "INSERT INTO tb_products (ID,name) VALUES ('','" + product_name + "')";
		con.query(sql, function(err) {
			if(err)
				throw err;

			res({status: '1 row inserted'});
		});
	}
},
{
	method: 'POST',
	path: '/product/delete',
	handler: function(req, res) {
		let id = req.payload.id;
		var sql = "DELETE from tb_products where ID = '"+id+"'";
		con.query(sql, function(err) {
			if(err)
				throw err;

			res({status: '1 row deleted'});
		});
	}
}])

server.start(err => {
	if(err)
		throw err;

	console.log('staeted server');
})