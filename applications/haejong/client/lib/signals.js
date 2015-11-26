/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */
/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */
!function(a){
// SignalBinding -------------------------------------------------
//================================================================
/**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
function b(a,b,c,d,e){/**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
this._listener=b,/**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
this._isOnce=c,/**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
this.context=d,/**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
this._signal=a,/**
         * Listener priority
         * @type Number
         * @private
         */
this._priority=e||0}/*global SignalBinding:false*/
// Signal --------------------------------------------------------
//================================================================
function c(a,b){if("function"!=typeof a)throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b))}/**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
function d(){/**
         * @type Array.<SignalBinding>
         * @private
         */
this._bindings=[],this._prevParams=null;
// enforce dispatch to aways work on same context (#47)
var a=this;this.dispatch=function(){d.prototype.dispatch.apply(a,arguments)}}b.prototype={/**
         * If binding is active and should be executed.
         * @type boolean
         */
active:!0,/**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
params:null,/**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
execute:function(a){var b,c;return this.active&&this._listener&&(c=this.params?this.params.concat(a):a,b=this._listener.apply(this.context,c),this._isOnce&&this.detach()),b},/**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},/**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
isBound:function(){return!!this._signal&&!!this._listener},/**
         * @return {boolean} If SignalBinding will only be executed once.
         */
isOnce:function(){return this._isOnce},/**
         * @return {Function} Handler function bound to the signal.
         */
getListener:function(){return this._listener},/**
         * @return {Signal} Signal that listener is currently bound to.
         */
getSignal:function(){return this._signal},/**
         * Delete instance properties
         * @private
         */
_destroy:function(){delete this._signal,delete this._listener,delete this.context},/**
         * @return {string} String representation of the object.
         */
toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},d.prototype={/**
         * Signals Version Number
         * @type String
         * @const
         */
VERSION:"1.0.0",/**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
memorize:!1,/**
         * @type boolean
         * @private
         */
_shouldPropagate:!0,/**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
active:!0,/**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
_registerListener:function(a,c,d,e){var f,g=this._indexOfListener(a,d);if(-1!==g){if(f=this._bindings[g],f.isOnce()!==c)throw new Error("You cannot add"+(c?"":"Once")+"() then add"+(c?"Once":"")+"() the same listener without removing the relationship first.")}else f=new b(this,a,c,d,e),this._addBinding(f);return this.memorize&&this._prevParams&&f.execute(this._prevParams),f},/**
         * @param {SignalBinding} binding
         * @private
         */
_addBinding:function(a){
//simplified insertion sort
var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},/**
         * @param {Function} listener
         * @return {number}
         * @private
         */
_indexOfListener:function(a,b){for(var c,d=this._bindings.length;d--;)if(c=this._bindings[d],c._listener===a&&c.context===b)return d;return-1},/**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
has:function(a,b){return-1!==this._indexOfListener(a,b)},/**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
add:function(a,b,d){return c(a,"add"),this._registerListener(a,!1,b,d)},/**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
addOnce:function(a,b,d){return c(a,"addOnce"),this._registerListener(a,!0,b,d)},/**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
remove:function(a,b){c(a,"remove");var d=this._indexOfListener(a,b);//no reason to a SignalBinding exist if it isn't attached to a signal
return-1!==d&&(this._bindings[d]._destroy(),this._bindings.splice(d,1)),a},/**
         * Remove all listeners from the Signal.
         */
removeAll:function(){for(var a=this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},/**
         * @return {number} Number of listeners attached to the Signal.
         */
getNumListeners:function(){return this._bindings.length},/**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
halt:function(){this._shouldPropagate=!1},/**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
dispatch:function(a){if(this.active){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c]);var d=this._bindings.length;if(this.memorize&&(this._prevParams=b),d){var e=this._bindings.slice();//clone array in case add/remove items during dispatch
this._shouldPropagate=!0;//in case `halt` was called before dispatch or during the previous dispatch.
//execute all callbacks until end of the list or until a callback returns `false` or stops propagation
//reverse loop since listeners with higher priority will be added at the end of the list
do d--;while(e[d]&&this._shouldPropagate&&e[d].execute(b)!==!1);this._shouldPropagate=-1==d}}},/**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
forget:function(){this._prevParams=null},/**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
dispose:function(){this.removeAll(),delete this._bindings,delete this._prevParams},/**
         * @return {string} String representation of the object.
         */
toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};
// Namespace -----------------------------------------------------
//================================================================
/**
     * Signals namespace
     * @namespace
     * @name signals
     */
var e=d;/**
     * Custom event broadcaster
     * @see Signal
     */
// alias for backwards compatibility (see #gh-44)
e.Signal=d,
//exports to multiple environments
"function"==typeof define&&define.amd?//AMD
define("lib/signals",[],function(){return e}):"undefined"!=typeof module&&module.exports?//node
module.exports=e://browser
//use string because of Google closure compiler ADVANCED_MODE
/*jslint sub:true */
a.signals=e}(this);