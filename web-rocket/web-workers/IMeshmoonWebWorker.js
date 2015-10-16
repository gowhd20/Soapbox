/*
 * Meshmoon WebRocket v1.5.8
 * www.adminotech.com / www.meshmoon.com
 *
 * Copyright Adminotech Ltd. 2013-2015 - All Rights Reserved.
 * No part of this script or any of its contents
 * may be used, reproduced, copied, modified or adapted,
 * without the prior written consent of the author.
 *
 * See included 3rd party libraries for their licenses.
 *
 * Commit   1.5.8-0-af30dbf
 * Date     20.7.2015 9:55:32 UTC
 * Meta     @preserve
 */
importScripts("http://meshmoon.s3.amazonaws.com/releases/webrocket/nightly/lib/classy.js");var IMeshmoonWebWorker=Class.$extend({__init__:function(){this.index=void 0,this.name=void 0,this.debug=void 0,this.state={},this.log={_createArguments:function(a){var b=[].slice.call(a);return b.splice(0,0,this.prefix),b},info:function(){console.log.apply(console,this._createArguments(arguments))},debug:function(){this.debugging&&console.debug.apply(console,this._createArguments(arguments))},error:function(){console.error.apply(console,this._createArguments(arguments))},warn:function(){console.warn.apply(console,this._createArguments(arguments))},prefix:"",debugging:!1},onmessage=this._onMessage.bind(this)},__classvars__:{Protocol:void 0},_onMessage:function(a){var b=a.data;return b?void("object"==typeof b&&"string"==typeof b.id&&0===b.id.indexOf("MeshmoonWebWorkerManager.")?this._onProtocolMessage(b):this.onMessage(b)):void this.log.error("Received bogus data",b,a)},_onProtocolMessage:function(a){"MeshmoonWebWorkerManager.Initialize"===a.id?(this.index="number"==typeof a.index?a.index:"x",this.name="WebWorker."+(this.index<10?"0":"")+this.index+"."+a.name,this.log.prefix="["+this.name+"]",this.debug=this.log.debugging=a.debug===!0,IMeshmoonWebWorker.Protocol=a.protocol,this.log.debug("Initialized protocol")):a.id===IMeshmoonWebWorker.Protocol.LoadDependencies?this.processDependencies(a):a.id===IMeshmoonWebWorker.Protocol.Configuration?this.processConfiguration(a):a.id===IMeshmoonWebWorker.Protocol.WorkOrder&&(this.state.tStart=performance.now(),this.processWorkOrder(a.payload,a.metadata))},processDependencies:function(a){var b=performance.now();importScripts.apply(null,a.scripts),this.log.debug("Loaded dependencies",a.scripts,"in",(performance.now()-b).toFixed(2),"msec")},processWorkOrder:function(a,b){},processConfiguration:function(a){},onMessage:function(a){},postWorkResult:function(a,b,c){postMessage({id:IMeshmoonWebWorker.Protocol.WorkResult,payload:a,metadata:b,duration:performance.now()-this.state.tStart},c)},postWorkError:function(a,b){postMessage({id:IMeshmoonWebWorker.Protocol.WorkResult,error:a,metadata:b,duration:performance.now()-this.state.tStart})}});