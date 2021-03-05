# WebSocket

## WebSocketの仕組み

クライアントから以下のリクエストをサーバーに送る（完全にHTTP）

```
GET /resource HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: upgrade
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: E4WSEcseoWr4csPLS2QJHA==
```

UpgradeヘッダやConnectionヘッダが存在する事で、この二つでHTTPからWebSocketへのプロトコルのアップグレードを表現している。

Sec-Websocket-Keyヘッダは、特定のクライアントとのコネクションの確立を立証する為に使われる。サーバは**Sec-Websocket-Keyヘッダに指定された値を元に新しく値を生成**して**Sec-WebSocket-Acceptヘッダにその値を指定してレスポンスを返す**ので、クライアントとしては自分のSec-Websocket-Keyの値が使われているかどうかが確認出来る様になっている。その為、自分のリクエストに対するレスポンスである事が保証出来て嬉しかったりする。

レスポンス（完全にHTTP）

```
HTTP/1.1 101 OK
Upgrade: websocket
Connection: upgrade
Sec-WebSocket-Accept: 7eQChgCtQMnVILefJAO6dK5JwPc=
```

この辺のコネクション確立の為の一連の流れは「WebSocket opening ハンドシェイク」と呼ばれる。

## 双方向通信の実現

HTTP使用前にTCPのコネクションを確立している。ハンドシェイク後はその確立されたTCPコネクション上で、双方向にデータをやり取りする事になる。

WebSocketにおいては、 フレーム と呼ばれる単位でデータが送信される。フレームは、ビットの並びから構成されていて、小さなデータサイズで必要な情報を送る事が出来る。

## 結論

TCPコネクションを張りっぱなしにして通信を行う為、Blocking I/Oを持つWebサーバとは相性が悪い。Blocking I/Oを持つサーバープロセスは一度に1つのクライアントとしかコネクションを張れない為、WebSocketを使いたければクライアントの数だけサーバープロセスが必要になってしまう。

## 参考文献

[WebSocket Protocol](https://triple-underscore.github.io/RFC6455-ja.html)

[WebSocketについて調べてみた。 - Qiita](https://qiita.com/south37/items/6f92d4268fe676347160)