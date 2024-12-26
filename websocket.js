// Establish WebSocket connection
const ws = new WebSocket('wss://pumpportal.fun/api/data');

ws.on('open', function open() {
  console.log('WebSocket connection opened.');

  // Subscribing to token creation events
  let payload = {
    method: "subscribeNewToken",
  };
  ws.send(JSON.stringify(payload));

  // Subscribing to trades made by accounts
  payload = {
    method: "subscribeAccountTrade",
    keys: ["AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV"], // Array of accounts to watch
  };
  ws.send(JSON.stringify(payload));

  // Subscribing to trades on tokens
  payload = {
    method: "subscribeTokenTrade",
    keys: ["91WNez8D22NwBssQbkzjy4s2ipFrzpmn5hfvWVe2aY5p"], // Array of token CAs to watch
  };
  ws.send(JSON.stringify(payload));
});

ws.on('message', function message(event) {
  const data = JSON.parse(event.data);

  if (data.event === 'newToken') {
    // Update the Tokens Created section
    document.getElementById('tokens-created-content').textContent =
      `New Token Created: ${data.tokenName || 'N/A'}`;
  } else if (data.event === 'accountTrade') {
    // Update the Transactions section
    document.getElementById('transactions-content').textContent =
      `Account Trade: ${data.tradeDetails || 'Details unavailable'}`;
  } else if (data.event === 'tokenTrade') {
    // Update the Account Trades section
    document.getElementById('account-trades-content').textContent =
      `Token Trade: ${data.tokenTradeDetails || 'Details unavailable'}`;
  }
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});

ws.on('close', function close() {
  console.log('WebSocket connection closed.');
});
