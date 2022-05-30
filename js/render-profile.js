const getprofile = function(){
    db.collection('profile').get().then((snapshot)=>{
        snapshot.forEach(profile => {
            renderProfile(profile);
        });
    })
}
getprofile();

const renderProfile = function(profile){
    const div1_container = document.querySelector('.profile-container');

    const div2_content = document.createElement("div");
    div2_content.setAttribute('class', 'col-md-12');

    const div3_edit = document.createElement("button");
    div3_edit.setAttribute('class', 'btn btn-success pbtn');
    div3_edit.innerHTML = `<img src="../images/edit.svg" alt="" width="30px" height="30px">`;

    const div4_img = document.createElement("div");
    div4_img.setAttribute('class', 'col-md-6');
    div4_img.innerHTML = `
    <h2>Recent Post</h2>
    <h5>Image</h5>
    <img src="${profile.data().image}" height="100px" alt=""> 
    `;

    const div5_text = document.createElement("div");
    div5_text.setAttribute('class', 'col-md-6');
    div5_text.innerHTML = `
    <h5>Title</h5>
        <h5>${profile.data().title}</h5>
        <h5>Description one</h5>
        <p>
        ${profile.data().body1}
        </p>
        <h5>Description two</h5>
        <p>
        ${profile.data().body2}
        </p>
        <h5>${profile.data().email}</h5>
        <h5>${profile.data().telephone}</h5>
        <h5>${profile.data().address}</h5>
    `
    div2_content.appendChild(div3_edit);
    div1_container.appendChild(div2_content);
    div1_container.appendChild(div4_img);
    div1_container.appendChild(div5_text);


    div3_edit.addEventListener('click', function(e){
        location.assign(`../pages/edit-profile.html#${profile.id}`);
    });
}