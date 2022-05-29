const id = location.hash.slice(1);
const renderProject = function(project){
    const img = document.querySelector('.project');
    img.style = `background-image: url(${project.Image})`
    
    const title = document.querySelector('.title');
    title.textContent = project.Title;

    const description = document.querySelector('.description');
    description.textContent = project.Description;
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