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
var sumFitness = 0;
var NbCross = 0;

// variable pour l'analyse
var nbMutation = 0;
var nbMutationLocus =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


// fonction pour récuperer les valeurs des inputs
function getFormValues() {
    populationSize = parseInt(document.getElementById("populationSize").value);
    mutationRate = parseFloat(document.getElementById("mutationRate").value);
    crossoverRate = parseFloat(document.getElementById("crossoverRate").value);
    maxGeneration = parseInt(document.getElementById("maxGenerations").value);

}

// fonction pour valider les valeurs du formulaire et calculer les variables induites
function validationForm() {
        // validation des valeurs et calcul des variables induites
        if (populationSize < 2) {
            alert("La taille de la population doit être supérieure à 1");
            exit(0);
            return;
        }
        if (mutationRate < 0 || mutationRate > 1) {
            alert("Le taux de mutation doit être compris entre 0 et 1");
            exit(0);
            return;
        }
        if (crossoverRate < 0 || crossoverRate > 1) {
            alert("Le taux de crossover doit être compris entre 0 et 1");
            exit(0);
            return;
        }
        if (maxGeneration < 1) {
            alert("Le nombre de générations doit être supérieur à 0");
            exit(0);
            return;
        }
    
        // calcul du nombre d'itérations de la fonction de crossover
        NbCross = populationSize * crossoverRate;
        NbCross = Math.round(NbCross/2); // on veut un nombre pair de nouveaux individus (2 par crossover)
    
        if (NbCross < 2) {
            alert("Le taux de crossover est trop faible pour créer une nouvelle population");
            exit(0);
            return;
        }
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
    populationSize = population.length;
    // console.log("Taille de la population " + populationSize);
    // console.log("---  " + population);

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

// Mécanique Génétique

// fonction pour créer la population initiale
function createPopulation() {
     for (var i = 0; i < populationSize; i++) {
        population.push(new Individu());
    }
}

// fonction de crossover
function crossover(parentA, parentB) {
    var child1 = new Individu();
    var child2 = new Individu();

    var crossoverPoint = Math.floor(Math.random() * individuSize); // Point de croisement aléatoire

    for (var i = 0; i < individuSize; i++) {
        if (i < crossoverPoint) {
            child1.genotype[i] = parentA.genotype[i];
            child2.genotype[i] = parentB.genotype[i];
        } else {
            child1.genotype[i] = parentB.genotype[i];
            child2.genotype[i] = parentA.genotype[i];
        }
    }


    // console.log("Crossover result " + child1.genotype + " " + child2.genotype);
    return [child1, child2];
}

// fonction de mutation
function mutate(indiv) {
    for (var i = 0; i < individuSize; i++) {
        if (Math.random() < mutationRate) {
            indiv.genotype[i] = 1 - indiv.genotype[i];
            nbMutation++;
            nbMutationLocus[i]++;
            console.log("Mutation " + nbMutation + " au locus " + i + " " + indiv.genotype + "\nrépartition des mutations " + nbMutationLocus );
        }
    }
    return indiv;
}


// fonction de sélection d'un parent
function selectParent() {
    var index = 0;
    var r = Math.random();
    while (r > 0) {
        r -= population[index].fitness / sumFitness;
        index++;
    }
    index--;
    return population[index];
}

// fonction de lance de l'algorithme génétique
function lance() {
    // récupère les valeurs du formulaire
    getFormValues();

    validationForm();

    // affiche le nombre d'appel à la fonction fitness
    fitnessCalls();
    displayCalls();

    // initialisation de la population vide
    generation = 0;
    population = [];
    
    createPopulation();
    
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });

// Main genetic algorithm loop
while (generation < maxGeneration) { //maxGeneration 
    var newPopulation = [];

    // Perform selection, crossover, and mutation
    // calcule la somme des fitness
    sumFitness = 0;
    for (var i = 0; i < populationSize; i++) {
        sumFitness += population[i].fitness;
    }

    for (var i = 0; i < NbCross; i++) {
        var parentA = selectParent();
        var parentB = selectParent();

        var child = crossover(parentA, parentB);
        var nbChild = child.length;
        if (nbChild != 2) {
            alert("Erreur dans la fonction de crossover");
            exit(0);
            return;
        }
        var child1 = child[0];
        var child2 = child[1];

        // Mutation

        child1 = mutate(child1);
        child2 = mutate(child2);        
        
        child1.phenotype = decodeGenotype(child1.genotype);
        child1.fitness = fitness(child1.phenotype);
        child2.phenotype = decodeGenotype(child2.genotype);
        child2.fitness = fitness(child2.phenotype);

        newPopulation.push(child1);
        newPopulation.push(child2);
    }

    // Add the remaining individuals to the new population
    for (var i = 0; i < populationSize - (2*NbCross); i++) {
        var indivSaved = selectParent();
        newPopulation.push(indivSaved);
    }

    // Replace the old population with the new population
    population = newPopulation;
    // debug
    affichePopulation();

    // Sort the population by fitness
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });

    // Increment the generation counter
    generation++;
}
  
    /*
    displayBest();
    displayGeneration();
    nextGeneration();
    */
//    alert('trié');
    affichePopulation();
    afficheResultat();
}   
