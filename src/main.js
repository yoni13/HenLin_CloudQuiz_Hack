console.log('Hanlin Cloud Quiz Helper injected!');
var now = 0;//we procced 0 question
setTimeout(main, 10000);//sleep 10s
function main() {
    console.log('Hanlin Cloud Quiz Helper loaded!');
    try {
        while (1){
            now++;
            var link = document.querySelector("body > div.container.main-container > div.question-block > div:nth-child("+now+") > iframe").src;
            var element = document.querySelector("body > div.container.main-container > div.question-block > div:nth-child("+now+") > iframe")
            console.log(link);
            // fetch('https://cors-proxy-1lp4.onrender.com/'+link, {})
            // .then((response) => {
            //     console.log(response);
            //     return response.json(); 
            // }).then((data) => {
            // })
            // not finished
        }
    } catch (e) {
        console.log('Hanlin Cloud Quiz Helper error: ' + e);
    }
}
