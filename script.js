// Author: Pascal Chatonnay
// Date: 2019/11/20
// Description: les script pour un algorithme génétique simple

// Variables globales
var population = [];
var populationSize = 100;
var maxGeneration = 100;
var crossoverRate = 0.5;
var mutationRate = 0.01;
var generation = 0;
var calls = 0;




// fonction pour récuperer les valeurs des inputs
function getFormValues() {
    populationSize = parseInt(document.getElementById("populationSize").value);
    mutationRate = parseFloat(document.getElementById("mutationRate").value);
    crossoverRate = parseFloat(document.getElementById("crossoverRate").value);
    maxGeneration = parseInt(document.getElementById("maxGenerations").value);

}


/*
Trois fonctions pour mettre à jour le nombree d'appel à la fonction fitness

changementForm() est appelée depuis le formulaire lors d'un changement
fitnessCalls() est appelée pour calculer le nombre d'appel
displayCalls() est appelée pour afficher le nombre d'appel

*/
// fonction affiche le nombre d'appel dans le champ de foumulaire "calls
function displayCalls() {
    document.getElementById("calls").value = calls;
}

// fonction pour calculer le nombre d'appel de la fonction fitness
function fitnessCalls() {
    calls = populationSize*(1 + (maxGeneration *crossoverRate));
}

// fonction appeler lors d'un changement dans le formulaire afin de mettre à jour le nombre d'appel à la fonction dévaluation
function changementForm() {
 getFormValues();
 fitnessCalls();
 displayCalls();
}

// fonction pour afficher les resultats
function afficheResultat() {
    var txt = "Bravo, vous avez réussi à faire fonctionner l'algorithme génétique. Vous avez fait " + calls + " appels à la fonction fitness.";
    document.getElementById("resultats").innerHTML = txt;
}

// fonction pour afficher la population
function affichePopulation() {
    var txt = "<table>";
    txt += "<tr><th>Individu</th><th>Genotype</th><th>Phenotype</th><th>Fitness</th></tr>";
    for (var i = 0; i < populationSize; i++) {
        txt += "<tr>";
        txt += "<td>" + i + "</td>";
        txt += "<td>" + population[i].genotype + "</td>";
        txt += "<td>" + population[i].phenotype + "</td>";
        txt += "<td>" + population[i].fitness + "</td>";
        txt += "</tr>";
    }
    txt += "</table>";
    document.getElementById("population").innerHTML = txt;
    return null;
}

// fonction de lance de l'algorithme génétique
function lance() {
    // récupère les valeurs du formulaire
    getFormValues();

    // affiche le nombre d'appel à la fonction fitness
    fitnessCalls();
    displayCalls();

    // initialisation de la population vide
    generation = 0;
    population = [];
    
    // création de la population
    for (var i = 0; i < populationSize; i++) {
        population.push(new Individu());
    }
    
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });

    /*
    displayBest();
    displayGeneration();
    nextGeneration();
    */
//    alert('trié');
    affichePopulation();
    afficheResultat();
}   
