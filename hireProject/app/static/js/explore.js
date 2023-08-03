console.log("explore page")

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');
let resumebtn = ''
let wrapper = ''
let divElement = document.querySelector('.container')
let exploreBtn = document.getElementById('explorebtn')
exploreBtn.addEventListener('click' ,getRecruiterData)
function getRecruiterData(){
    let url = '/explore-data/'
    fetch(url ,{
        method:'POST',
        headers:{
            'X-CSRFToken':csrftoken,
            'content-type':'application/json'
        },
        body:JSON.stringify({
            'role':roleList,
            'location':'India',

        })
    }).then((Response)=>Response.json()).then((data)=>{
        console.log(data)
        for(let i in data){
            let dataValue = data[i]
            console.log(data[i].user.name)
            if(dataValue.isStudent){
                wrapper = `
                <div style="padding: 2rem;width: 50rem;"class="card mb-3">
            <h5 class="card-title">Name: ${dataValue.user.name}</h5>
            <h3>location : ${dataValue.location}</h3>
    
            <div  class="row g-0">
              <div class="col-md-7">
                <!-- <p class="card-text">Role Category :</p> -->
                <p class="card-text">School Name: ${dataValue.schoolname}</p>
                <p class="card-text">joined year : <span>${dataValue.joinedYear}</span>  Graduation Year: <span>${dataValue.graduationYear}</span></p>
      
                <p class="card-text">Experience in current role ${dataValue.experience}</p>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <p class="card-text">Category : ${dataValue.category}</p>
                  <br>
                    
                  <span style="display: none;"></span>
                  <span>Resume Download:  </span><button class='${dataValue.resumeFile}' 'id='${dataValue.id}resume''>^</button>
    
                  <p class="card-text"><a href="${dataValue.linkedinURL}">linkedin URL</a></p>
                  <p class="card-text"><a href="${dataValue.websiteURL}">Web Site URL</a> </p>
                  <p class="card-text"><a href="${dataValue.githubURL}">Github URL</a> </p>
                  <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                  <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                </div>
              </div>
            </div>
          </div>
                
                `
            }else{
                wrapper = `
                <div style="padding: 2rem;width: 50rem;"class="card mb-3">
            <h5 class="card-title">Name: ${dataValue.user.name}</h5>
            <h3>location : ${dataValue.location}</h3>
    
            <div  class="row g-0">
              <div class="col-md-7">
      
                <p class="card-text">Job Title: ${dataValue.jobTitle}</p>
                <p class="card-text">Company Name: ${dataValue.companyName}</p>
      
                <p class="card-text">Experience in current role ${dataValue.experience}</p>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <p class="card-text">Category : ${dataValue.category}</p>
                  <br>
                  
                  <span>Resume Download: ${dataValue.resumeFile} </span><button>^</button>
    
                  <p class="card-text"><a href="${dataValue.linkedinURL}">linkedin URL</a></p>
                  <p class="card-text"><a href="${dataValue.websiteURL}">Web Site URL</a> </p>
                  <p class="card-text"><a href="${dataValue.githubURL}">Github URL</a> </p>
                  <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                  <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                </div>
              </div>
            </div>
          </div>
                
                `
            }
            console.log(`${dataValue.id}resume`)
            divElement.innerHTML += wrapper;

            // (function (resumeFile) {
            //     let resumebtn = document.getElementById(`${data[i].id}resume`);
            //     resumebtn.addEventListener('click', () => {
            //       return getResumeFileLocation(resumeFile);
            //     });
            //   })(data[i].resumeFile);
        
        }

        // for(let i in data){
        //     console.log(`${data[i].id}resume`)
        //     resumebtn = document.getElementById(`${data[i].id}resume`)
        //     let resumedata = data[i]
        //     resumebtn.addEventListener('click' ,(()=>{
        //         return ()=>{
        //           getResumeFileLocation(resumedata.resumeFile)
        //         }
        //     })())
        // }
    })
}


function getResumeFileLocation(filename){
    console.log(filename)
}

let parentElement = document.querySelector('.dropdown-menu')

let buttons = parentElement.querySelectorAll('li > button');
let roleList = []
if (buttons.length > 0) {
  for (let button of buttons) {
    console.log(button.id);
    let id = button.id
    button.addEventListener('click' ,()=>{
        return roleButtonClicked(id)
    })
  }
} else {
  console.log("Buttons not found.");
}

function roleButtonClicked(id){
    console.log(id)
    if(!roleList.includes(id)){
        roleList.push(id)
        document.getElementById(id).style.backgroundColor = 'rgb(162, 218, 162)'
    }else{
        let index = roleList.indexOf(id)
        roleList.splice(index ,1)
        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)'
    }
    console.log(roleList)
    getRecruiterData()
}