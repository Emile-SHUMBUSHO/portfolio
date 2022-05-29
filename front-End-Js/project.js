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



{/* <div class="col-md-4">
    <div class="project img ftco-animate d-flex justify-content-center align-items-center" style="background-image: url(images/project-4.jpg);">
        <div class="overlay"></div>
        <div class="text text-center p-4">
            <h3><a href="./viewProject.html">Branding &amp; Illustration Design</a></h3>
            <span>Web Design</span>
        </div>
    </div>
</div>  */}

const renderContent = function(project){
    const projectCard = document.querySelector(".project-section");
    const div1 = document.createElement("div");
    div1.setAttribute('class', 'col-md-4');

    const div2_image = document.createElement("div");
    div2_image.setAttribute('class', 'project img ftco-animate d-flex justify-content-center align-items-center');
    div2_image.style = `background-image: url(${project.data().Image})`;

    const div3_overlay = document.createElement("div");
    div3_overlay.setAttribute('class', 'overlay');

    const div4_text = document.createElement("div");
    div4_text.setAttribute('class','text text-center p-4');

    const pr = document.createElement("h3");
    const a = document.createElement("a");
    a.setAttribute('href', `./pages/viewProject.html#${project.id}`);
    a.textContent = project.data().Description.slice(0, 20)+ "...";

    const span = document.createElement("span");
    span.textContent = project.data().Title;

    pr.appendChild(a);
    div4_text.appendChild(pr);
    div4_text.appendChild(span);
    div2_image.appendChild(div3_overlay);
    div2_image.appendChild(div4_text);
    div1.appendChild(div2_image);
    projectCard.appendChild(div1);
};