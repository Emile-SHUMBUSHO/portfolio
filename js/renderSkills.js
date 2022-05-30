const renderProject = function(){
    db.collection('Project').get().then((snapshot) =>{
        snapshot.docs.forEach((project) => {
            renderContent(project)
        });
    }).catch(function(error){
        alert(`Something went wrong error:${error}`)
    })
}
renderProject();

const renderContent = function(project){
    const projectCard = document.querySelector(".project");
            const col = document.createElement("div");
            col.setAttribute('class', 'col-md-4');
            const contentCard = document.createElement("div");
            contentCard.setAttribute('class', 'card');
            const img = document.createElement("img");
            img.setAttribute('class', 'card-img-top');
            img.setAttribute('src', `${project.data().Image}`);
            const cardBody = document.createElement("div");
            cardBody.setAttribute('class', 'card-body');
            const h5 = document.createElement("h5");
            h5.setAttribute('class', 'card-title');
            h5.textContent = project.data().Title;
            const readMore = document.createElement("a");
            readMore.textContent = 'Read More'
            readMore.setAttribute('href', `../pages/project-detail.html#${project.id}`);
            readMore.setAttribute('class', 'readbtn');
            const p = document.createElement("p");
            p.setAttribute('class', 'card-text');
            p.textContent = project.data().Description.slice(0, 100)+ "...";
            p.appendChild(readMore);
            const controls = document.createElement("div");
            controls.setAttribute('class', 'row');
            const timestamp = document.createElement('h5');
            timestamp.textContent = moment(project.data().TimeStamp).fromNow();
            const btn1 = document.createElement("div");
            btn1.setAttribute('class', 'col-md-6');

            const a1 = document.createElement("button");
            a1.setAttribute('class', 'btn btn-danger');
            a1.setAttribute('value', project.id);
            a1.innerHTML = `Delete`;

            const btn2 = document.createElement("div");
            btn2.setAttribute('class', 'col-md-6');

            const a2 = document.createElement("button");
            a2.setAttribute('class', 'btn btn-success');
            a2.setAttribute('value', project.id);
            a2.innerHTML = `Update`;

            btn1.appendChild(a1);
            btn2.appendChild(a2);
            controls.appendChild(timestamp);
            controls.appendChild(btn1);
            controls.appendChild(btn2);
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(controls);
            col.appendChild(img);
            col.appendChild(cardBody);
            projectCard.appendChild(col);

            a2.addEventListener('click', function(e){
                location.assign(`./pages/edit-project.html#${project.id}`);
            });

            a1.addEventListener('click', function(e){
                if(confirm(`you are sure? you are about to delete a project called \n ${project.data().Title}`)){
                    var docRef = db.collection('Project').doc(project.id);
                    docRef.delete().then(function(){
                        alert(`Project Successfully Removed`);
                    }).catch(error =>{
                        alert(`Opps Error: ${error}`);
                    })
                }
            })      
};