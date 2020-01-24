var util = require('util');
var ee = require('events');

var db_data = [{  //имитация базы данных
    id: 1,
    name: 'Chistyakova J.A.',
    bday: '1998-07-10'
  },
  {
    id: 2,
    name: 'Kasper N.V.',
    bday: '2000-06-04'
  },
  {
    id: 3,
    name: 'Plontnikov D.A',
    bday: '1998-07-05'
  }
];

function DB() {
  this.get = () => {return db_data;};   //реализация GET
  this.post = r => {db_data.push(r);};  //реализация POST
  
  this.delete = r => {
    let indexOfObj = db_data.findIndex(item => item.id == r);
    let data = db_data[indexOfObj];
    db_data.splice(indexOfObj, 1);
    console.log(indexOfObj);
    return data;
  };

  this.put = r => {
    let indexOfObj = db_data.findIndex(item => item.id == r.id);
    return db_data.splice(indexOfObj, 1, r);
  }
}

util.inherits(DB, ee.EventEmitter); //DB наследует EventEmmiter
exports.DB = DB;  //экспортируется объект DB