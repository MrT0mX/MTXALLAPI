const textnya = document.querySelector(".status");
var apikey = document.getElementById("input-apikey");
apikey.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("submit-apikey").click();
  }
});
function execute() {
  if (apikey.value == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "warning",
      title: "Masukkan Input Apikey",
      footer: "MrTomXxX API",
    });
  } else {
    $.getJSON(
      `https://api-mtx.xyz/api/cekkey?apikey=${apikey.value}`,
      function (hasil) {
        if (hasil.result.limit == undefined) {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: hasil.result + "\n" + hasil.message,
            footer: "MrTomXxX Free API",
          });
          textnya.innerHTML = `Cek Apikey <i class="fa-brands fa-keycdn"></i><hr class="my-5">${hasil.result}<br>${hasil.message}`;
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title:
              "Limit: " +
              hasil.result.limit +
              "\nExpired: " +
              hasil.result.expired,
            footer: "MrTomXxX Free API",
          });
          textnya.innerHTML = `Cek Apikey <i class="fa-brands fa-keycdn"></i><hr class="my-5">Your Apikey Registered`;
        }
      }
    );
  }
}
//Get Date
myMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
myDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var tgl = new Date();
var day = tgl.getDate();
bulan = tgl.getMonth();
var thisDay = tgl.getDay();
ThisDay = myDays[thisDay];
var yy = tgl.getYear();
var year = yy < 1000 ? yy + 1900 : yy;
document.getElementById("years").innerHTML = year;
document.getElementById(
  "tanggal"
).innerHTML = `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
// Jam Sekarang
window.setTimeout("waktu()", 1000);
function waktu() {
  var d = new Date();
  const jam = d.getHours();
  const menit = d.getMinutes();
  const detik = d.getSeconds();
  setTimeout("waktu()", 1000);
  document.getElementById("Clock").innerHTML =
    jam + " : " + menit + " : " + detik + " WIB";
}
//Get Battery
var batteryLevel = document.getElementById("batteryLevel");
var percentageLevel = document.getElementById("percentageLevel");
var batteryStatus = document.getElementById("isCharge");
navigator.getBattery().then(function (battery) {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();
  battery.addEventListener("chargingchange", function () {
    setInterval(function () {
      updateChargeInfo();
    }, 1000);
  });
  function updateChargeInfo() {
    batteryStatus.innerHTML = battery.charging ? "Is Charger" : "Not Charger";
  }
  battery.addEventListener("levelchange", function () {
    setInterval(function () {
      updateLevelInfo();
    }, 1000);
  });
  function updateLevelInfo() {
    var numBattery = battery.level * 100;
    percentageLevel.innerHTML = Math.round(numBattery) + "%";
  }
});
// CountDown Date
var countDownDate = new Date("May 01, 2022 00:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countDown").innerHTML =
    days + " Days " + hours + " Hours " + minutes + " Min " + seconds + " Sec ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countDown").innerHTML = "Happy Eid Mubarak";
  }
}, 1000);
//ucapan Tiap Hari
Sayings = "";
var now = new Date();
var hours = now.getHours();
if (hours >= 17 || hours <= 2) {
  Sayings += "Good Night";
} else if (hours >= 3 && hours <= 10) {
  Sayings += "Good Morning";
} else if (hours >= 11 && hours <= 14) {
  Sayings += "Good Afternoon";
} else if (hours >= 13 && hours <= 16) {
  Sayings += "Good Evening";
}
document.getElementById("Ucapan").innerHTML = Sayings;
//get IP
$.getJSON(
  `https://api.ipgeolocation.io/ipgeo?apiKey=173ab2a4ae9e4f18a00b630916e9eec5`,
  function (loot) {
    /*document.getElementById("cek_data").innerHTML=`<img src="${loot.country_flag}" class="rounded-md justify-center"><span class="text-center font-bold">${loot.calling_code}<hr class="my-5">${loot.district}, ${loot.city}<hr class="my-5">${loot.time_zone.name}<hr class="my-5">${loot.latitude}, ${loot.longitude}</span><hr class="my-5">`;*/ document.getElementById(
      "ip"
    ).innerHTML = loot.ip + ", " + loot.country_code2;
    document.getElementById("card").innerHTML = loot.isp;
  }
);
//get Visitor Count
$.getJSON(
  "https://api.countapi.xyz/hit/api-fxc7.herokuapp.com/visits",
  function (data) {
    document.getElementById("visitor").innerHTML = data.value;
  }
);
