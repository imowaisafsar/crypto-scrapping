// console.log("Content Script Running.")

chrome.runtime.onMessage.addListener((msg, sender, res) => {
    if (msg.command === 'cryptBuySellExtension_saveData') {
        console.log(msg)
        // let localData_cryptBuySellExtension_values = {
        //     price: msg.data.price,
        //     range: msg.data.range,
        // }
        window.localStorage.setItem('localData_cryptBuySellExtension_values', true);
        window.localStorage.setItem('localData_cryptBuySellExtension_price', msg.data.price);
        window.localStorage.setItem('localData_cryptBuySellExtension_range', msg.data.range);
    }



    // return
    return true
})

window.addEventListener('load', (event) => {
    // console.log('page is fully loaded');
    setTimeout(() => {
        checkData()
    }, 5000);
})

const checkData = () => {
    let localData_cryptBuySellExtension = window.localStorage.getItem('localData_cryptBuySellExtension_values');
    if (localData_cryptBuySellExtension) {
        let price = Number(localStorage.getItem('localData_cryptBuySellExtension_price'));
        let range = Number(localStorage.getItem('localData_cryptBuySellExtension_range'));
        // console.log(price)
        // console.log(range)

        var allPrices = document.querySelectorAll('.css-1m1f8hn')
        for (let index = 0; index < allPrices.length; index++) {
            const element = allPrices[index];
            let _0num = element.innerHTML
            let thisPrice = Math.round(Number(_0num.replace(/,/g, '')))
            console.log(thisPrice === price && thisPrice < range)
            if (thisPrice === price && thisPrice < range) {
                // console.log(element)
                var btn = element.parentNode.parentNode.parentNode.parentNode
                // console.log(btn)
                setTimeout(() => {
                    btn.querySelector('.css-xwxrky').click()
                }, 500);
                break;
            }
        };
        // var frst = allPrices[0].parentNode.parentNode.parentNode.parentNode
        //console.log(frst.querySelector('.css-xwxrky'))
        // frst.querySelector('.css-xwxrky').click()
    }
}

// let my = '9,34,657.00'
// console.log(Number(my.replace(/,/g, '')))


