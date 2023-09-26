const REGISTERFORM = $("#registerFORM");
const LOGINFORM = $("#loginFORM");

REGISTERFORM.on("submit", (e) => {
  e.preventDefault();
  let pseudo = $("#pseudo").val();
  let firstname = $("#firstname").val();
  let lastname = $("#lastname").val();
  let password = $("#password").val();
  let action = $("#action").val();
  // appel de la fonction register
  register(pseudo, firstname, lastname, password, action);
});

LOGINFORM.on("submit", (e) => {
  e.preventDefault();
  let pseudo = $("#pseudo").val();
  let password = $("#password").val();
  let action = $("#action").val();
  // appel de la fonction register
  login(pseudo, password, action);
});

function register(pseudo, firstname, lastname, password, action) {
  let data = {
    pseudo: pseudo,
    password: password,
    firstname: firstname,
    lastname: lastname,
    action: action,
  };
  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };

  fetch("http://localhost/api_back/", dataOption)
    .then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("promesse non tenue....");
        });
    })
    .catch((error) => console.log("tu me l'avais promis en tous cas"));
}

function login(pseudo, password, action) {
  let data = {
    pseudo: pseudo,
    password: password,
    action: action,
  };
  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };
  fetch("http://localhost/api_back/", dataOption)
    .then((response) => {
      response
        .json()
        .then((data) => {
            console.log(data);
            localStorage.setItem("iduser", data.data.id)
          window.location.href("");
        })
        .catch((error) => error);
    })

    .catch((error) => console.log("il ya une erreur"));
}
