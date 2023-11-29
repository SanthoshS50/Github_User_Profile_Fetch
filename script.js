const userInput = document.getElementById("userName");
const getDetailsButton = document.getElementById("getDetails");
const profileInfo = document.getElementById("profileInfo");
const repoInfo = document.getElementById("repoInfo");

//!using async function to get the user details
getDetailsButton.addEventListener("click", async () => {
  const userName = userInput.value;
  //console.log(userName);
  //!using the github api to fetch the data from server.
  const res = await fetch(`https://api.github.com/users/${userName}`);
  const data = await res.json();
  //console.log(data);
  getProfile(data);
  getRepo(userName);
});

//!get profile function it is used to get the used details from the server.
function getProfile(data) {
  console.log(data);
  profileInfo.innerHTML = `<div class="card">
    <div class="card-img">
   <img src=${data.avatar_url} alt=${data.name}>
   </div>
   <div class="card-body">
   <div class="card-title">${data.name}</div>
   <div class="card-subHeading">${data.login}</div>
   <div class="card-text">
   <p>${data.bio}</p>
   <p><i class="fa-solid fa-user-group"></i> ${data.followers} Followers ${data.following} Following </p>
   <p><i class="fa-solid fa-location-dot"></i> ${data.location}</p>
   <button>
   <a href=${data.html_url} target="_blank">Visit Profile</a>
   </button>
   </div>
   </div>
   </div>`;
}

//!get repositories based on the username and passing another api to get that
async function getRepo(userName) {
  const res = await fetch(`https://api.github.com/users/${userName}/repos`);
  const projects = await res.json();
  for (let i = 0; i < projects.length; i++) {
    repoInfo.innerHTML += `<div class="card">
        <div class="card-body">
        <div class="card-title">${projects[i].name}</div>
   <div class="card-subHeading">${projects[i].language}</div>
   <div class="card-text">
   <button>
   <a href=${projects[i].html_url} target="_blank">Visit Projects</a>
   </button>
   </div>
   </div>
   </div>`;
  }
}
