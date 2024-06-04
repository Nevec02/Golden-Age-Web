// lib/mailjet.js
const mailjet = require('node-mailjet').encode(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const sendOrderConfirmationEmail = (toEmail, toName, orderDetails) => {
  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "servicios@goldenagestudio.es",
            "Name": "Golden Age"
          },
          "To": [
            {
              "Email": toEmail,
              "Name": toName
            }
          ],
          "TemplateID": 6023300,
          "TemplateLanguage": true,
          "Subject": `Order Confirmation - ${orderDetails.order_id}`,
          "Variables": {
            "name": toName,
            "firstname": toName.split(' ')[0],
            "total_price": orderDetails.total_price,
            "order_date": new Date().toLocaleDateString(),
            "order_id": orderDetails.order_id
          }
        }
      ]
    });

  return request
    .then(result => {
      console.log(result.body);
    })
    .catch(err => {
      console.log(err.statusCode);
    });
}

module.exports = sendOrderConfirmationEmail;
