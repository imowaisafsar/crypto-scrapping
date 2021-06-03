
const currency_symbol = 'USD';
const list_order = 'market_cap_desc';
const pageSize = 10;
let pageIndex = 1;
let dataList;
let req_callBack = true

const getData = () => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency_symbol}&order=${list_order}&per_page=${pageSize}&page=${pageIndex}`;
    let param = {
        method: "GET"
    }
    fetch(url, param)
        .then(data => { return data.json() })
        .then(res => {
            console.log(res)
            dataList = res
            if (pageIndex === 1) {
                document.querySelector("#crypto_fetcher_extension_data_table_body").innerHTML = "";
            }
            printData()
        })
        .catch(err => { console.log(err) })
}

const printData = () => {
    dataList.forEach(e => {
        //console.log(e)
        $('table#crypto_fetcher_extension_data_table tbody').append(`<tr>
        <td>
            <img src="${(e.image != null ? e.image : './icon.png')}" class="c_image"><span class="c_name">${(e.name != null ? e.name : '')}</span>
            <div class="low_high_24">
            <span class="material-icons arrow_drop_down">arrow_drop_down</span>
                <span class="low_24">${(e.low_24h != null ? e.low_24h : '0.00')}</span>
                <span class="material-icons arrow_drop_up">arrow_drop_up</span>
                <span class="high_24">${(e.high_24h != null ? e.high_24h : '0.00')}</span>
            </div>
        </td>
        <td>
            <label class="current_price">${(e.current_price != null ? e.current_price : '0.00')} <span class="symbol">${(e.symbol != null ? e.symbol : '')}</span></label>
            <div class="price_change_24h">
                <span class="material-icons">attach_money</span>
                <span class="price_change">${(e.price_change_24h != null ? e.price_change_24h : '0.00')}</span>
                <span class="change_percentage">${(e.price_change_percentage_24h != null ? e.price_change_percentage_24h : '0.00')}</span>
                <span class="icons">%</span>
            </div>
        </td>
        <td>
            <label class="total_supply"><span class="material-icons">checklist</span> ${(e.total_supply != null ? e.total_supply : '0.00')}</label>
            <div class="supply_bottom_bar">
                <span class="material-icons">swap_horizontal_circle</span>            
                <span class="circulating_supply">${e.circulating_supply}</span>
                <span class="max_supply">${(e.max_supply != null ? e.max_supply : '0.00')}</span>
            </div>
        </td>
        </tr>`)
        if (dataList.length === pageSize) {
            req_callBack = true
        }
    })
}

getData()

const loadMoreCryptoData = () => {
    console.log('Popup Script Running.')
    document.querySelector('.bScroll').scrollTop = 0;
    req_callBack = true
    pageIndex = 1
    getData()
}
document.querySelector('#fixed_refresh_botton').addEventListener('click', loadMoreCryptoData);

// $('.bScroll').scroll(function () {
//     console.log($('#crypto_fetcher_extension_data_table').height() === ($('.bScroll').height() + $('.bScroll').scrollTop()))
//     if ($('#crypto_fetcher_extension_data_table').height() === ($('.bScroll').height() + $('.bScroll').scrollTop())) {
//         // console.log(req_callBack)
//         if (req_callBack) {
//             pageIndex++
//             getData()
//         }
//     }
// })

// // Returns a Promise that resolves after "ms" Milliseconds
// const timer = ms => new Promise(res => setTimeout(res, ms))

// async function load() { // We need to wrap the loop into an async function for this to work
//     for (var i = 0; i < Infinity; i++) {
//         getData()
//         console.log(i);
//         await timer(5000); // then the created Promise can be awaited
//     }
// }
// load();