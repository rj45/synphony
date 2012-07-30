// Generated by CoffeeScript 1.3.3
(function() {
  var DATABASE_URL, auth, compileStyle, express, fs, gzip, less, path, staticFile, staticPath, thedb, _, _ref;

  express = require('express');

  thedb = require('./db');

  less = require('less');

  fs = require('fs');

  path = require('path');

  auth = require('./auth');

  gzip = require('connect-gzip');

  _ = require('underscore')._;

  DATABASE_URL = (_ref = process.env.MONGOLAB_URI) != null ? _ref : "mongodb://localhost:27017/synphony";

  staticFile = function(root, path) {
    return function(req, res) {
      var next;
      next = function(err) {
        if (err) {
          console.log(err);
          return res.send(500);
        } else {
          return res.send(404);
        }
      };
      return express["static"].send(req, res, next, {
        getOnly: true,
        root: __dirname + '/../..' + root,
        path: path
      });
    };
  };

  staticPath = function(root, path) {
    return function(req, res) {
      var next, url;
      url = req.url;
      if (url.indexOf(path) !== 0) {
        console.log("Orig URL: " + url);
        return res.send(404);
      }
      url = url.substring(path.length);
      console.log("URL: " + url);
      next = function(err) {
        if (err) {
          console.log(err);
          return res.send(500);
        } else {
          return res.send(404);
        }
      };
      return express["static"].send(req, res, next, {
        getOnly: true,
        root: __dirname + '/../..' + root,
        path: url
      });
    };
  };

  compileStyle = function(callback) {
    return fs.readFile(__dirname + '/../../src/style/synphony.less', 'utf8', function(err, data) {
      var options;
      if (err) {
        return callback(err);
      }
      console.log(path.resolve(__dirname, '../../src/style/'));
      options = {
        paths: [path.resolve(__dirname, '../../src/style/')],
        filename: "synphony.less",
        file: "synphony.less"
      };
      return less.render(data, options, function(err, css) {
        return callback(err, css);
      });
    });
  };

  module.exports.run = function() {
    var app, baseUrl, db, deserializeUser, findOrCreateUser, folder, passport, port, serializeUser, url, _i, _len, _ref1, _ref2, _ref3;
    app = express.createServer();
    db = new thedb.Db(DATABASE_URL);
    db.load(function(err) {
      if (err != null) {
        return console.error(err.toString());
      } else {
        return db.ensureCollections(null, ['users', 'projects'], function(err) {
          if (err != null) {
            return console.error(err.toString());
          }
        });
      }
    });
    port = (_ref1 = process.env.PORT) != null ? _ref1 : 3000;
    baseUrl = "http://localhost:" + port + "/";
    findOrCreateUser = function(identifier, profile, done) {
      var user;
      user = _.clone(profile);
      user.open_id = identifier;
      return db.put(null, 'users', {
        'open_id': identifier
      }, user, function(err, user) {
        if (err != null) {
          console.log(err);
        }
        return done(err, user);
      });
    };
    serializeUser = function(user, done) {
      return done(null, user._id.toString());
    };
    deserializeUser = function(id, done) {
      var user;
      return user = db.get(null, 'users', {
        _id: id
      }, function(err, user) {
        if (err != null) {
          console.log(err);
        }
        return done(err, user);
      });
    };
    app.use(express.favicon(__dirname + '/../../public/favicon.ico'));
    app.use(express["static"](__dirname + '/../../public'));
    app.use(gzip.gzip());
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser((_ref2 = process.env.COOKIE_SECRET) != null ? _ref2 : 'fRqnPNEZ5QH3BPKMtasPjQgTLjBAnJgzE8fS7lof'));
    app.use(express.session());
    passport = auth.setup(baseUrl, app, findOrCreateUser, serializeUser, deserializeUser);
    app.get('/js/synphony.js', staticFile('/build/client', 'synphony.js'));
    app.get('/js/templates.js', staticFile('/build/client', 'templates.js'));
    _ref3 = ['collection', 'model', 'router', 'view', 'view_model', 'interactor'];
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      folder = _ref3[_i];
      url = "/js/" + folder;
      app.get("" + url + "/:file.js", staticPath("/build/client/" + folder, url));
    }
    app.get("/js/view/:folder/:file.js", staticPath("/build/client/view", "/js/view"));
    app.get("/templates/:folder/:file.handlebars", staticPath("/templates", "/templates"));
    app.get('/css/synphony.css', function(req, res) {
      return compileStyle(function(error, css) {
        if (error) {
          return res.send(500, error);
        } else {
          res.contentType('text/css');
          return res.send(css);
        }
      });
    });
    app.get('/api/v1/:project/:collection/?', function(req, res) {
      return db.all(req.params.project, req.params.collection, null, function(err, docs) {
        if (err != null) {
          return res.send(500, err);
        } else {
          return res.json(docs);
        }
      });
    });
    app.post('/api/v1/:project/:collection/?', function(req, res) {
      return db.put(req.params.project, req.params.collection, null, req.body, function(err, doc) {
        if (err != null) {
          return res.send(500, error);
        } else {
          return res.json(doc);
        }
      });
    });
    app.get('/api/v1/:project/:collection/:id/?', function(req, res) {
      return db.get(req.params.project, req.params.collection, {
        _id: req.params.id
      }, function(err, doc) {
        if (err != null) {
          return res.send(500, error);
        } else if (doc != null) {
          return res.json(doc);
        } else {
          return res.send(404, "No such document");
        }
      });
    });
    app.put('/api/v1/:project/:collection/:id/?', function(req, res) {
      req.body._id = req.params.id;
      return db.put(req.params.project, req.params.collection, {
        _id: req.params.id
      }, req.body, function(err, doc) {
        if (err != null) {
          return res.send(500, error);
        } else {
          return res.json(doc);
        }
      });
    });
    app["delete"]('/api/v1/:project/:collection/:id/?', function(req, res) {
      return db["delete"](req.params.project, req.params.collection, {
        _id: req.params.id
      }, function(err) {
        if (err != null) {
          return res.send(500, error);
        } else {
          return res.send(204);
        }
      });
    });
    app.listen(port);
    return console.log("You may go to " + baseUrl + " in your browser");
  };

}).call(this);
