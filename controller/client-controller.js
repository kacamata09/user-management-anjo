const koneksi = require('../config/database')

module.exports = {
    async ambilData() {
    const configClient = 'select * from clientconfig'
    const data = function(){
      return new Promise(function(resolve, reject){
        koneksi.query(
            configClient, 
            function(err, rows){                                                
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
        )}
    )}
    const hasil = await data()
    .then(function(results){
      return results
    })
    .catch(function(err){
      console.log("Promise rejection error: "+err);
    })
    return hasil
    }
}