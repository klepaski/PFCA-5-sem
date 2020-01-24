/*module.exports = {
  user          : "SYSTEM",
  password      : "Pa55word",
  connectString : "localhost/orcl",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};*/


module.exports= {
  "db": {
    "driver": "msnodesqlv8",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={USER-ПК};Database={univer};Trusted_Connection={yes};"
  },
  "http": {
    "port": 3000,
    "host": "localhost"
  }
}