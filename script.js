let tab = JSON.parse(localStorage.getItem("transactions"))||[];


let ajouter=  document.querySelector("#ajouter");

ajouter.addEventListener("click",() => {
    let montantPlus= Number(document.querySelector("#montantPlus").value);

    if(
        montantPlus<= 0
    )return;

    let newTRS= {
        date: new Date().toLocaleDateString(),
        montant: montantPlus
    };

    tab.push(newTRS);
    localStorage.setItem("transactions", JSON.stringify(tab));
    location.reload()
   document.querySelector("#montantPlus")= "";
   
});


let retirer= document.querySelector("#retirer");

retirer.addEventListener("click",() => {
    let montantMoins= Number(document.querySelector("#montantMoins").value);

    if(
        montantMoins<= 0
    )return;

    let newTRS= {
        date: new Date().toLocaleDateString(),
        montant: -montantMoins
    };

    tab.push(newTRS);
    localStorage.setItem("transactions", JSON.stringify(tab));
    location.reload()
   document.querySelector("#montantMoins")= "";
   
});


let trans = document.querySelector("#contenair-4");
let somme= document.querySelector("#contenair-2");
let totalSomme= 0;

tab.forEach((transaction, index) => {
    let p = document.createElement("p");
    let annuler= document.createElement("button");
    let box4= document.createElement("div");
    
    box4.classList.add("contenair-41");
    totalSomme += Number(transaction.montant);
    
    annuler.textContent= "Annuler";
    p.textContent = `Date: ${transaction.date} | Montant: ${transaction.montant.toLocaleString("fr-FR")} AR `;
    
    trans.appendChild(box4); 
    box4.appendChild(p);
    box4.appendChild(annuler);

     annuler.addEventListener("click", ()=>{
        tab.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(tab));
        location.reload()
    });
});

let total= document.createElement("p");
total.textContent = totalSomme.toLocaleString("fr-FR")+ " AR";
somme.appendChild(total);

let setting= document.querySelector("#setting");

// Creation des element HTML pour le Parametre
let boite= document.createElement("div");
boite.classList.add("overlay");

let btnClose= document.createElement("button");
btnClose.classList.add("close");
btnClose.textContent="X";

// BOX 1st
let box1= document.createElement("div");
box1.classList.add("sousOverlay1");

let label1= document.createElement("label");
label1.textContent="Objectif: ";
let input1= document.createElement("input");
input1.id= "objctf";


box1.appendChild(label1);
box1.appendChild(input1);

// BOX 2nd
let box2= document.createElement("div");
box2.classList.add("sousOverlay2");

let label2= document.createElement("label");
label2.textContent="Motif: ";
let input2= document.createElement("input");
input2.id= "mtf";


box2.appendChild(label2);
box2.appendChild(input2);

// Button SAVE
let save= document.createElement("button");
save.textContent="Enregistrer";
save.style.marginTop = "30px";
save.id="sv";

// Affichage
boite.appendChild(btnClose);
boite.appendChild(box1);
boite.appendChild(box2);
boite.appendChild(save);


setting.addEventListener("click", () => {
    document.body.appendChild(boite);
   

    save.addEventListener("click", ()=>{
         let objectif = Number(input1.value);
         let why = input2.value;
         
         localStorage.setItem("target", objectif);
         localStorage.setItem("motif", why);
         
         location.reload();
    });

    btnClose.addEventListener("click", () => {
        boite.remove()
    });

});

let reste= Number(localStorage.getItem("target")) - totalSomme;
localStorage.setItem("reste", reste);

let boxOBJ= document.querySelector("#contenair-11");
let boxMTF= document.querySelector("#contenair-12");
let boxRST= document.querySelector("#contenair-13");
let pOBJ= document.createElement("p");
let pMTF= document.createElement("p");
let pRST= document.createElement("p");

pOBJ.textContent= Number(localStorage.getItem("target")).toLocaleString("fr-FR") + " AR";
pMTF.textContent= localStorage.getItem("motif");
pRST.textContent= Number(localStorage.getItem("reste")).toLocaleString("fr-FR") + " AR";

pOBJ.style.color= ("blue");
pRST.style.color= ("red");
boxOBJ.appendChild(pOBJ);
boxMTF.appendChild(pMTF);
boxRST.appendChild(pRST);


let reset= document.querySelector("#reset");

reset.addEventListener("click", () =>{
    window.alert("Repartir a zero!")

    localStorage.removeItem("transactions");
    localStorage.removeItem("target");
    localStorage.removeItem("motif");
    localStorage.removeItem("reste");
    location.reload();
})


