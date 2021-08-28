AFRAME.registerComponent("markerHandler",{

    init: async function(){
        this.el.addEventListener("markerFound", ()=>{
            console.log("MARKER FOUND!");

        });

        this.el.addEventListener("markerLost", ()=>{
            console.log("MARKER LOST!");
            
        });
    },

    handleMarkerFound: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var ratingButton = document.getElementById("Rating-button");
        var orderButton = document.getElementById("order-button");

        ratingButton.addEventListener("click",()=>{
            swal({
                icon : "warning",
                title : "Rate Dish",
                text : "WORK IN PROGRESS"
            })
        } );

        orderButton.addEventListener("click",()=>{
            swal({
                icon : "https://i.imgur.com/4NZ6uLY.jpg",
                title : "THANKS FOR THE DISH",
                text : "Your order will be served soon at your table!"
            })
        });


    },

    handleMarkerLost : function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    }

})