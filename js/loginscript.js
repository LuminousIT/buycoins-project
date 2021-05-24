const error = document.getElementById("errorContainer");
error.style.padding = 12;

function handleSubmit() {
  var form = document.getElementById("usernameForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formEl = document.forms.usernameForm;

    let formData = new FormData(formEl);

    let username = formData.get("username");
    if (!username) {
      const errorMsg = "Username field cannot be empty!";
      showErrorMsg(errorMsg);
      return;
    }

    fetchUserRepositories(username.toString());
  });
}

handleSubmit();

const baseUrl = "https://api.github.com/graphql";
const headers = {
  "Content-Type": "application/json",
  Authorization: `bearer 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`,
};
// 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;
// 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
function fetchUserRepositories(username) {
  console.log("username", typeof username);
  const githubQueryToFetch20Repositories = {
    query: `query MyQuery($username: String!) {
          user(login: $username) {
            repositories(first: 20, isFork:false){
              nodes{
                name
                url
                isPrivate
                updatedAt
                description
                languages(first:1){
                  nodes{
                    name
                    color
                  }
                }
                licenseInfo{
                  name
                }
              }
            }
            bio
            avatarUrl
            starredRepositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            name
          }
        }`,
    variables: { username },
  };

  const loaderDiv = document.getElementById("loader");
  //   display spinner
  loaderDiv.classList.add("error-display");

  fetch(baseUrl, {
    headers: headers,
    body: JSON.stringify(githubQueryToFetch20Repositories),
    method: "POST",
  })
    .then((res) => res.json())
    .then((item) => {
      if (item?.errors) {
        //   remove spinner
        loaderDiv.classList.remove("error-display");
        console.log(item.errors[0].message);
        const errorMsg = item.errors[0].message;

        showErrorMsg(errorMsg);
        // error popup
        // error.innerText = errorMsg;

        // // display error
        // error.classList.add("error-display");
        // //remove error after 5 secs
        // setTimeout(function () {
        //   error.classList.remove("error-display");
        // }, 5000);
      } else {
        //   remove spinner
        loaderDiv.classList.remove("error-display");
        console.log("item ", item);
        localStorage.setItem("userData", JSON.stringify(item));
        location.assign("homepage.html?q=" + btoa(username));
      }
    });
}

function showErrorMsg(message) {
  // input error
  error.innerText = message;
  error.classList.add("error-display");
  //remove error after 5 secs
  setTimeout(function () {
    error.classList.remove("error-display");
  }, 4000);
}
