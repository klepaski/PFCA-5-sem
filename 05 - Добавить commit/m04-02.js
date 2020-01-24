var util = require('util');
var ee = require('events');
var db_data = [
            {id:'1', name: 'Иванов И.И.',bday:'2001-01-01'}
];
function DB(){
    this.get =()=>{return db_data;};
    this.post = (r)=>{db_data.push(r);};
    this.delete = (s)=>{
        let Index=db_data.findIndex(item=>item.id==s);
        let data=db_data[Index];
        db_data.splice(Index,1);
        return data;};
    this.put = (r,s)=>{
        console.log(r);
        let Index=db_data.findIndex(item=>item.id==r.id); 
        db_data.splice(Index,1,r);};  
    this.commit=()=>{}; //ничего не вып   
}

util.inherits(DB,ee.EventEmitter);

exports.DB=DB;
