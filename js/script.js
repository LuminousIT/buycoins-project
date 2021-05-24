function myFunction() {
  let x = document.getElementById("nav-list");
  if (x.className === "header-nav-list") {
    x.className += " responsive";
  } else {
    x.className = "header-nav-list";
  }
}

function viewTab(event, tabName) {
  let i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

// document.getElementById("repositories-link").click();

function formatDate(utc) {
  let newDate = new Date(utc).toDateString();
  let slicedDate = newDate.split(" ");
  let finalDate = slicedDate[1] + " " + slicedDate[2];
  return finalDate;
}

function decryptUsername() {
  const usernameQuery = window.location.search;
  if (!usernameQuery) return false;
  let usernameQ = usernameQuery.substr(3);
  const username = atob(usernameQ);
  return username;
}

function displayUserRepo() {
  const userData = localStorage.getItem("userData");
  const username = decryptUsername();

  if (userData) {
    const userDetails = JSON.parse(userData);
    console.log("user detaols", userDetails);

    document.getElementById("bold-text").textContent = username;
    const img = document.getElementById("profImg");
    const img2 = document.getElementById("profImg2");
    img.src = ` ${userDetails.data.user.avatarUrl}`;
    img2.src = ` ${userDetails.data.user.avatarUrl}`;

    const profileInfo = document.getElementById("profile-info");
    const profile = `<div>  <h3> ${userDetails.data.user.name} </h3>
    <p>${username}</p> <p class="bio-desc">  ${userDetails.data.user.bio}  </p> </div>`;
    profileInfo.innerHTML += profile;

    document.getElementById("follower").textContent =
      userDetails.data.user.followers.totalCount;
    document.getElementById("following").textContent =
      userDetails.data.user.following.totalCount;
    document.getElementById("starred").textContent =
      userDetails.data.user.starredRepositories.totalCount;

    const cardContainer = document.getElementById("card-list");
    // if (item.data != undefined) {
    userDetails.data.user.repositories.nodes.forEach((item) => {
      const card = document.createElement("div");
      card.classList = "card-body";

      const content = `
      <div class="card">
      <div>
        <div class="card-title">
          <p class="card-title-header">${item.name}</p>
          <p class="card-title-type">${
            item.isPrivate ? "Private" : "Public"
          }</p>
        </div>
        <p class="card-description"> ${
          item.description !== null ? item.description : ""
        } </p>
        <div class="card-desc">
          <div class="card-desc-lang-color" style="background-color: ${
            item.languages.nodes[0].color
          }"></div>
          <div>
            <!-- <span >p</span> -->
            <span class="card-desc-lang lang">${
              item.languages.nodes[0].name
            }</span>
          </div>
          <div>
            <span class="card-desc-lang">Updated on ${formatDate(
              item.updatedAt
            )} </span>
          </div>
        </div>
      </div>

      <div>
        <button class="star">
          <span><i class="fa fa-star-o"></i></span> Star
        </button>
      </div>
    </div>
        `;

      cardContainer.innerHTML += content;
    });
  }
}

displayUserRepo();
