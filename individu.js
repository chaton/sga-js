// définition des individus

// taille d'un individu
var individuSize = 10;

// définition du génotype
function randomGenotype() {
    var genotype = [];
    for (var i = 0; i < individuSize; i++) {
        genotype[i] = Math.round(Math.random());
    }
    return genotype;
}

// function decodeGenotype : convertie en entier un génotype
function decodeGenotype(genotype) {
    var x = 0;
    for (var i = 0; i < individuSize; i++) {
        x += genotype[i] * Math.pow(2, i);
    }
    return x;
}

// fonction fitness : fonction à optimiser
function fitness(x) {
    return x * x;
}


// defini un individu avec un génotype et un phénotype
function Individu() {
    this.genotype = [];
    this.phenotype = [];
    this.fitness = 0;
    this.genotype = randomGenotype();
    this.phenotype = decodeGenotype(this.genotype);
    this.fitness = fitness(this.phenotype);
}
