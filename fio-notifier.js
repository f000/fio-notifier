//! fio-notifier.js
//! version : 0.0.1
//! authors : Lukas Vorlicek
//! license : MIT

var config = require('./config.json');
var path = require('path');
var https = require('https');
var notifier = require('node-notifier');
var moment = require('moment');
var numeral = require('numeral');

numeral.language('cs', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    }
});
numeral.language('cs');

config.accounts.forEach(function (account) {
    accountNotify(account);
});

function accountNotify (config) {
    var httpGetOptions = {
        protocol: 'https:',
        hostname: 'www.fio.cz',
        path: '/ib_api/rest/last/' + config.token + '/transactions.json',
        method: 'GET'
    };
    https.get(httpGetOptions, function (res) {
        var response = '';

        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
            if (response.length) {
                var data = JSON.parse(response);
                // console.log('Data:', data);
                displayNotifications(data, config);
            }
        });
    }).on('error', function (e) {
        console.error('Got an https error:', e);
    });
}

function displayNotifications (data, config) {
    var info = data.accountStatement.info;
    var transactions = data.accountStatement.transactionList.transaction;

    transactions.forEach(function (transaction) {
        var amount = transaction.column1.value;
        var title = config.name + ': ' + numeral(amount).format('0,0.00') + ' ' + transaction.column14.value;
        var subtitle = transaction.column8.value;
        var message = transaction.column25 ? transaction.column25.value : subtitle;
        var iconColor = amount < 0 ? 'red' : 'blue';

        console.log(moment().format(), info.accountId + ' ' + transaction.column22.value);

        notifier.notify({
            title: title,
            subtitle: subtitle,
            message: message,
            sound: true,
            icon: path.join(__dirname, '/img/logo_fio-' + iconColor + '.png'),
            wait: false,
            open: 'https://www.fio.cz/ib2/login'
        }, function (error, response) {
            if (error) {
                console.error('Got an notification center error:', error + ' ' + response);
            }
        });
    });
}
