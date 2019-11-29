import firebase from './'

const createUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error creating user:')
      console.log('\t' + errorCode)
      console.log('\t' + errorMessage)
      throw {code: errorCode, msg: errorMessage}
    });
}

const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error creating user:')
      console.log('\t' + errorCode)
      console.log('\t' + errorMessage)
      throw {code: errorCode, msg: errorMessage}
    });
}

const logout = () => {
  return firebase
    .auth()
    .signOut()
    .then(function() {
    })
    .catch(function(error) {
      console.error(error)
    });
}

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  logout
}
