
window.oncontextmenu = null;
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}//from https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript/247261#247261 
setTimeout(main, 20000);//sleep 15s
function main() {
    const parser = new DOMParser();
    fetch(location.href, {})
    .then((response) => {
       return response.text(); 
   }).then((data) => {
    const html = parser.parseFromString(data, 'text/html');
    var scripts = html.getElementsByTagName('script')[0].text;
    scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");//replace the first 5 lines
    scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');//replace the last 6 lines
    scripts = scripts.replace('var itemData = ','');
    
    if (scripts.startsWith('		{')){//its unbase64
        //jsonfile = scripts.replace(';',''); //This cause syntax error while parse json in some cases
        console.log("unbase64");
        ans = JSON.parse(scripts);
        document.querySelector("body > div > div.question-inner-wrapper > div:nth-child(1) > div > div > div.preamble > div.display-block > p:nth-child(1) > span.question-type-text").innerHTML = ans.answer;

    }
    
    else{//its base64
        try{
        ujsond = Base64.decode(scripts);
        jsond = decodeURIComponent(ujsond);
        jsoned = JSON.parse(jsond);
        console.log(JSON.parse(jsoned.answer));
        document.querySelector("body > div > div.question-inner-wrapper > div:nth-child(1) > div > div > div.preamble > div.display-block > p:nth-child(1) > span.question-type-text").innerHTML = JSON.parse(jsoned.answer);
        }
        catch{
            try{
            scripts = scripts.replace('=";','');
            ujsond = Base64.decode(scripts);
            jsond = decodeURIComponent(ujsond);
            jsoned = JSON.parse(JSON.stringify(jsond));
            console.log(JSON.parse(jsoned.answer));
            document.querySelector("body > div > div.question-inner-wrapper > div:nth-child(1) > div > div > div.preamble > div.display-block > p:nth-child(1) > span.question-type-text").innerHTML = JSON.parse(jsoned.answer);
        }
        catch(e){console.log(jsond+'\n erorr '+ e);}
        }
       
    }
    
    
});}