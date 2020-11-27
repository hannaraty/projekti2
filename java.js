//Bodyn ladatessa haetaan Finnkinon teatterit
window.addEventListener('DOMContentLoaded', lataaAlueet, false);
function lataaAlueet() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
  xmlhttp.send();

  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
      // Tallennetaan vastaustiedot  xmlDoc muuttujaan 
      var xmlDoc = xmlhttp.responseXML;

      //Poimitaan teattereiden nimet ja ID:t
      var teatteriNimi = xmlDoc.getElementsByTagName("Name");
      var teatteriID = xmlDoc.getElementsByTagName("ID");

      //taulukon läpi käynti
      for(var i = 0; i < teatteriNimi.length; i++) {
        
     
        var teatteriTeksti = teatteriNimi[i].innerHTML;
        var teatteriID1 = teatteriID[i].innerHTML;


        // Luo dropdownmenun, josta käyttäjä valitsee teatterin jonka elokuvat haluaa nähdä
        document.getElementById("teatterit").innerHTML +=  '<option value = ' + teatteriID1 + '>' + teatteriTeksti + '</option>';
      }
    }
  }
}


// Ladataan XML:stä näytettävät elokuvat 

document.getElementById("teatterit").addEventListener("click", lataaAikataulu);
function lataaAikataulu() {

  //Haetaan html:stä kohdat mihin tiedot syötetään
  document.getElementById("syotto").style.display="block";
  document.getElementById("lista").innerHTML = "";

// Haetaan XML:stä teattereissa pyörivät elokuvat
var teatterit = document.getElementById("teatterit").value;
var sivut='https://www.finnkino.fi/xml/Schedule/?area=';
var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp);
      }
  };
  xmlhttp.open("GET", sivut+teatterit, true);
  xmlhttp.send();

//Tarkennetaan mitä XML:stä haetaan
function myFunction(xml){

var xmlDoc = xml.responseXML;
var otsikko = xmlDoc.getElementsByTagName("Title");
var kuvat = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
var aika = xmlDoc.getElementsByTagName("dttmShowStart");
var kesto = xmlDoc.getElementsByTagName("LengthInMinutes");
var linkki = xmlDoc.getElementsByTagName("ShowURL");
var teksti = "Varaa lippu tästä";

//parsitaan tiedot
for(var i=0;i<otsikko.length;i++){
  var kaikkiKuvat='<img class="images" src="' +kuvat[i].innerHTML+ '">';
  var kaikkiOtsikot=otsikko[i].innerHTML;
  var kaikkiAika=aika[i].innerHTML;
  var kaikkiKesto=kesto[i].innerHTML;
  var vieLinkki= teksti.link(linkki[i].innerHTML);
  
  var kello = kaikkiAika.slice(11, 16);
  var pvm = kaikkiAika.slice(8, 10);
  var kk = kaikkiAika.slice(5,7);
  var v = kaikkiAika.slice(0,4);

  //tulostaa elokuvien tiedot ruudulle taulukkona
  document.getElementById("lista").style.display = "block";
document.getElementById("lista").innerHTML +='<tr><td>' + kaikkiKuvat + '</td><td>' + "Nimi: " 
+ kaikkiOtsikot + '<br>' +"Pvm: " + pvm + "." + kk + "." + v + " Alkaa: " + kello + '<br>' + " Kesto: " + kaikkiKesto + " minuuttia <br>" + vieLinkki+ '</td>';
    }
  }
}


//Lisätään hakukenttä
document.getElementById("syotto").addEventListener("keyup", etsiElokuva);
function etsiElokuva() {
  //Muuttujat
  var syöte, filter, table, tr, td, i, txtValue;
  syöte = document.getElementById("syotto");
  filter = syöte.value.toUpperCase();
  table = document.getElementById("lista");
  tr = table.getElementsByTagName("tr");

  // for loopin kautta läpi hakutulokset ja näyttää vain ne jotka täsmäävät
  for(var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
