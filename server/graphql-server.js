import express from 'express'
import session from 'express-session'
import graphqlHTTP from 'express-graphql'
import schema from './schema.js'


// TODO: -> config
const SERVER_PORT = 3000
const GRAPHQL_URL = '/graphql'
const GRAPHQL_PORT = 3001
const GRAPHIQL = true
const GRAPHIQL_PRETTY = true
const COOKIES_MAXAGE = 60000
const SESSION_SECRET = '8hbgSVve5e45KJ76SFVSD1e6GE7RDFVdeRRTYYgD'




let graphqlApp = (app) => {
  app.use(session({
    secret: SESSION_SECRET,
    cookie: { maxAge: COOKIES_MAXAGE }
  }))

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: GRAPHIQL_PRETTY,
    graphiql: GRAPHIQL
  }))

  app.use(express.static(__dirname + '/../public'))
}

let ide = express()
graphqlApp(ide)
let server = ide.listen(GRAPHQL_PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});

export default graphqlApp
