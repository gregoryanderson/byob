let stats = require('nightmare')
let nightmare = stats({show: true})

nightmare
.goto('https://www.mlb.com')
.wait('a[href="http://mlb.com/r/stats"]')
.click('a[href="http://mlb.com/r/stats"]')
.wait('td[class="dg-name_display_last_init"]')
.evaluate(() => {
    let nodes = document.querySelectorAll('td[class="dg-name_display_last_init"]')
    let list = [].slice.call(nodes)
    return list.map(node => {
        return node.innerText
    })
})
.end()
.then(function(result) {
    console.log(result)
})