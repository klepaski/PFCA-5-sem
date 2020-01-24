const sendmail = require('sendmail')({silent: true});

function send(x){
    sendmail({
        /*from: 'natali.kasper.2000@gmail.com',
        to: 'natalliakasper@yandex.ru',*/
        from: 'julia.klepaski@gmail.com',
        to: 'juliaa.klepaski@yandex.by',
        subject: 'test sendmail',
        html: x
    }, function (err, reply){
        console.log(err && err.stack);
        console.dir(reply);
    });
}

module.exports = {send:send}; 
//userjulia (npmjs.com)
//xfhkbbijrjkflyfzaf,hbrf