const getprofile = function(){
    db.collection('profile').get().then((snapshot)=>{
        snapshot.forEach(profile => {
            renderProfile(profile);
        });
    })
}
getprofile();

const renderProfile = function(profile){
    const title = document.querySelector('.title');
    title.textContent = profile.data().title;
    const body1 = document.querySelector('.body1');
    body1.textContent = profile.data().body1;
    const div_profile = document.querySelector('.profile-pic');
    div_profile.innerHTML = `<img id="profile-pic" src="${profile.data().image}" alt="Profile Picture">`
    const div_contact = document.querySelector('.contact-span');
    div_contact.innerHTML = `
        <h4 class="mb-4">Contact Me</h4>
        <span>
        <h6>Tel: ${profile.data().telephone}</h6>
        </span>
        <span>
            <h6>Email: ${profile.data().email}</h6>
        </span>
        <span>
            <h6>Address: ${profile.data().address}</h6>
        </span>
    `
    const div_about2 = document.querySelector('.about-me');
    div_about2.innerHTML = `
        <h4>More about me</h4>
        <p id="about-me">
            ${profile.data().body2}
        </p>
        <hr>
    `
}