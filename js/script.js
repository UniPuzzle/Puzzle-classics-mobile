function viewDiv4() {
   document.getElementById("active-4").style.display = "block";
};
function viewDiv6() {
   document.getElementById("active-6").style.display = "block";
};

$("active-6").click(function () {
   $("active-6").fadeToggle(100);
});

