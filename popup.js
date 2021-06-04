
// const loadMoreCryptoData = () => {
//     console.log('clicked')
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         console.log(tabs)
//         var activeTab = tabs[0]
//         chrome.tabs.sendMessage(activeTab.id, { command: "loadMoreCryptoData" })
//     })
// }
// document.querySelector('#fixed_refresh_botton').addEventListener('click', loadMoreCryptoData);

// Select text boxes
var priceBox = document.querySelector(".crypt-buy-sell-extension-price")
var rangeBox = document.querySelector(".crypt-buy-sell-extension-range")

// form submit to save data
const cryptBuySellExtension_saveData = (e) => {
    e.preventDefault();
    //   Get input Values
    let price = Number(priceBox.value);
    let range = Number(rangeBox.value);
    if (price === 0 || range === 0)
        return true
    let formData = {
        'price': price,
        'range': range
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log('form submit to save data')
        var activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { command: "cryptBuySellExtension_saveData", data: formData })
    })
}
// Listen for form submit
document.querySelector(".crypt-buy-sell-extension-form").addEventListener("submit", cryptBuySellExtension_saveData);

// Validate input number only
$(".crypt-buy-sell-extension-only-number").keypress(function (t) {
    if (8 != t.which && 0 != t.which && (t.which < 48 || t.which > 57)) return !1;
})

// document.getElementById("fname").addEventListener("keyup", myFunction);

// crypt-buy-sell-extension-price