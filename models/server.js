
const express = require('express');
const cors = require ('cors');
const path = require ('path');
const { dbConnection } = require('../db/config.db.js');

class Server{

        constructor(){
            this.app = express();
            this.port = process.env.PORT;
            this.conectarDB();
            this.middlewares();
            this.routes();
            
        }
        async conectarDB() {
            await dbConnection();
        }

    middlewares(){
        this.app.use(cors());
        this.app.use (express.json());
        this.app.use(express.static('public'));
        this.app.set('trust proxy', true);
    }    
    

    routes(){
        this.app.use('/api/auth', require('../routes/auth.routes')); 
        this.app.use('/api/loan', require('../routes/loan.routes')); 
        this.app.use('/api/search', require('../routes/search.routes')); 
 

        this.app.get('*', (req, res) => { 
            res.sendFile( path.resolve( __dirname,'../public/index.html') )
            });
              
    }

    listen(){
        this.app.listen(this.port)
        console.log('servidor corriendo en puerto', this.port)
    }

}

module.exports = Server;