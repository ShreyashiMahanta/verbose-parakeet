AFRAME.registerComponent("create-marker",{

    init : async function(){
        var mainScene = document.querySelector("#main-scene");
        
        var dishes = await this.getDishes();

        //Getting the dish collection from the database
        dishes.map(dish => {
            var marker = document.createElement("a-marker");
            marker.setAttribute("id",dish.id);
            marker.setAttribute("type","pattern");

            marker.setAttribute("url",dish.marker_pattern_url);
            marker.setAttribute("cursor",{
                rayOrigin: "mouse",
            });

            marker.setAttribute("markerHandler",{});

            mainScene.appendChild(marker);

            //3D model
            var model = document.createElement("a-entity");
            model.setAttribute("id",`model-${dish.id}`);
            model.setAttribute("position",dish.model_geometry.position);

            model.setAttribute("rotation",dish.model_geometry.rotation);
            model.setAttribute("scale",dish.model_geometry.scale);

            model.setAttribute("gltf-model",`url(${dish.model_url})`);

            model.setAttribute("gesture-handler",{});

            marker.appendChild(model);

            //Ingredient Container
            var mainPlane =  document.createElement("a-plane");

            mainPlane.setAttribute("id", `main-plane-${dish.id}`);
            mainPlane.setAttribute("position", {
                x : 0,
                y : 0,
                z : 0,
            });

            mainPlane.setAttribute("rotation", {
                x : -90,
                y : 0,
                z : 0,
            });

            mainPlane.setAttribute("width", 1.7);
            mainPlane.setAttribute("height",1.5);

            marker.appendChild(mainPlane);

            //Dish title background

            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id", `title-plane-${dish.id}`);

            titlePlane.setAttribute("position",
            {
                x : 0,y : 0.89,z : 0.02
            });

            titlePlane.setAttribute("rotation",
            {
                x : 0,y : 0,z : 0
            });

            titlePlane.setAttribute("width",1.69);
            titlePlane.setAttribute("height",0.3);

            titlePlane.setAttribute("material",{
                color: "#f0c30f"
            });

            mainPlane.appendChild(titlePlane);

            //Dish title

            var dishTitle = document.createElement("a-entity");
            dishTitle.setAttribute("id", `dish-title-${dish.id}`);

            dishTitle.setAttribute("position",
            {
                x : 0,y : 0,z : 0.1
            });

            dishTitle.setAttribute("rotation",
            {
                x : 0,y : 0,z : 0
            });

            dishTitle.setAttribute("text",{
                font : "monoid",
                color  : "black",
                width : 1.8,
                height : 1,
                align : "center",
                value : dish.dish_name,toUpperCase()
            });

            titlePlane.appendChild(dishTitle);

            //Ingredient List
            var ingredientList = document.createElement("a-entity");

            ingredientList.setAttribute("id", `ingredients-${dish.id}`);

            ingredientList.setAttribute("position",
            {
                x : 0.3,y : 0,z : 0.1
            });

            ingredientList.setAttribute("rotation",
            {
                x : 0,y : 0,z : 0
            });

            ingredientList.setAttribute("text",{
                font : "monoid",
                color  : "black",
                width : 2,
                align : "left",
                value : `${dish.ingredients.join("\n\n")}`
            })

            mainPlane.appendChild(ingredientList);

        })
    },

    getDishes : async function(){

        return await firebase.firestore.collection('dishes').get()
        .then(snapshot => {
            return snapshot.docs.map((doc => doc.data))
        })

    }

})