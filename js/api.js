const teamd = "https://api.football-data.org/v2/teams/";
const klas = "https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL";
const API = "f7f49e27defc45418782bc9606c286a3";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function callApi(page) {
    if (page=== 'teams') {
      getTeams();
    }
    if (page=== 'klasemen') {
      getStandings();    
    }
    if (page==='saved') {
      getSavedTeams();
    }
}

function getTeams() {
  if ("caches" in window){
    caches.match(teamd).then(function(response){
      if (response){
        response.json().then(function(data){
          var teamsDetail = '';
          data.teams.forEach(function(team){
            teamsDetail +=`
            <div class="col s12 m6">
                    <div class="card">
                      <div class="card-image waves-effect waves-block waves-light card-image-h">
                        <a  href="./teamdetails.html?id=${team.id}">
                          <img src="${team.crestUrl}" class="responsive-img">
                        </a>
                        </div>
                        <div class="card-content center">
                        <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                        <p>${team.area.name}</p>
                      </div>
                      <div class="card-action center">
                        <a href="./teamdetails.html?id=${team.id}">Detail Tim</a>
                      </div>
                    </div>
                  </div>`;
          });
          document.getElementById("hasilParsing").innerHTML = teamsDetail;
        })
      }
    })
  }
  fetch(teamd,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var teamsDetail = '';
      data.teams.forEach(function(team){
        teamsDetail += `
        <div class="col s12 m6">
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light card-image-h">
                    <a  href="./teamdetails.html?id=${team.id}">
                      <img src="${team.crestUrl}" class="responsive-img">
                    </a>
                    </div>
                    <div class="card-content center">
                    <span class="card-title grey-text text-darken-4 truncate">${team.name}</span>
                    <p>${team.area.name}</p>
                  </div>
                  <div class="card-action center">
                    <a href="./teamdetails.html?id=${team.id}">Detail Tim</a>
                  </div>
                </div>
              </div>`;
      });

      document.getElementById("hasilParsing").innerHTML = teamsDetail;
    })
    .catch(error);
}

function getStandings() {
  if ("caches" in window){
    caches.match(klas).then(function(response){
      if (response){
        response.json().then(function(data){
          var standingsType = '';
          data.standings.forEach(function(std){
            var standingDetail = '';
            std.table.forEach(function(pos){
              standingDetail += `
                <tr>
                  <td class="center">${pos.position}</td>
                  <td>${pos.team.name}</td>
                  <td>${pos.playedGames}</td>
                  <td>${pos.won}</td>
                  <td>${pos.draw}</td>
                  <td>${pos.lost}</td>
                  <td>${pos.goalsFor}</td>
                  <td>${pos.goalsAgainst}</td>
                  <td>${pos.goalDifference}</td>
                  <td>${pos.points}</td>
                <tr>
              `;
            })
            standingsType += `
              <table class = "highlight responsive-table">
                <thead>
                  <tr>
                    <th class="center">Position</th>
                    <th>Team</th>
                    <th>MP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                ` + standingDetail + `
                </tbody>
              </table>
            `;
          });
          document.getElementById("hasilTabel").innerHTML = standingsType;
        })
      }
    })
  }


  fetch(klas,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        var standingsType = '';
        data.standings.forEach(function(std){
            var standingDetail = '';
            std.table.forEach(function(pos){
                standingDetail += `
                    <tr>
                        <td class="center">${pos.position}</td>
                        <td>${pos.team.name}</td>
                        <td>${pos.playedGames}</td>
                        <td>${pos.won}</td>
                        <td>${pos.draw}</td>
                        <td>${pos.lost}</td>
                        <td>${pos.goalsFor}</td>
                        <td>${pos.goalsAgainst}</td>
                        <td>${pos.goalDifference}</td>
                        <td>${pos.points}</td>
                    <tr>
                `;
            })
            standingsType += `
            <table class = "highlight responsive-table">
              <thead>
                <tr>
                  <th class="center">Position</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
              ` + standingDetail + `
              </tbody>
            </table>
          `;
        });
        document.getElementById("hasilTabel").innerHTML = standingsType;
    })
    .catch(error);
}


function getteamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(teamd + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamDetails = `
            <div class="card mt-2 p2">
        <div class="row">
          <div class="col s12 m4 center">
            <img src="${data.crestUrl}" class="responsive-img"/>
                </div>
                <div class="col s12 m8">
                  <table>
                    <tbody>
                      <tr>
                  <th>Nama Tim</th>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <th>Nama Singkat</th>
                  <td>${data.shortName}</td>
                </tr>
                <tr>
                  <th>Stadion</th>
                  <td>${data.venue}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>${data.website}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <th>Negara</th>
                  <td>${data.area.name}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
            document.getElementById("content").innerHTML = teamDetails;
            resolve(data);
          });
        }
      });
    }
    fetch(teamd + idParam, {headers : {'X-Auth-Token' : API}})
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamDetails = `
        <<div class="card mt-2 p2">
        <div class="row">
          <div class="col s12 m4 center">
            <img src="${data.crestUrl}" class="responsive-img"/>
                </div>
                <div class="col s12 m8">
                  <table>
                    <tbody>
                      <tr>
                  <th>Nama Tim</th>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <th>Nama Singkat</th>
                  <td>${data.shortName}</td>
                </tr>
                <tr>
                  <th>Stadion</th>
                  <td>${data.venue}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>${data.website}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <th>Negara</th>
                  <td>${data.area.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
        document.getElementById("content").innerHTML = teamDetails;
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var teamsDetail = '';
      data.forEach(function(team){
        teamsDetail += `
        <li class="collection-item avatar">
          <a href="./teamdetails.html?id=${team.id}&saved=true">
          <img src="${team.crestUrl}" class="teamimg" alt="Universe">
          <span class="title"><h6><b>${team.name}</b></h6></span>
          <p>${team.venue}</p>
          </a>
        </li>
        `;
      });
      teamsHTML = `
        <ul class="collection">
                ` + teamsDetail + `
        </ul>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getSavedById(idParam).then(function(datat) {
    console.log(datat);
    var teamSavedDetails = `
    <h3>${datat.name} Details</h3>
    <br>
    <img src="${datat.crestUrl}" class="responsive-img" alt="${datat.crestUrl} logo">
    <ul class="collection">
        <li class="collection-item">
            <span class="title"><h6><b>datat Name:</b></h6></span>
            <p>${datat.name}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>datat Short Name:</b></h6></span>
            <p>${datat.shortName}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>datat Venue:</b></h6></span>
            <p>${datat.venue}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>Founded:</b></h6></span>
            <p>${datat.founded}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>Phone:</b></h6></span>
            <p>${datat.phone}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>website:</b></h6></span>
            <a href="${datat.website}">${datat.website}</a>
        </li>
    </ul>
    `;
    document.getElementById("content").innerHTML = teamSavedDetails;
  });
}
