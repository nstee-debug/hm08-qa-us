module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
    getCardNumber: function(){
        const number = Math.floor(Math.random() * 1000000000000)
        return number
    },
    getCvvNumber: function(){
        const number = Math.floor(Math.random() * 100)
        return number
    }
};
