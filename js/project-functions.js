const add_project = function(){
    const form = document.querySelector(".add_project");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // GETTING ALL FORM VALUES FROM INPUTS
        const ProjectId = uuidv4();
        const Title = e.target.elements.title.value;
        const Description = e.target.elements.description.value;
        const Image = e.target.elements.img.files[0];
        const TimeStamp = Date.parse(new Date());
        // GETTING IMAGE FIREBASE STORAGE REFERENCE
        const path = `project${Image.name}`// project/image.text
        let storageRef = firebase.storage().ref(path);
        // UPLOAD IMAGE FILE TO FIREBASE STORAGE
        storageRef.put(Image).then(()=>{
            // GET THE IMAGE PATH TO THE FIREBASE STORAGE
            storageRef.getDownloadURL().then(function(url){
                let fullPath = url;
                // PROJECT OBJECT
                const project = {
                    Title,
                    Description,
                    Image: fullPath,
                    TimeStamp
                };
                // ADD OBJECT TO DATABASE
                db.collection('Project').doc(ProjectId).set(project).then(function(){
                    alert("Project Added Successfully!!!");
                    e.target.elements.title.value = '';
                    e.target.elements.description.value = '';
                    e.target.elements.img.files[0] = '';
                    location.assign(`../pages/project-details.html#${ProjectId}`);
                }).catch(function(error){
                    alert(`Error: Writind document${error}`);
                })
            }).catch(function(error){
                alert(`image not found${error}`);
            })
        }).catch(error =>{
            alert(`Opps${error}error occured during file upload`);
        })

    })
}