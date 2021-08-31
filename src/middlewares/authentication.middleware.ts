import { Connection, createConnection } from 'typeorm/index';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { Usuario } from '../databases/db/entities/Usuario';

let dbConnection : Connection;
createConnection('Api').then(((value) => {
  dbConnection = value;
}));

passport.use(new Strategy(((token, done) => {
  dbConnection.manager.findOne(Usuario, { where: { Key: token } }).then((value1) => {
    if (value1 === undefined) return done(null, false);
    return done(null, value1, { scope: 'all' });
  });
})));
