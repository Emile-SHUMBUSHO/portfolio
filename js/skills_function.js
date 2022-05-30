const add_skills = function(){
    const form = document.querySelector(".add-skills");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // GETTING ALL FORM VALUES FROM INPUTS
        const skillsID = uuidv4();
        const title = e.target.elements.title.value;
        const description = e.target.elements.description.value;
        const image = e.target.elements.image.files[0];
        const TimeStamp = Date.parse(new Date());
        // GETTING IMAGE FIREBASE STORAGE REFERENCE
        const path = `skills${image.name}`// skills/image.text
        let storageRef = firebase.storage().ref(path);
        // UPLOAD IMAGE FILE TO FIREBASE STORAGE
        storageRef.put(Image).then(()=>{
            // GET THE IMAGE PATH TO THE FIREBASE STORAGE
            storageRef.getDownloadURL().then(function(url){
                let fullPath = url;
                // PROJECT OBJECT
                const data = {
                    title,
                    description,
                    image: fullPath,
                    TimeStamp
                };
                // ADD OBJECT TO DATABASE
                db.collection('skills').doc(skillsID).set(data).then(function(){
                    alert("skills Added Successfully!!!");
                    e.target.elements.title.value = '';
                    e.target.elements.description.value = '';
                    e.target.elements.image.files[0] = '';
                    location.assign(`./project.html#${skillsID}`);
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