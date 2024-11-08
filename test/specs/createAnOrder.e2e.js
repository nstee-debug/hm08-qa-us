const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('Should set the address', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect(await $(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect(await $(page.toField)).toHaveValue('1300 1st St');
        
    });

    it('Selecting the supportive plan', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton.parentElement()).toHaveElementClass('active');
    })

    it('Should fill in the phone number', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Adding the credit card info', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCvvNumber();
        const cardNumberField = await $(page.cardNumberField); 
        await cardNumberField.setValue(cardNumber);
        const cvvField = await $(page.cvvField);
        await cvvField.setValue(cvvNumber);
        await browser.keys('Tab');
        const linkButton = await $(page.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
        await expect (await $(page.cardAdded)).toBeExisting();
    })
    
    it('Leave a message for the driver', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const driverMessage = await $(page.driverMessage);
        await driverMessage.setValue('Please arrive on time');
        await expect (driverMessage).toHaveValue('Please arrive on time')
    
    })

    it('Should order a blanket and handkerchief', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const blanketSwitch = await $(page.blanketSwitch);
        await blanketSwitch.waitForDisplayed();
        await blanketSwitch.click();
        const blanketSwitchInput = await $(page.blanketSwitchInput);
        await expect(blanketSwitchInput).toBeChecked(); 
   
  })

  it('Should order 2 ice creams', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const supportivePlanButton = await $(page.supportivePlanButton);
    await supportivePlanButton.click();
    const iceCreamPlusButton = await $(page.iceCreamPlusButton);
    await iceCreamPlusButton.waitForDisplayed();
    await iceCreamPlusButton.click();
    await iceCreamPlusButton.click();
    const iceCreamValue = await $(page.iceCreamValue);
    await expect (iceCreamValue).toBeExisting();

})

it('Should display the car search modal', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const businessPlanButton = await $(page.businessPlanButton);
    await businessPlanButton.waitForDisplayed();
    await businessPlanButton.click();
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    const carSearchButton = await $(page.carSearchButton);
    await carSearchButton.waitForDisplayed();
    await carSearchButton.click();
    const carSearchModal = await $(page.carSearchModal);    
    await expect(carSearchModal).toBeExisting();
})

it('Should wait for the driver info to appear in the modal', async () => {
    await browser.url('/');
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const businessPlanButton = await $(page.businessPlanButton);
    await businessPlanButton.waitForDisplayed();
    await businessPlanButton.click();
    const carSearchButton = await $(page.carSearchButton);
    await carSearchButton.waitForDisplayed();
    await carSearchButton.click();
    await browser.pause(40000);
    const driverInfoModal = await $("div*=The driver will arrive");
    await expect(driverInfoModal).toBeExisting();

})
  
    




});