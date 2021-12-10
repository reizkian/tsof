const { firebaseDatabase } = require("../util/admin");
const { getCompoundID} = require("../util/method");

exports.logActivity = function(userID, timeStamp, method){
    // 1. generate logActivity id for each activity
    let activityCompoundID = getCompoundID("activity", userID)
    // 2. get user classID
    return firebaseDatabase.ref("users/" + userID).child("classID").get()
    .then((readedData) =>{
        const classID = readedData.val();
        // 3. define payload data for activity logging
        const payloadData = {
            timeStamp: timeStamp,
            userID: userID,
            classID: classID,
            method: method,
        }
        // 4. WRITE payload to activity
        firebaseDatabase.ref("activity/").child(activityCompoundID).set(payloadData)
        .then(()=>{console.log("success write activity log")})
        .catch((err) => {
            console.log("internal server error, write database")
            console.log(err)
        })
    })
    .catch((err) => {
        console.log("internal server error, read database")
        console.log(err)
    })
}