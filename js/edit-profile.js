const id = location.hash.slice(1);
let imgPath = '';
const renderUpdate = function(profile){
    const title = document.querySelector('.title');
    const email = document.querySelector('.email');
    const telephone = document.querySelector('.telephone');
    const address = document.querySelector('.address');
    const description1 = document.querySelector('.description-1');
    const description2 = document.querySelector('.description-2');
    title.value = profile.title;
    email.value = profile.email;
    telephone.value = profile.telephone;
    address.value = profile.address;
    description1.textContent = profile.body1;
    description2.textContent = profile.body2;
    imgPath = profile.image;
};

const getProfile = function(){
    var docRef = db.collection('profile').doc(id);
    docRef.get().then(function(doc){
        if(doc.exists){
            renderUpdate(doc.data());
        }else{
            alert("No such document in collection");
        }
    })
}
getProfile();

document.querySelector('.update-form').addEventListener('submit', function(e){
    e.preventDefault();
    const title = e.target.elements.title.value;
    const email = e.target.elements.email.value;
    const telephone = e.target.elements.telephone.value;
    const address = e.target.elements.address.value;
    const description1 = e.target.elements.description1.value;
    const description2 = e.target.elements.description2.value;
    const image = e.target.elements.image.files;

    if(image.length === 0){
        const data = {
            title : title,
            email : email,
            telephone : telephone,
            address : address,
            description1 : description1,
            description2 : description2
        };
        db.collection("profile").doc(id).update(data).then(() =>{
            alert("profile updated successfully but Image not changed");
            location.assign(`./profile.html`);
        }).catch((error) =>{
            alert(`Update error: ${error}`);
        });
    }//END OF IF STATEMENT
    if(image.length === 1){
        //DELETE THE FILE
        let httpsReference = firebase.storage().refFromURL(imgPath);
        httpsReference.delete().then(function(){
            var storageRef = firebase.storage().ref().child(`profile/${image[0].name}`);
                    //UPLOAD NEW IMAGE
                    storageRef.put(image[0]).then(function(){
                        //GETTING IT URL AFTER UPLOAD IT.
                        storageRef.getDownloadURL().then(url =>{
                            const newPath = url;
                            //UPDATING PROJECT IN FIRESTORE
                            const data = {
                                title : title,
                                email : email,
                                telephone : telephone,
                                address : address,
                                description1 : description1,
                                description2 : description2,
                                image : newPath
                            };
                            db.collection("profile").doc(id).update(data).then(() =>{
                                alert(`profile updated successfully with new image`);
                                location.assign(`./profile.html`);
                            }).catch((error)=>{
                                alert(`Update error: ${error}`)
                            });

                        }).catch((error)=>{
                            alert(`Failed to get URL`);
                        });
                    }).catch((error)=>{
                        alert(`Failed to download image URL to be stored in firestore`);
                    });
        }).catch( function(error){
            switch(error.code){
                case 'storage/object-not-found':
                    var storageRef = firebase.storage().ref().child(`profile/${image[0].name}`);
                    //UPLOAD NEW IMAGE
                    storageRef.put(image[0]).then(function(){
                        //GETTING IT URL AFTER UPLOAD IT.
                        storageRef.getDownloadURL().then(url =>{
                            const newPath = url;
                            //UPDATE PROJECT IN FIRESTORE
                            const data = {
                                title : title,
                                email : email,
                                telephone : telephone,
                                address : address,
                                description1 : description1,
                                description2 : description2,
                                image : newPath
                            };
                            db.collection("profile").doc(id).update(data).then(()=>{
                                alert("profile updated successfully and with new image");
                                location.assign(`./profile.html`);
                            }).catch((error)=>{
                                alert(`Update Error: ${error}`);
                            });

                        }).catch((error)=>{
                            alert("Failed to get URL");
                        });
                    }).catch((error)=>{
                        alert(`Failed to download image URL to be store in firestore`);
                    });
                break;
            }
        });
    }//END IF THE IF STATEMENT
});