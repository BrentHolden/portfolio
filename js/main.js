const mainContainer = document.querySelector('#mainContainer');

const headButtons = document.querySelector('#headButtons');

const homeButton = document.querySelector('#homeButton');
homeButton.addEventListener('click', changeToHome);

const mainFoot = document.querySelector('#mainFoot');

const projects = [
    {
        id: "projectOne",
        title: "Board Meeting ",
        source: "https://board-meeting-client.herokuapp.com/home"
    },
    {
        id: "projectTwo",
        title: "Ghibli Fans ",
        source: "https://brent-api.firebaseapp.com/"
    },
    {
        id: "projectThree",
        title: "Project Blue ",
        source: "https://blue-client-bah.herokuapp.com/"
    },
]

const buttons = [
    {
        id: "projectsButton",
        title: "Projects ",
        click: changeToPortfolio
    },
    {
        id: "resumeButton",
        title: "Resume ",
        click: changeToResume
    },
    {
        id: "contactButton",
        title: "Contact ",
        click: changeToContact
    },
    {
        id: "githubButton",
        title: "Github ",
        source: "https://github.com/BrentHolden"
    },
    {
        id: "linkedInButton",
        title: "LinkedIn ",
        source: "https://www.linkedin.com/in/brent-holden-267a1646/"
    }
    // {
    //     id: "testButton",
    //     title: "Test ",
    //     click: projectFromGithub
    // }
]

function changeToHome(e) {

    while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    let textOne = document.createElement('p');
    let textTwo = document.createElement('p');
    let textThree = document.createElement('p');

    textOne.textContent = 'Full stack JavaScript developer. Graduate of Eleven Fifty Academy coding bootcamp, 2019.';

    textTwo.textContent = 'some content here'

    textThree.textContent = 'and some more here';

    mainBody.appendChild(textOne);
    mainBody.appendChild(textTwo);
    mainBody.appendChild(textThree);

    changeToHomeButtons();
}

changeToHome();

function changeToHomeButtons() {

    while(headButtons.firstChild) {
        headButtons.removeChild(headButtons.firstChild);
    }

    const homeSelect = document.createElement('div');
    headButtons.appendChild(homeSelect);

    for (i of buttons){   
        const createButton = document.createElement('a');
        createButton.textContent = i.title;

        if (i.click) {
            createButton.addEventListener('click', i.click);
        } else {
            createButton.setAttribute('href', i.source);
            createButton.setAttribute('target', '_blank');
        }

        homeSelect.appendChild(createButton);
    }

}

function changeToPortfolio(e) {

    while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    while(headButtons.firstChild) {
        headButtons.removeChild(headButtons.firstChild);
    }

    let projectSelect = document.createElement('div');
    headButtons.appendChild(projectSelect);

    projectSelect.setAttribute('grid-column', '1 / 4');
    projectSelect.setAttribute('grid-row', '1');

    let projectFrame = document.createElement('iframe');

    projectFrame.setAttribute('src', projects[0].source);
    projectFrame.setAttribute('width', '100%');
    projectFrame.setAttribute('height', '100%');

    mainBody.appendChild(projectFrame);

    function buildSelect() {
        for (i of projects) {
            let projectOption = document.createElement('a');
            projectOption.textContent = i.title;
            projectOption.setAttribute('id', i.id)
            projectOption.setAttribute('data-source', i.source)
            projectOption.setAttribute('class', 'projects');
            
            projectSelect.appendChild(projectOption); 
        }

        let projectLinks = document.querySelectorAll(".projects");
        projectLinks.forEach(p => p.addEventListener('click', function (){
            changeToProject(p.attributes[1].nodeValue);
        }))
    }

    buildSelect();

    function changeToProject(source) {

        while (mainBody.firstChild) {
            mainBody.removeChild(mainBody.firstChild);
        }
    
        let projectFrame = document.createElement('iframe');

        projectFrame.setAttribute('src', source);
        projectFrame.setAttribute('width', '100%');
        projectFrame.setAttribute('height', '100%');
    
        mainBody.appendChild(projectFrame);

    }
}

function changeToResume(){
    while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    let resumeFrame = document.createElement('object');

    resumeFrame.setAttribute('data', './assets/resume.pdf');
    resumeFrame.setAttribute('width', '100%');
    resumeFrame.setAttribute('height', '100%');

    mainBody.appendChild(resumeFrame);

}

function changeToContact() {
    while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    let contactFrame = document.createElement('form');
    contactFrame.setAttribute('action', 'https://formspree.io/brent.holden@protonmail.com')
    contactFrame.setAttribute('method', 'POST')
    mainBody.appendChild(contactFrame);

    let nameField = document.createElement('input');
    nameField.setAttribute('type', 'text');
    nameField.setAttribute('name', 'name');
    contactFrame.appendChild(nameField);

    let mailField = document.createElement('input');
    mailField.setAttribute('type', 'email');
    mailField.setAttribute('name', '_replyto');
    contactFrame.appendChild(mailField);

    let contactSubmit = document.createElement('input');
    contactSubmit.setAttribute('type', 'submit');
    contactSubmit.setAttribute('value', 'Send');
    contactFrame.appendChild(contactSubmit);
}

function buildFoot(){

    while (mainFoot.firstChild) {
        mainFoot.removeChild(mainFoot.firstChild);
    }

    let portfolioCodeButton = document.createElement('a');
    portfolioCodeButton.textContent = 'View Source Code';
    portfolioCodeButton.addEventListener('click', changeToPortfolioCode);

    mainFoot.appendChild(portfolioCodeButton);
}

buildFoot();

function changeToPortfolioCode(){

    while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
    }

    let portfolioCodeButtons = document.createElement('div');
    portfolioCodeButtons.setAttribute('id', 'portfolioCodeButtons');
    mainBody.appendChild(portfolioCodeButtons);

    let portfolioHTMLButton = document.createElement('a');
    portfolioHTMLButton.textContent = "HTML ";
    portfolioCodeButtons.appendChild(portfolioHTMLButton);

    let portfolioJSButton = document.createElement('a');
    portfolioJSButton.textContent = "JS ";
    portfolioCodeButtons.appendChild(portfolioJSButton);

    let portfolioCSSButton = document.createElement('a');
    portfolioCSSButton.textContent = "CSS ";
    portfolioCodeButtons.appendChild(portfolioCSSButton);

    let portfolioCodePre = document.createElement('pre');
    mainBody.appendChild(portfolioCodePre);

    let portfolioCodeCode = document.createElement('code');
    portfolioCodePre.appendChild(portfolioCodeCode);

    fetch('https://api.github.com/repos/BrentHolden/portfolio/contents/index.html')
        .then(response => response.json())
        .then(data => {
            portfolioCodeCode.textContent = atob(data.content);
        })
        .catch(error => console.error(error))
}

function projectFromGithub(){

    fetch('https://api.github.com/repos/huelsmanhd/board-meeting-client/contents/')
    .then(response => response.json())
    .then(data => {
        // console.log(atob(data.content));
        // console.log(data);
        for (i of data) {
            fetch(`https://api.github.com/repos/huelsmanhd/board-meeting-client/contents/${i.path}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error))
        }
    })
    .catch(error => console.error(error))

}