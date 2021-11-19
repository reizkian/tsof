/*
  CLIENT SESSION MANAGEMENT
    [1] get firebaseUserCredential from browser local storage
    [2] try to verify jwt
*/

function authenticatedSession() {
  // local storage
  const encryptedUserCredential = localStorage.getItem("firebaseUserCredential");
  console.log(encryptedUserCredential)
  let authenticatedUser;

  if (encryptedUserCredential) {
    try {
      authenticatedUser = true;
    } catch (e) {
      authenticatedUser = false;
      console.log("authenticated session expired")
      localStorage.removeItem("firebaseUserCredential")
    }
  }else{
    authenticatedUser = false;
  }
  console.log("authenticatedSession: ", authenticatedUser)
  return authenticatedUser;
}

export { authenticatedSession };