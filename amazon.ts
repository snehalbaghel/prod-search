import { Selector, t } from 'testcafe';


export default class Amazon {

    mainSearchField: Selector
    alalougeCheck: Selector
    // filters: Selector

    constructor() {
        this.mainSearchField = Selector('#twotabsearchtextbox')
        // this.filters = Selector('#filters')
                            // .find('#p_n_feature_seven_browse-bin-title')
                            // .find('span')

    }

    async search() {
        await t
            .typeText(this.mainSearchField, "Wrist Watches")
            .pressKey('enter')
    }

    async checkAnaloug() {
        let filters = Selector('#filters')
        .find('.a-section.a-spacing-small')
        .find('span')
        let analougCB: Selector = filters.withExactText("Watch Display Type")
                                        .parent()
                                        .nextSibling()
                                        .find('span')
                                        .withExactText("Analogue")
                                        .prevSibling()
                                        .find('input')
        await t
            .click(analougCB)
    }

    async checkLeather() {
        let filters = Selector('#filters')
                            .find('.a-section.a-spacing-small')
                            .find('span')
        let leatherCB: Selector = filters.withExactText("Band Material")
                                        .parent()
                                        .nextSibling()
                                        .find('span')
                                        .withExactText("Leather")
                                        .prevSibling()
                                        .find('input')
        await t
            .click(leatherCB)

    }

    async checkBrand() {
        let brandRefine = Selector('#brandsRefinements')
                                .find('ul')
                                .find('a')
                                .find('span')
                                .withExactText('See more')

        await t
            .click(brandRefine)

        let selectBrand = Selector('#refinementList')
                                .child()
                                .find('span.refinementLink')
                                .withExactText('Titan')

        await t
            .click(selectBrand)
    }

    async clickDiscount(){
        let filters = Selector('#filters')
                            .find('.a-section.a-spacing-small')
                            .find('span')
        let discountEl: Selector = filters.withExactText("Discount")
                                        .parent()
                                        .nextSibling()
                                        .find('span')
                                        .withExactText("25% Off or more")

        await t
            .click(discountEl)
                                       
    }

 }