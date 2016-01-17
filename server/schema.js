import {resolver} from 'graphql-sequelize'
import fs from 'fs'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

import crypto from 'crypto'

import './db'
import {
  User,
  Window,
  App,
  UserApps
} from './models'

UserApps.associate()
//*

//
let wallpapers = fs.readdirSync('./public/static/wallpapers').map((img) => {
  return {name: img}
})


//sequelize.sync({force: true});
// grapql

let appType = new GraphQLObjectType({
  name: 'App',
  description: 'App',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    url: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    manifest: {
      type: GraphQLString
    }
  }
});


let windowType = new GraphQLObjectType({
  name: 'Window',
  description: 'A window',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: GraphQLString
    },
    left: {
      type: GraphQLInt
    },
    top: {
      type: GraphQLInt
    },
    width: {
      type: GraphQLInt
    },
    height: {
      type: GraphQLInt
    },
    token: {
      type: GraphQLString
    },
    app: {
      type: appType,
      /*resolve: (data, args) => {
        console.log(data)
        //App.find(data.id).limit(1)
        return App.find({where: {id: data.appId}, limit: 1})

        //return data.app//App.find(data.id).limit(1)
      }*/
      resolve: resolver(Window.App)
    }
  }
});


let userAppsType = new GraphQLObjectType({
  name: 'UserApps',
  description: 'UserApps',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    app_id: {
      type: GraphQLString
    },
    user_id: {
      type: GraphQLString
    }
  }
});

let wallpaperType = new GraphQLObjectType({
  name: 'wallpaper',
  fields: {
    name: {
      type: GraphQLString
    }
  }
});

let userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    email: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    background: {
      type: GraphQLString
    },
    windows: {
      type: new GraphQLList(windowType),
      resolve: resolver(User.Window)
    },
    apps: {
      type: new GraphQLList(appType),
      resolve: resolver(App)
    },
    wallpapers: {
      type: new GraphQLList(wallpaperType),
      resolve: (data, args) => {
        return wallpapers
      }
    }
  }
});



export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(userType),
        args: {
          login: {
            type: GraphQLString
          },
          token: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          }
        },
        resolve: resolver(User, {
          before: function(options, args) {

             if (options.where.token !== undefined) {

             } else {
               if (options.where.password === undefined) {
                 options.where.password = ''
               }

               if (options.where.login === undefined) {
                 options.where.login = ''
               }
             }

             options.limit = 1
             return options
          },
          after: (result, args)=> {
            // login success
            if (result.length && args.token === undefined) {
              const id   = result[0].dataValues.id
              const token = crypto.randomBytes(20).toString('hex')
              result[0].dataValues.token = token

              setTimeout(()=> User.update({token: token}, {where: { id: id }}))
            }

            return result
          }
        })
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateUser: {
          type: userType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            name: {
              name: 'name',
              type: GraphQLString
            }
          },
          resolve: function (obj, {id, name}) {
            User.update({name: name}, {where: { id: id }});

            return User.findById(id);
          }
      },
      addWindow: {
          type: windowType,
          args: {
            title: {
              name: 'title',
              type: GraphQLString
            },
            left: {
              name: 'left',
              type: GraphQLInt
            },
            top: {
              name: 'top',
              type: GraphQLInt
            },
            width: {
              name: 'width',
              type: GraphQLInt
            },
            height: {
              name: 'height',
              type: GraphQLInt
            },
            token: {
              name: 'token',
              type: GraphQLString
            },
            app: {
              name: 'app',
              type: GraphQLInt
            }
          },
          resolve: function (obj, args) {
            if (args.token) {
              User.find({where: {token: args.token}, limit: 1}).then((u)=> {
                  if (u) {
                    args.appId = args.app
                    args.userId = u.id
                    Window.create(args)
                  }
              })
            }

            return false
          }
      },
      deleteWindow: {
          type: windowType,
          args: {
            id: {
              name: 'id',
              type: GraphQLInt
            },
            token: {
              name: 'token',
              type: GraphQLString
            },
          },
          resolve: function (obj, args) {
            if (args.token) {
              User.find({where: {token: args.token}, limit: 1}).then((u)=> {
                  if (u) {
                    Window.destroy({
                        where: {
                            id: args.id
                        }
                    })
                  }
              })
            }

            return false
          }
      },
      updateWindow: {
          type: windowType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            title: {
              name: 'title',
              type: GraphQLString
            },
            left: {
              name: 'left',
              type: GraphQLInt
            },
            top: {
              name: 'top',
              type: GraphQLInt
            },
            width: {
              name: 'width',
              type: GraphQLInt
            },
            height: {
              name: 'height',
              type: GraphQLInt
            },
            token: {
              name: 'token',
              type: GraphQLString
            },
            app: {
              name: 'app',
              type: GraphQLInt
            }
          },
          resolve: function (obj, args) {
            if (args.token) {
              User.find({where: {token: args.token}, limit: 1}).then((u)=> {
                  if (u) {
                    Window.update(args, {where: { id: args.id }});
                  }
              })
            }

            return obj

          }
      },
      updateUser: {
          type: userType,
          args: {
            name: {
              type: GraphQLString
            },
            email: {
              type: GraphQLString
            },
            token: {
              type: GraphQLString
            },
            background: {
              type: GraphQLString
            }
          },
          resolve: function (obj, args) {
            if (args.token) {
              //User.find({where: {token: args.token}, limit: 1}).then((u)=> {
              //    if (u) {
              User.update(args, {where: { token: args.token }, limit: 1});
                //  }
              //})
            }

            return obj

          }
      }
    }
  })
});
