// Establish WebSocket connection
const ws = new WebSocket('wss://pumpportal.fun/api/data');

ws.addEventListener('open', () => {
  console.log('WebSocket connection opened.');

  // Subscribe to token creation events
  ws.send(
    JSON.stringify({
      method: 'subscribeNewToken',
    })
  );

  // Subscribe to trades made by specific accounts
  ws.send(
    JSON.stringify({
      method: 'subscribeAccountTrade',
      keys: ['AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV'], // Array of accounts to watch
    })
  );

  // Subscribe to trades on specific tokens
  ws.send(
    JSON.stringify({
      method: 'subscribeTokenTrade',
      keys: ['91WNez8D22NwBssQbkzjy4s2ipFrzpmn5hfvWVe2aY5p'], // Array of token CAs to watch
    })
  );
});

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);

  // Dynamically update content based on data
  if (data.event === 'newToken') {
    document.getElementById('tokens-created-content').textContent =
      `New Token: ${data.tokenName || 'N/A'}`;
  } else if (data.event === 'accountTrade') {
    document.getElementById('transactions-content').textContent =
      `Trade: ${data.tradeDetails || 'Details unavailable'}`;
  } else if (data.event === 'tokenTrade') {
    document.getElementById('account-trades-content').textContent =
      `Token Trade: ${data.tokenTradeDetails || 'Details unavailable'}`;
  }
});

ws.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.addEventListener('close', () => {
  console.log('WebSocket connection closed.');
});
