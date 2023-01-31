console.log('Hanlin Cloud Quiz Helper injected!,DONT USE THIS IN EXAM!');
console.log('v'+chrome.runtime.getManifest().version);
var now = 0;//we procced 0 question
console.log('Hanlin Cloud Quiz Helper is waiting 15s for the page to load...');
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}//from https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript/247261#247261 
setTimeout(main, 15000);//sleep 15s
async function main() {
    const parser = new DOMParser();
    try {
        while (1){
            now = now + 1;
            var link = document.querySelector("body > div.container.main-container > div.question-block > div:nth-child("+now+") > iframe").src;
            await fetch('https://cors-proxy-1lp4.onrender.com/'+link, {})
             .then((response) => {
                return response.text(); 
            }).then((data) => {
                //data = the html
                const html = parser.parseFromString(data, 'text/html');
                var scripts = html.getElementsByTagName('script')[0].text;
                scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");scripts = scripts.replace(/[\w\W]+?\n+?/,"");//replace the first 5 lines
                scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');scripts = scripts.replace(/\n.*$/, '');//replace the last 6 lines
                scripts = scripts.replace('var itemData = ','');
                if (scripts.startsWith('		{')){//its unbase64
                    //jsonfile = scripts.replace(';',''); //This cause syntax error while parse json in some cases
                }
                else{//its base64
                    scripts = scripts.substring(0, scripts.length - 1);scripts = scripts.substring(0, scripts.length - 1);scripts = scripts.substring(0, scripts.length - 1);
                    url_encodedfile = Base64.decode(scripts);
                    jsonfile = decodeURIComponent(url_encodedfile);
                }
                jsonfile = jsonfile.replace('		','');//replace the first tab
                try{var obj = JSON.parse(jsonfile);
                    var answer = obj.answer;
                    console.log(now +' ans: '+ answer)
                }
                catch(e){
                    console.log('Hanlin Cloud Quiz Helper error at question ' + now);
                    console.log(e);
                    console.log(jsonfile);
                }
                
            })
        }
    } catch (e) {
        console.log('Hanlin Cloud Quiz Helper error: ' + e);
        console.log('This might be the end of the quiz.If not, please open an issue at github:yoni13.');
    }
}
