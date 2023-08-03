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
var country_list = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]

function filterDropdown() {
    var input = document.getElementById("myInput");
    var dropdown = document.getElementById("myDropdown");
    var filter = input.value.toLowerCase();

    // Clear the dropdown
    dropdown.innerHTML = "";

    // Filter the items and show the relevant ones
    country_list.forEach(function(item) {
      if (item.toLowerCase().includes(filter)) {
        var option = document.createElement("div");
        option.className = "dropdown-item";
        option.textContent = item;
        option.onclick = function() {
          input.value = item; // Set the input value when an item is clicked
          dropdown.innerHTML = ""; // Clear the dropdown after selecting an item
        };
        dropdown.appendChild(option);
      }
    });
  }


let studentRadio = document.querySelector('.student')
let notstudentRadio = document.querySelector('.nostudent')

studentRadio.addEventListener('change' ,function(){
    studentDetails.style.display = 'block'
    notstudentDetails.style.display = 'none'
    console.log("is Student")
})

notstudentRadio.addEventListener('change' ,function(){
    studentDetails.style.display = 'none'
    notstudentDetails.style.display = 'block'    
    console.log("not Student")
})

let studentDetails = document.getElementById('studentDetails')
let notstudentDetails = document.getElementById('graduatedDetails')

studentDetails.style.display = 'none'
notstudentDetails.style.display = 'none'


let roleSelectOption = document.querySelector('.role')

roleSelectOption.addEventListener('change' ,appendRoles)
let roleLst = []
let rejectbutton
let wrapper = ''

let listDiv = document.getElementById('listall')
function appendRoles(){
  let selectedOption = roleSelectOption.options[roleSelectOption.selectedIndex]
  if(!roleLst.includes(selectedOption.value)){
    roleLst.push(selectedOption.value)
    console.log("Selected option:", selectedOption.value)
    console.log( "Length: " ,roleLst.length)
  }
  listDiv.innerHTML = ''
  wrapper = ''
  for(let i =0;i<roleLst.length;i++){
    wrapper = `
    <span class="listjob" style="background-color: rgb(74, 193, 232); border-radius: 25%;padding-inline: 1rem;font-weight: bold;padding-top: 0.2rem;padding-bottom: 0.2rem;">${roleLst[i]}  <button style="background-color: transparent;border: none;" id="cross${i}">x</button></span>
    `
    listDiv.innerHTML += wrapper
  }
  for(let j = 0;j<roleLst.length;j++){
    console.log('huh')
    rejectbutton = document.getElementById(`cross${j}`)
    rejectbutton.addEventListener('click' ,() => {
      crossRoleFunction(`${roleLst[j]}`);
    })
  }
  // console.log(roleLst)
}

function crossRoleFunction(id){
  console.log(id)
  let index = roleLst.indexOf(id)
  roleLst.splice(index ,1)
  console.log(roleLst)
  listDiv.innerHTML = ''
  wrapper = ''
  for(let i =0;i<roleLst.length;i++){
    wrapper = `
    <span class="listjob" style="background-color: rgb(74, 193, 232); border-radius: 25%;padding-inline: 1rem;font-weight: bold;padding-top: 0.2rem;padding-bottom: 0.2rem;">${roleLst[i]}  <button style="background-color: transparent;border: none;" id="cross${i}">x</button></span>
    `
    listDiv.innerHTML += wrapper
  }
  for(let j = 0;j<roleLst.length;j++){
    console.log('huh')
    rejectbutton = document.getElementById(`cross${j}`)
    rejectbutton.addEventListener('click' ,() => {
      crossRoleFunction(`${roleLst[j]}`);
    })
  }
  event.preventDefault()

}
function getFormValues(){
  event.preventDefault()

  let user = document.querySelector('.username').innerHTML
  let location = document.querySelector('.location').value
  let studentBool = document.querySelector('.student')
  let isStudent = false
  let schoolname = ''
  let joinedYear = ''
  let graduationYear = ''
  let jobTitle = ''
  let companyName = ''
  let experience = ''
  if(studentBool.checked){
    isStudent=true
    schoolname = document.getElementById('schoolName').value
    joinedYear = document.getElementById('joinyear').value
    graduationYear = document.getElementById('gradyear').value
  
  }else{
     jobTitle = document.getElementById('jobttitle').value
     companyName = document.getElementById('jobttitle').value
     experience = document.querySelector('.exp').value
  }
  let category = roleLst
  let resumeFile = document.getElementById('resume').files[0]
  let linkedinURL = document.getElementById('linkurl') .value
  let websiteURL = document.getElementById('weburl').value
  let githubURL = document.getElementById('giturl').value

  let formdata = new FormData()
  formdata.append( 'user ' ,user )
  formdata.append( 'isStudent ' ,isStudent )
  formdata.append( 'joinedYear ' ,joinedYear )
  formdata.append( 'graduationYear ' ,graduationYear )
  formdata.append( 'location ' ,location )
  // formdata.append( 'studentBool ' ,studentBool )

    // formdata.append('isStudent' , true)
    formdata.append( 'schoolname ' ,schoolname )
  

    formdata.append( 'jobTitle ' ,jobTitle )
    formdata.append( 'companyName ' ,companyName )
    formdata.append( 'experience ' ,experience )
  
  formdata.append( 'category ' ,category )
  formdata.append( 'resumeFile ' ,resumeFile )
  formdata.append( 'linkedinURL ' ,linkedinURL )
  formdata.append( 'websiteURL ' ,websiteURL )
  formdata.append( 'githubURL ' ,githubURL )
  let url = 'http://127.0.0.1:8000/profile-data/'
  console.log('fetched values')
  fetch(url ,{
    method:'POST',
    headers:{
      'X-CSRFToken':csrftoken,
    },
    body:formdata
  }).then((Response)=>Response.json()).then((data)=>{
    console.log(data)
    if(data['status'] === 'completed'){
      window.location.replace("/");
    }
  })
}

let profilesubmitButton = document.getElementById('profilesubmit')
profilesubmitButton.addEventListener('click' ,getFormValues)

