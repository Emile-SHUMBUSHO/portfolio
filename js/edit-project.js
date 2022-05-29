const id = location.hash.slice(1);
let imgPath = '';
const renderUpdate = function(project){
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');
    title.value = project.Title;
    description.textContent = project.Description;
    imgPath = project.Image;
};

const getProject = function(id){
    var docRef = db.collection('Project').doc(id);
    docRef.get().then(function(doc){
        if(doc.exists){
            renderUpdate(doc.data());
        }else{
            alert("No such document in collection");
        }
    })
}
getProject(id);

document.querySelector('.update-form').addEventListener('submit', function(e){
    e.preventDefault();
    const Title = e.target.elements.title.value;
    const Description = e.target.elements.description.value;
    const Image = e.target.elements.img.files;

    if(Image.length === 0){
        const data = {
            Title : Title,
            Description : Description,
        };
        db.collection("Project").doc(id).update(data).then(() =>{
            alert("Project updated successfully but Image not changed");
            location.assign(`../pages/project-detail.html#${id}`);
        }).catch((error) =>{
            alert(`Update error: ${error}`);
        });
    }//END OF IF STATEMENT
    if(Image.length === 1){
        //DELETE THE FILE
        let httpsReference = firebase.storage().refFromURL(imgPath);
        httpsReference.delete().then(function(){
            var storageRef = firebase.storage().ref().child(`Project/${Image[0].name}`);
                    //UPLOAD NEW IMAGE
                    storageRef.put(Image[0]).then(function(){
                        //GETTING IT URL AFTER UPLOAD IT.
                        storageRef.getDownloadURL().then(url =>{
                            const newPath = url;
                            //UPDATING PROJECT IN FIRESTORE
                            const data = {
                                Title : Title,
                                Description : Description,
                                Image : newPath
                            };
                            db.collection("Project").doc(id).update(data).then(() =>{
                                alert(`Project updated successfully with new image`);
                                location.assign(`./project.html#${id}`);
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
                    var storageRef = firebase.storage().ref().child(`Project/${Image[0].name}`);
                    //UPLOAD NEW IMAGE
                    storageRef.put(Image[0]).then(function(){
                        //GETTING IT URL AFTER UPLOAD IT.
                        storageRef.getDownloadURL().then(url =>{
                            const newPath = url;
                            //UPDATE PROJECT IN FIRESTORE
                            const data = {
                                Title : Title,
                                Description : Description,
                                Image : newPath
                            };
                            db.collection("Project").doc(id).update(data).then(()=>{
                                alert("Project updated successfully and with new image");
                                location.assign(`./project.html#${id}`);
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