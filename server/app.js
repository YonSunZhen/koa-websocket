/* 实例化外部依赖 */
let Koa = require("koa");
let WebSocket = require("koa-websocket");
const route = require('koa-route');

/* 实例化 WebSocket, 实例化储存所有上线文数组 并分配监听的端口 */
let app = WebSocket(new Koa());

/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
  return next();
});

app.ws.use(route.all('/test', function (ctx) {
  console.log('debug1');
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', function(message) {
    // do something with the message from client
    console.log(message);
    ctx.websocket.send(message);
  });
  let i = 0;
  setInterval(() => {
    i++;
    ctx.websocket.send(i);
  },1000)
}));
 
app.listen(3000);