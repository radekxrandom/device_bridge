const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.io = io;
  next();
});
const things = {};
const connectedSockets = {};
io.on('connection', async (socket) => {
  console.log('User connected');
  console.log(socket.request.connection.remoteAddress);
  console.log(socket.handshake.address);
  // var clientIp = socket.request.connection.remoteAddress;

  // console.log(clientIp);
  console.log(connectedSockets);
  socket.on('generateBridge', (userData) => {
    const userIP = socket.handshake.address || socket.handshake.address;
    const userAgent = `${userIP.slice(7)} ${userData}`;
    console.log(userAgent);
    socket.leave(socket.room);
    const connectionID = uuidv4()
      .slice(0, 6)
      .toUpperCase();
    socket.room = connectionID;
    socket.join(connectionID);
    things[connectionID] = [];
    connectedSockets[connectionID] = [{ id: socket.id, org: true, agent: userAgent }];
    socket.emit('saveConID', connectionID);
    console.log('generateBridge');
    console.log(connectedSockets);
  });

  socket.on('joinBridge', (connectionID, userData) => {
    socket.leave(socket.room);
    const userIP = socket.handshake.address || socket.handshake.address;
    const userAgent = `${userIP.slice(7)} ${userData}`;
    console.log(userAgent);
    socket.room = connectionID;
    socket.join(connectionID);
    socket.emit('saveConID', connectionID);
    socket.emit('loadThings', things[connectionID]);
    try {
      console.log(connectedSockets[connectionID]);
      connectedSockets[connectionID] = [
        ...connectedSockets[connectionID],
        { id: socket.id, agent: userAgent },
      ];
    } catch (err) {
      connectedSockets[connectionID] = [{ id: socket.id, org: true, agent: userAgent }];
    }
    const cb = connectedSockets[connectionID].length > 1 ? connectedSockets[connectionID] : false;
    socket.emit('connectedDevices', cb);
    socket.broadcast.to(socket.room).emit('connectedDevices', cb);
    const thing = things[connectionID] || [];
    socket.emit('existingFiles', thing);
    console.log('joinBridge');
    console.log(connectedSockets);
  });

  socket.on('shareFile', (file, connectionID) => {
    console.log(connectionID);
    const sender = connectedSockets[connectionID].find((el) => el.id === socket.id);
    console.log(sender);
    const sharedFile = {
      file,
      owner: sender.agent,
      id: uuidv4(),
    };
    try {
      things[connectionID] = [...things[connectionID], sharedFile];
      console.log('tried ok');
    } catch (err) {
      things[connectionID] = [sharedFile];
      console.log('catch not ok');
    }
    try {
      socket.broadcast.to(socket.room).emit('receiveFile', sharedFile);
      socket.emit('receiveFile', sharedFile);
    } catch (err) {
      console.log('er');
    }

    console.log('shareFile');
  });

  socket.on('removeFile', (id, connectionID) => {
    const filtered = things[connectionID].filter((el) => el.id !== id);
    things[connectionID] = filtered;
  });

  socket.on('disconnect', () => {
    try {
      connectedSockets[socket.room] = connectedSockets[socket.room].filter(
        (el) => el.id !== socket.id,
      );
    } catch (err) {
      console.log(connectedSockets[socket.room]);
      console.log(connectedSockets);
    }
  });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});
const port = process.env.PORT || '9000';
app.set('port', port);
module.exports = { app, server };
