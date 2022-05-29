document.querySelector('.one-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password).then(function (params) {
        location.assign(`dashboard.html`)
    }).catch(function(error) {
       console.log(`Oops something went wrong ${error}`);
    });
})