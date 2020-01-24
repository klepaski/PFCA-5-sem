const oracledb = require('mssql');//('oracledb');
const sql = require('mssql/msnodesqlv8');
const dbConfig = require('./dbconfig.js');
async function ExecuteSQL(sql) {
    let connection;
    try {
      console.log(sql);
      connection = await oracledb.getConnection();
      const result = await connection.execute(sql);
      await connection.execute('Commit');
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
          process.exit(0);
        }
      }
    }
  }
function DB()
{
    this.getFaculties = async (args, context)=>
    {
      console.log(args);
      let k=[];
      let f=[];
      if(args.faculty==null)
      {
        f= await ExecuteSQL('SELECT FACULTY,FACULTY_NAME FROM FACULTY');
      }
      else f=await ExecuteSQL("SELECT FACULTY,FACULTY_NAME FROM FACULTY Where faculty='"+args.faculty+"'");
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={faculty:f[i][0],faculty_name:f[i][1]};
      }
      return k;
    }

    this.getSubjects = async (args, context)=>
    {
      console.log(args);
      let f=[];
      let k=[];
      if(args.subject==null)
      {
       f=await ExecuteSQL('SELECT Subject,Subject_NAME,Pulpit FROM Subject');
      }
      else f=await ExecuteSQL("SELECT Subject,Subject_NAME,Pulpit FROM Subject Where Subject='"+args.subject+"'");
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={subject:f[i][0],subject_name:f[i][1],pulpit:f[i][2]};
      }
      return k;
    }

    this.getTeachers = async (args, context)=>
    {
      console.log(args);
      let f=[];
      let k=[];
      if(args.teacher==null)
      {
        f = await ExecuteSQL('SELECT Teacher,Teacher_NAME,Pulpit FROM Teacher');
      }
      else
        f = await ExecuteSQL("SELECT Teacher,Teacher_NAME,Pulpit FROM Teacher Where Teacher='"+args.teacher+"'");
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={teacher:f[i][0],teacher_name:f[i][1],pulpit:f[i][2]};
      }
      return k;
    }

    this.getPuplits = async (args, context)=>
    {
      let f=[];
      let k=[];
      if(args.pulpit==null)
      {
        f = await ExecuteSQL('SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT');
      }
      else
      { 
        f = await ExecuteSQL("SELECT PULPIT,PULPIT_NAME,FACULTY FROM PULPIT Where Pulpit='"+args.pulpit+"'");
      }
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={pulpit:f[i][0],pulpit_name:f[i][1],faculty:f[i][2]};
      }
      return k;
    }
//-------------------------------------------------------
    this.setFaculty = async(faculty)=>
    {
      let k = await ExecuteSQL("SELECT FACULTY,FACULTY_NAME FROM FACULTY WHERE FACULTY='"+faculty.faculty+"'");
      if(k.length>0)
      {
        await ExecuteSQL(`Update FACULTY Where Faculty='${faculty.faculty}' Set Faculty_name='${faculty.faculty_name}')`);
      }
      else
      {
        console.log(faculty.faculty);
        console.log(faculty.faculty_name);
        await ExecuteSQL(`INSERT INTO FACULTY(FACULTY,FACULTY_NAME) values('${faculty.faculty}','${faculty.faculty_name}')`);
      }
      return faculty;
    }

    this.setPulpit = async(pulpit)=>
    {
      let k = await ExecuteSQL("Select PULPIT,PULPIT_NAME,FACULTY FROM PULPIT WHERE Pulpit='"+pulpit.pulpit+"'");
      if(k.length>0)
      {
        ExecuteSQL(`Update PULPIT Where Pulpit='${pulpit.pulpit}' Set Pulpit_name='${pulpit.pulpit}',faculty='${pulpit.faculty}')`);
      }
      else
      {
        ExecuteSQL(`INSERT INTO PULPIT(PULPIT,PULPIT_NAME,FACULTY) values('${pulpit.pulpit}','${pulpit.pulpit_name}','${pulpit.faculty}')`);
      }
      return pulpit;
    }

    this.setSubject = async(subject)=>
    {
      let k =await ExecuteSQL("Select Subject,Subject_NAME,pulpit FROM Subject WHERE Subject='"+subject.subject+"'");
      if(k.length>0)
      {
        await ExecuteSQL(`Update Subject Where Subject='${subject.subject}' Set Subject_name='${subject.subject_name}',pulpit='${subject.pulpit}')`);
      }
      else
      {
        await ExecuteSQL(`INSERT INTO Subject(Subject,Subject_NAME,pulpit) values('${subject.subject}','${subject.subject_name}','${subject.pulpit}')`);
      }
      return subject;
    }

    this.setTeacher = async(teacher)=>
    {
      let k = await ExecuteSQL("Select Teacher,Teacher_NAME,pulpit FROM Teacher WHERE Teacher='"+teacher.teacher+"'");
      if(k.length>0)
      {
        await ExecuteSQL(`Update Teacher Where Teacher='${teacher.teacher}' Set Teacher_name='${teacher.teacher_name}',pulpit='${teacher.pulpit}')`);
      }
      else
      {
        await ExecuteSQL(`INSERT INTO Teacher(Teacher,Teacher_NAME,pulpit) values('${teacher.teacher}','${teacher.teacher_name}','${teacher.pulpit}')`);
      }
      return teacher;
    }
