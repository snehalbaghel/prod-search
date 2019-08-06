import { Selector, t } from 'testcafe';
const json2xls = require('json2xls');
const fs = require('fs');

interface Product {
    name: string,
    price: string,
  }

export default class Amazon {

    mainSearchField: Selector
    alalougeCheck: Selector

    constructor() {
        this.mainSearchField = Selector('#twotabsearchtextbox')
    }

    getSidebarSel(title: string, sel: string): Selector {
        return Selector('#filters')
            .find('.a-section.a-spacing-small')
            .find('span')
            .withExactText(title)
            .parent()
            .nextSibling()
            .find('span')
            .withExactText(sel)

    }

    async search() {
        await t.typeText(this.mainSearchField, "Wrist Watches")
                .pressKey('enter')
    }

    async checkAnaloug() {
        let sidebarSel: Selector = this.getSidebarSel("Watch Display Type", "Analogue")

        let analougCB: Selector =  sidebarSel
                                        .prevSibling()
                                        .find('input')
        await t.click(analougCB)
    }

    async checkLeather() {
        let sidebarSel: Selector = this.getSidebarSel("Band Material", "Leather")

        let leatherCB: Selector =  sidebarSel                
                                        .prevSibling()
                                        .find('input')
        await t.click(leatherCB)

    }

    async checkBrand() {
        let brandRefine = Selector('#brandsRefinements')
                                .find('ul')
                                .find('a')
                                .find('span')
                                .withExactText('See more')

        await t.click(brandRefine)

        let selectBrand = Selector('#refinementList')
                                .child()
                                .find('span.refinementLink')
                                .withExactText('Titan')

        await t.click(selectBrand)
    }

    async clickDiscount() {
        let discountEl: Selector = this.getSidebarSel("Discount", "25% Off or more")

        await t.click(discountEl)
                                       
    }

    async exportPrices() {
        let productNames = Selector('span.a-size-base-plus.a-color-base.a-text-normal')
        let productList: Array<Product> = [];

        var count = await productNames.count;

        for(let i = 0; i < count; i++) {
            let newP: Product = {
                name: await productNames.nth(i).innerText,
                price: '0',
            }
            productList.push(newP)
        }

        let productPrices = Selector('span.a-price-whole')

        for(let i = 0; i < count; i++) {
            productList[i].price = await productPrices.nth(i).innerText
        }

        let data = JSON.parse(JSON.stringify(productList))

        try {
            const xls = json2xls(data);
            fs.writeFileSync('data.xlsx', xls, 'binary');

        } catch (e) {
            console.log(e)
            console.error('export error');
        }

    }

    async getNth(i: number) {
        let productNames = Selector('span.a-size-base-plus.a-color-base.a-text-normal')
        let productPrices = Selector('span.a-price-whole')

        const nth: Product = {
            name: await productNames.nth(i-1).innerText,
            price: await productPrices.nth(i-1).innerText,
        }

        console.log(JSON.stringify(nth))

    }
 }
