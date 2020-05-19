# perfload

A scalable Node.js program that captures local performance data
via local Redis and Socket.IO servers.

Redis is used for cross-scope communication between worker nodes
on their connectivity states -- online or offline.

Socket.IO was the preferred web socket layer to handle cases of
nodes connecting through proxies or load balances, which Socket.IO
handles by long-polling connections.

Can be used with or without React. Enjoy!
