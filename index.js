const AbsintheSocket = require("@absinthe/socket");
const {Socket: PhoenixSocket} = require("phoenix");

const abSock = AbsintheSocket.create(
	new PhoenixSocket("wss://api.bespiral.io/socket")
);

const operation = `
  subscription salesOperation {
    salesOperation {
      id
      title 
      units
      isBuy
    }
  }
`;

// cancel any existing notifier 
let notifier = AbsintheSocket.cancel(abSock, {});

// create a new notifier for this operation 
notifier = AbsintheSocket.send(abSock, {
	operation,
	variable: {}
});

// observe the notifier 
AbsintheSocket.observe(abSock, notifier, {
	onAbort,
	onError, 
	onCancel,
	onStart, 
	onResult
});


// this handles a successful subscription registration, a good point to tell the user to wait 
function onStart(data) {
	console.log(">>> Start", JSON.stringify(data));
}


//handle connection failure from the client side, inform the user of connection issues 
function onAbort(data) {
	console.log(">>> Abort", JSON.stringify(data));
}


//handle error occurence when registering listener, inform the user of subscription failure
function onError(data) {
	console.log(">>> Error", JSON.stringify(data));
}

//handle connection cancel 
function onCancel(data) {
	console.log(">>> Cancel", JSON.stringify(data));
}

//handle result from subscription, inform the user of the result from the subscription
function onResult(res) {
	console.log(">>> Result", JSON.stringify(res));
}



