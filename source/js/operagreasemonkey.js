/* Çağlar Yeşilyurt(greench http://my.opera.com/greench) @ Opera Türkiye http://www.operaturkiye.net
 * @version 0.1 
 */ 

/*
 *	Core Functions 
 * 
 * */

	
/*
 * parseVariable returns type based variable from storage.
 */
var parseVariable = function(value){
	try{
		var values	=	JSON.parse(value);
	}
	catch(err){
		console.log("ERROR 2: Unknown variable type to parse STAGE 1");
		return false;
	}
	switch(values.type){
		case "number":
			var result	= Number(values.value);
			console.log("number");
		break;
		case "string":
			var result	= String(values.value);
			console.log("string");
		break;				
		case "boolean":
			var result	= Boolean(values.value);
			console.log("boolean");
		break;
		default:
			console.log("ERROR 1: Unknown variable type STAGE 1");
		break;
	}
}
/*
 * It returns a string JSON variable 
 *  accepted variable types (number,string,boolean)
 */
var variableToString = function(value){
	var type	=	typeof value;
	switch(type){
		case "number":
		case "string":
		case "boolean":
			var result	=	{"type":type,"value":value};
			result		=	JSON.stringify(result);
		break;
		default:
		console.log("ERROR 1: Unknown variable type STAGE 2");
		break;
	}
	return result;			
}

/**
 * 
 *
 * End of core functions
 */


/*
 * Artificial GM_setValue function
 * It accepts all type variables that are accepted by GM_setValue 
 */
function GM_setValue(key, value){
    window.localStorage.setItem(key,variableToString(value));
}
/*
 * Artificial GM_getValue function
 * It accepts all type variables that are accepted by GM_getValue 
 */
function GM_getValue(key,dfault){
    return (window.localStorage.getItem(key)   ==  null)   ?   dfault  ?   dfault  : undefined :    parseVariable(window.localStorage.getItem(key));
}
/*
 * Artificial GM_listValues function
 */
function GM_listValues(){
    var returnedArray   =   new Array();
    var totalAmount     =   window.localStorage.length;
    for (var i=0;i<totalAmount;i++){
        returnedArray.push(parseVariable(window.localStorage.key(i)));
    }
    return returnedArray;
}
/*
 * Artificial GM_deleteValue function
 * It accepts all type variables that are accepted by GM_deleteValue 
 */
function GM_deleteValue(key){
    window.localStorage.removeItem(key);
}

/*
 * Artificial error console 
 */
GM_log = opera.postError;

function GM_openInTab(url){
	opera.extension.tabs.create({"focused":true,"url":url});
}

function GM_xmlhttpRequest(details){
	/*
binary 
Boolean (Compatibility: 0.8.3+) Optional, default false. When true, use the underlying .sendAsBinary() method. 
data 
String Optional. Data to send in the request body. Usually for POST method requests. [1] 
headers  - // must be tested
Object Optional. A set of headers to include in the request. [2] 
method  - // must be tested
String Type of HTTP request to make (E.G. "GET", "POST") 
onabort  - // must be tested
Function (Compatibility: 0.9.9+) Optional. Will be called when the request is aborted. Passed one argument, the #Response Object. 
onerror  - // must be tested
Function Optional. Will be called if an error occurs while processing the request. Passed one argument, the #Response Object. 
onload  - // must be tested
Function Optional. Will be called when the request has completed successfully. Passed one argument, the #Response Object. 
onprogress  - // must be tested
Function (Compatibility: 0.9.9+) Optional. Will be called when the request progress changes. Passed one argument, the #Response Object. 
onreadystatechange 
Function Optional. Will be called repeatedly while the request is in progress. Passed one argument, the #Response Object. 
overrideMimeType 
String (Compatibility: 0.6.8+) Optional. A MIME type to specify with the request (E.G. "text/html; charset=ISO-8859-1"). 
password  - // must be tested
String (Compatibility: 0.9.0+) Optional. Password to use for authentication purposes. 
synchronous - // must be tested 
Boolean (Compatibility: 0.9.9+) When true, this is a synchronous request. Be careful: The entire Firefox UI will be locked and frozen until the request completes. In this mode, more data will be available in the return value. 
upload 
Object (Compatibility: 0.9.9+) Optional. Object containing optional function callbacks (onabort, onerror, onload, onprogress) to monitor the upload of data. Each is passed one argument, the #Response Object. 
url - // must be tested
String The URL to make the request to. Must be an absolute URL, beginning with the scheme. As of version 0.8.6, the URL may be relative to the current page. 
user - // must be tested
String (Compatibility: 0.9.0+) Optional. User name to use for authentication purposes.
	 */
	if(details.method==undefined || details.url==undefined || details.onload==undefined) return;
	
	details.synchronous 		= details.synchronous == undefined 			? false 				: Boolean(details.synchronous);
	details.user 				= details.user == undefined 				? "" 					: details.user.toString();
	details.password 			= details.password == undefined 			? "" 					: details.password.toString();

	request_object		= new XMLHttpRequest();
	request_object.open(details.method,details.url,details.synchronous,details.user,details.password);

	request_object.onprogress			= typeof details.onprogress == "function" 			? details.onprogress 			: function() {};
	request_object.onabort				= typeof details.onabort == "function" 				? details.onabort 				: function() {};
	request_object.onerror				= typeof details.onerror == "function" 				? details.onerror 				: function() {};
	request_object.onload				= typeof details.onload == "function" 				? details.onload 				: function() {};
	request_object.onreadystatechange	= typeof details.onreadystatechange== "function" 	? details.onreadystatechange 	: function() {};
	
	if(b.headers!=undefined){
		for (header in b.headers){
			request_object.setRequestHeader(header, b.headers[header]);
		}
	}
	request_object.send();
}

function GM_addStyle(css){
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
  		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}
/*
Metadata Block
will be coded with php

GM deleteValue
Finished

GM getValue
Finished

GM listValues
Finished

GM setValue
Finished

GM getResourceText

GM getResourceURL

GM addStyle
Finished

GM xmlhttpRequest

UnsafeWindow

GM log
Finished

GM openInTab
Finished

GM registerMenuCommand
 
 */
