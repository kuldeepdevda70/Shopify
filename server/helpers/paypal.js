
const paypal =require('paypal-rest-sdk')

paypal.configure({
    mode:'sandbox',
    client_id:'AXC6T7SlEN0HpE-9SymH5pVv8ZjyG21qT8610GXfzmiwgSQHPueBsDjZYbI8XgQbrOiTnj2oXp6xzDUd',
    client_secret:'EGH5ZnLJdGPDXRDYU3IToiFCRreQIzW4KOVbwGlgNXIAx--Xoi_OqYDjz5UJlXTiiywcW1SRO72oaxxS'
})

module.exports=paypal;