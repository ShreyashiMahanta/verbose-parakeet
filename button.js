AFRAME.registerComponent('create-button',{

    init : function(){

        var button1 = document.createElement("button");    
    button1.innerHTML = "RATE DISH";
    button1.setAttribute("id", "Rating-button");
        
        button1.setAttribute("class","btn btn-warning");

        var button2 = document.createElement('button');
        button2.innerHTML = "OrderNow";

        button2.setAttribute('id',"order-button");
        button2.setAttribute("class","btn btn-warning");

        var buttonDiv = document.getElementById("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button1);

    }
})