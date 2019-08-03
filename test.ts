import { Selector } from 'testcafe';
import Amazon from './amazon';

fixture `Getting Started`
    .page `https://www.amazon.in/`

test('Search wrist watches', async t => {
    const amazon = new Amazon()
    await amazon.search()
    await amazon.checkAnaloug()
    await amazon.checkLeather()
    await amazon.checkBrand()
    await amazon.clickDiscount()
    await amazon.exportPrices()
    await amazon.getNth(1)
})