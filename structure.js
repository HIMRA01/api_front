const REGISTERFORM = $("#registerFORM");
const LOGINFORM = $("#loginFORM");
getUserList();
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
          localStorage.setItem("iduser", data.data.id);
          window.location.href("");
        })
        .catch((error) => error);
    })

    .catch((error) => console.log("il ya une erreur"));
}

// fonction pour obtenir la liste des utilisateur
function getUserList() {
  fetch("http://localhost/api_back/getuserlist/")
    .then((response) => {
      response
        .json()
        .then((data) => {
          // console.log(data);
          printUsers(data.data);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// fonction pour afficher la liste des utilisateur
function printUsers(listUser) {
  listUser.forEach((element) => {
    // creer une balise p en lui ajoutant le prenom de l'utilisateur comme texte
    // let p = $("p").append(element.firstname);
    let p = document.createElement("p");
    p.textContent = element.firstname;
    p.id = element.id_user;
    p.addEventListener("click", () => {
      getListMessage(localStorage.getItem("iduser"), p.id);
    });
    // on ajoute le paragraphe comme enfant de la div avec la class user_list
    $("#user_list").append(p);
  });

  // fonction pour avoir la liste des messages entre 2 utilisateurs getMessage
}

function getListMessage(expeditor, receiver) {
  fetch(
    "http://localhost/api_back/getListMessage/" + expeditor + "/" + receiver
  )
    .then((response) => {
      response
        .json()

        .then((data) => {
          // console.log(data);

          // appel de printUsers

          // printMessages(data.users);

          console.log(data);
        })

        .catch((error) => console.log(error));
    })

    .catch((error) => console.log(error));
}

// fonction pour afiicher la liste desd message entre 2 users

function printMessage(list) {
  getListMessage.forEach(element => {
    document.getElementById("discution").innerHTML = "";
    // pn crée une div et un patragraphe 
    let div = document.createElement("div");

 let p = document.createElement("p");
// on ajopute au paragraphe a la div
    div.append(p);
    // on ajoute au paragraphe son gtext
    p.textContent = element.message;
    if (element.expeditor == localStorage.getItem("iduser")) {
      div.className = "expediteur";

    } else {
      div.className = "expediteur"
    }
    $("#discution").append(div);
  })

}