//******************************************************
    this.delFaculty = async(faculty)=>
    {
      let k = await ExecuteSQL("Delete FACULTY WHERE FACULTY='"+faculty.faculty+"'");
      k=k.rowsAffected;
      if(k>0)
      {
        return true;
      }
      else return false;
    }

    this.delPulpit = async(pulpit)=>
    {
      let k =await ExecuteSQL("Delete Pulpit WHERE Pulpit='"+pulpit.pulpit+"'");
      k=k.rowsAffected;
      if(k>0)
      {
        return true;
      }
      else return false;
    }

    this.delSubject = async(subject)=>
    {
      let k = await ExecuteSQL("Delete Subject WHERE Subject='"+subject.subject+"'");
      k=k.rowsAffected;
      if(k>0)
      {
        return true;
      }
      else return false;
    }

    this.delTeacher = async(teacher)=>
    {
      let k = await ExecuteSQL("Delete Teacher WHERE Teacher='"+teacher.teacher+"'");
      k=k.rowsAffected;
      if(k>0)
      {
        return true;
      }
      else return false;
    }
//******************************************************
    this.getTeachersByFaculty = async(faculty)=>
    {
      let f = await ExecuteSQL("Select Teacher.Teacher,Teacher.Teacher_Name,Teacher.Pulpit from Teacher Inner Join"+ 
      " Pulpit On Teacher.Pulpit=Pulpit.Pulpit Inner Join Faculty On "+ 
      "Pulpit.Faculty=faculty.faculty Where faculty.Faculty='"+faculty+"'");
      let k=[];
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={teacher:f[i][0],teacher_name:f[i][1],pulpit:f[i][2]};
      }
      return k;
    }

    this.getSubjectsByFaculties =async(faculty)=>
    {
      let f = await ExecuteSQL("Select Subject.Subject,Subject.Subject_Name,Subject.Pulpit from Subject "+
      "Inner Join Pulpit On Subject.Pulpit=Pulpit.Pulpit Inner Join Faculty On "+ 
      "Pulpit.Faculty=faculty.faculty Where faculty.Faculty='"+faculty+"'");
      let k=[];
      f=f.rows;
      for(let i=0;i<f.length;i++)
      {
        k[i]={subject:f[i][0],subject_name:f[i][1],pulpit:f[i][2]};
      }
      return k;
    }
}

const resolver=
{
  faculties: async (args,context)=>{
     let f= await context.getFaculties(args,context);
     return f;
   },
   pulpits: async (args,context)=>{
     let f= await context.getPuplits(args,context);
     return f;
   },
   subjects:async (args,context)=>{
     let f= await context.getSubjects(args,context);
     return f;
   },
   teachers:async (args,context)=>{
    let f= await context.getTeachers(args,context);
    return f;
  },
  add_faculty: async (args,context)=>{
     let f= await context.setFaculty(args.faculty);
     return f;
   },
   add_subject: async (args,context)=>{
      let f= await context.setSubject(args.subject);
      return f;
  },
  add_teacher: async (args,context)=>{
    let f= await context.setTeacher(args.teacher);
    return f;
 },
 add_pulpit: async (args,context)=>{
    let f= await context.setPulpit(args.pulpit);
    return f;
},
del_faculty: async (args,context)=>{
  let f= await context.delFaculty(args.faculty);
  return f;
},
del_subject: async (args,context)=>{
   let f= await context.delSubject(args.subject);
   return f;
},
del_teacher: async (args,context)=>{
 let f= await context.delTeacher(args.teacher);
 return f;
},
del_pulpit: async (args,context)=>{
 let f= await context.delPulpit(args.pulpit);
 return f;
},
teachers_by_faculty: async (args,context)=>{
  let f= await context.getTeachersByFaculty(args.faculty);
  return f;
},
subjects_by_faculty: async (args,context)=>{
  let f= await context.getSubjectsByFaculties(args.faculty);
  return f;
} 
}
exports.DB = new DB();
exports.resolver=resolver;