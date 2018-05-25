var express = require('express');
var app = express();
var mysql = require('mysql');
var env = require('./environment');
var query = require('./queries');

const con = mysql.createConnection({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPass,
    database: env.database
});

app.get('/', function(req, res) {
    let result = null;
    let sql;
    res.contentType = 'application/json';
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.query.id) {
        sql = query.LIST_TECH_TREE.replace('#_TECH_ID_#', req.query.id);
    } else {
        sql = query.LIST_WHOLE_TECH_TREE;
    }
    
    con.query(sql, function (err, queryResult, fields) {
        if (err) throw err;
        const nodes = [];

        for (let row of queryResult) {
            let node = nodes.find(_node => _node.id === row.id);
            if (node && node.req != null && row.req > 0) {
                node.req.push(row.req);
            } else {
                nodes.push({
                    id: row.id,
                    name: row.name,
                    req: row.req != null && row.req > 0 ? [row.req] : []
                });
            }
        }

        res.send(nodes);
    });
});

con.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to database '${env.database}' at ${env.dbHost}:${env.dbPort}`);
    
    app.listen(env.port, env.hostname, () => {
        console.log(`Server running at http://${env.hostname}:${env.port}/`);
    });
});
