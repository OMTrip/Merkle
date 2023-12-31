export const getInjectedJavaScript = (chainId, networkVersion) => {
  return `(function () {
        window.relyAppDebug = true;
        window.relyNetworkId = ${networkVersion};
        window.relyChainId = ${chainId};
        if (typeof EthereumProvider === "undefined") {
            var callbackId = 0;
            var callbacks = {};
    
            var postMessage = function (data) {
                ReactNativeWebView.postMessage(JSON.stringify(data));
            }
    
            var history = window.history;
            var pushState = history.pushState;
            history.pushState = function (state) {
                setTimeout(function () {
                    postMessage({
                        type: 'history-state-changed',
                        navState: {url: location.href, title: document.title}
                    });
                }, 100);
                return pushState.apply(history, arguments);
            };
    
            function sendAPIrequest(permission, params) {
                var messageId = callbackId++;
                var params = params || {};
    
                postMessage({
                    type: 'api-request',
                    permission: permission,
                    messageId: messageId,
                    params: params
                });
    
                return new Promise(function (resolve, reject) {
                    params['resolve'] = resolve;
                    params['reject'] = reject;
                    callbacks[messageId] = params;
                });
            }
    
            function qrCodeResponse(data, callback) {
                var result = data.data;
                var regex = new RegExp(callback.regex);
                if (!result) {
                    if (callback.reject) {
                        callback.reject(new Error("Cancelled"));
                    }
                } else if (regex.test(result)) {
                    if (callback.resolve) {
                        callback.resolve(result);
                    }
                } else {
                    if (callback.reject) {
                        callback.reject(new Error("Doesn't match"));
                    }
                }
            }
    
            function Unauthorized() {
                this.name = "Unauthorized";
                this.id = 4100;
                this.code = 4100;
                this.message = "The requested method and/or account has not been authorized by the user.";
            }
    
            Unauthorized.prototype = Object.create(Error.prototype);
    
            function UserRejectedRequest() {
                this.name = "UserRejectedRequest";
                this.id = 4001;
                this.code = 4001;
                this.message = "The user rejected the request.";
            }
    
            UserRejectedRequest.prototype = Object.create(Error.prototype);
            ReactNativeWebView.onMessage = function (message) {
                console.log('onMessage');
                data = JSON.parse(message);
                console.log(data);
                var id = data.messageId;
                var callback = callbacks[id];
    
                if (callback) {
                    if (data.type === "api-response") {
                        if (data.permission == 'qr-code') {
                            qrCodeResponse(data, callback);
                        } else if (data.isAllowed) {
                            if (data.permission == 'web3') {
                                var selectedAddress = data.data[0]
                                window.relyAppcurrentAccountAddress = selectedAddress;
                                // Set deprecated metamask fields
                                window.ethereum.selectedAddress = selectedAddress;
                                window.ethereum.emit("accountsChanged", data.data);
                            }
                            callback.resolve(data.data);
                        } else {
                            callback.reject(new UserRejectedRequest());
                        }
                    } else if (data.type === "web3-send-async-callback") {
                        if (callback.beta) {
                            if (data.error) {
                                if (data.error.code == 4100)
                                    callback.reject(new Unauthorized());
                                else
                                    callback.reject(data.error);
                            } else {
                                if (window.relyAppDebug) {
                                    console.log("resolve " + callback.method + " :" + JSON.stringify(data.result.result));
                                }
                                callback.resolve(data.result.result);
                            }
                        } else if (callback.results) {
                            callback.results.push(data.error || data.result);
                            if (callback.results.length == callback.num)
                                callback.callback(undefined, callback.results);
                        } else {
                            callback.callback(data.error, data.result);
                        }
                    }
                }
            };
    
            function web3SuccessResponse(payload, result) {
                return {
                    id: payload.id,
                    jsonrpc: "2.0",
                    method: payload.method,
                    result: result
                };
            }
    
            function web3ErrorResponse(payload, error) {
                return {
                    id: payload.id,
                    jsonrpc: "2.0",
                    method: payload.method,
                    error: error
                };
            }
    
            function getSyncResponse(payload) {
                if (payload.method == "eth_accounts" && (typeof window.relyAppcurrentAccountAddress !== "undefined")) {
                    return web3SuccessResponse(payload, [window.relyAppcurrentAccountAddress])
                } else if (payload.method == "eth_coinbase" && (typeof window.relyAppcurrentAccountAddress !== "undefined")) {
                    return web3SuccessResponse(payload, window.relyAppcurrentAccountAddress)
                } else if (payload.method == "net_version") {
                    return web3SuccessResponse(payload, window.relyNetworkId)
                } else if (payload.method == "eth_chainId") {
                    return web3SuccessResponse(payload, "0x" + Number(window.relyNetworkId).toString(16))
                } else if (payload.method == "eth_uninstallFilter") {
                    return web3SuccessResponse(payload, true);
                } else {
                    return null;
                }
            }
        
            var EthereumProvider = function () {
            };
    
            EthereumProvider.prototype.isMetaMask = true;
            EthereumProvider.prototype.isRely = true;
            EthereumProvider.prototype.isConnected = function () {
                return true;
            };
            // Set legacy metamask fields https://docs.metamask.io/guide/ethereum-provider.html#legacy-api
            EthereumProvider.prototype.networkVersion = window.relyNetworkId;
            EthereumProvider.prototype.chainId = "0x" + Number(window.relyNetworkId).toString(16);
    
            EthereumProvider.prototype._events = {};
    
            EthereumProvider.prototype.on = function (name, listener) {
                console.log(name);
                console.log(listener);
                if (!this._events[name]) {
                    this._events[name] = [];
                }
                this._events[name].push(listener);
            }
    
            EthereumProvider.prototype.removeListener = function (name, listenerToRemove) {
                if (!this._events[name]) {
                    return
                }
    
                const filterListeners = (listener) => listener !== listenerToRemove;
                this._events[name] = this._events[name].filter(filterListeners);
            }
    
            EthereumProvider.prototype.removeAllListeners = function () {
                this._events = {};
            }
    
            EthereumProvider.prototype.emit = function (name, data) {
                if (name == "chainChanged") {
                    EthereumProvider.prototype.chainId = data;
                }
                if (name == "networkChanged") {
                    EthereumProvider.prototype.networkVersion = data;
                }
                if (!this._events[name]) {
                    return
                }
                this._events[name].forEach(cb => {
                    // Status solution: https://github.com/status-im/status-mobile/issues/13642
                    // Metamask also errors on the same issue, but it's using https://github.com/MetaMask/safe-event-emitter and therefore the dapp still works
                    try {
                        cb(data)
                    } catch (e) {
                        setTimeout((() => {
                            throw e
                        }))
                    }
                });
            }
            EthereumProvider.prototype.enable = function () {
                if (window.relyAppDebug) {
                    console.log("enable");
                }
                return sendAPIrequest('web3');
            };
    
            EthereumProvider.prototype.scanQRCode = function (regex) {
                return sendAPIrequest('qr-code', {regex: regex});
            };
    
            EthereumProvider.prototype.request = function (requestArguments) {
                if (window.relyAppDebug) {
                    console.log("request: " + JSON.stringify(requestArguments));
                }
                if (!requestArguments) {
                    return Promise.reject(new Error('Request is not valid.'));
                }
                var method = requestArguments.method;
                if (!method) {
                    return Promise.reject(new Error('Request is not valid.'));
                }
    
                if (method === 'eth_requestAccounts') {
                    return sendAPIrequest('web3');
                }
    
                var syncResponse = getSyncResponse({method: method});
                if (syncResponse) {
                    return new Promise(function (resolve, reject) {
                        if (window.relyAppDebug) {
                            console.log("resolved sync method: " + method + ", result: " + JSON.stringify(syncResponse.result));
                        }
                        resolve(syncResponse.result);
                    });
                }
    
                var messageId = callbackId++;
                var payload = {
                    id: messageId,
                    jsonrpc: "2.0",
                    method: method,
                    params: requestArguments.params
                };
    
                postMessage({
                    type: 'web3-send-async-read-only',
                    messageId: messageId,
                    payload: payload
                });
    
                return new Promise(function (resolve, reject) {
                    callbacks[messageId] = {
                        beta: true,
                        method: method,
                        resolve: resolve,
                        reject: reject
                    };
                });
            };
    
            // (DEPRECATED) Support for legacy send method
            EthereumProvider.prototype.send = function (param1, param2) {
                // reference: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
                if (typeof param1 == 'object') {
                    //maybe ways of:
                    //1.ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
                    //2.ethereum.send(payload: JsonRpcRequest): unknown;
                    if (window.relyAppDebug) {
                        console.log("send (legacy), payload: " + JSON.stringify(param1) + ", callback: " + param2);
                    }
    
                    var syncResponse = getSyncResponse(param1);
                    if(syncResponse){
                        if(param2){
                            param2(null, syncResponse);
                            return;
                        }else
                            return syncResponse;
                    }
    
                    this.request(param1).then(result => {
                        if (param2) {
                            param2(null, web3SuccessResponse(param1, result));
                        }
                    }, reason => {
                        if (window.relyAppDebug) {
                            console.log("send (legacy) failed. payload: " + JSON.stringify(param1) + ", reason: " + reason)
                        }
                        if (param2) {
                            param2(reason, web3ErrorResponse(param1, reason))
                        }
                    });
                } else if (typeof param1 == 'string') {
                    var method = param1;
                    var params = param2;
                    if (window.relyAppDebug) {
                        console.log("send (legacy), method: " + method + ", params: " + JSON.stringify(params));
                    }
                    return this.request({method: method, params: params});
                } else {
                    throw new Error("unsupported call to send, param1: " + param1 + ", param2: " + param2)
                }
            }
    
            // (DEPRECATED) Support for legacy sendSync method
            EthereumProvider.prototype.sendSync = function (payload) {
                if (window.relyAppDebug) {
                    console.log("sendSync (legacy)" + JSON.stringify(payload));
                }
                if (payload.method == "eth_uninstallFilter") {
                    this.sendAsync(payload, function (res, err) {
                    })
                }
                var syncResponse = getSyncResponse(payload);
                if (syncResponse) {
                    return syncResponse;
                } else {
                    return web3SuccessResponse(payload, null);
                }
            };
    
            // (DEPRECATED) Support for legacy sendAsync method
            EthereumProvider.prototype.sendAsync = function (payload, callback) {
                if (window.relyAppDebug) {
                    console.log("sendAsync (legacy)" + JSON.stringify(payload));
                }
                if (!payload) {
                    return new Error('Request is not valid.');
                }
                if (payload.method == 'eth_requestAccounts') {
                    return sendAPIrequest('web3');
                }
                var syncResponse = getSyncResponse(payload);
                if (syncResponse && callback) {
                    callback(null, syncResponse);
                } else {
                    var messageId = callbackId++;
    
                    if (Array.isArray(payload)) {
                        callbacks[messageId] = {
                            num: payload.length,
                            results: [],
                            callback: callback
                        };
                        for (var i in payload) {
                            postMessage({
                                type: 'web3-send-async-read-only',
                                messageId: messageId,
                                payload: payload[i]
                            });
                        }
                    } else {
                        callbacks[messageId] = {callback: callback};
                        postMessage({
                            type: 'web3-send-async-read-only',
                            messageId: messageId,
                            payload: payload
                        });
                    }
                }
            };
        }
        window.ethereum = new EthereumProvider();
        window.rely = {
            ethereum: window.ethereum
        }
    })();`;
};
