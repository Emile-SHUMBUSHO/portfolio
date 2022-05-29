const id = location.hash.slice(1);
const renderProject = function(project){
    const t = document.querySelector('.t');
    const pr = document.querySelector('.p');
    const img = document.querySelector('.img');
    const timestamp = document.querySelector('.hours');
    img.setAttribute('src', `${project.Image}`);
    t.textContent = project.Title;
    pr.textContent = project.Description;
    timestamp.textContent = moment(project.TimeStamp).fromNow();
    
}

const getProject = function(id){
    var docRef = db.collection("Project").doc(id);

    docRef.get().then(function(doc){
        if(doc.exists){
            renderProject(doc.data());
        }else{
            //doc.data() will be undefined in this case
            console.log("NO such document!!");
        }
    }).catch((error)=>{
        console.log(`Opps error: ${error}`)
    })
}

getProject(id);