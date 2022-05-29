document.querySelector('#logout').addEventListener('click', function () {
    firebase.auth().signOut().then(function() {
        location.assign(`login.html`)
      }).catch(function(error) {
        alert(error.message)
    });
})