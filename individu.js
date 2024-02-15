// définition des individus

// taille d'un individu

var geneStructure = [4,3,3];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
var individuSize = geneStructure.reduce(reducer, 0);

// définition du génotype
function randomGenotype() {
    var genotype = [];
    for (var i = 0; i < individuSize; i++) {
        genotype[i] = Math.round(Math.random());
    }
    return genotype;
}

// fonction decodeGene : convertie en entier un gène
function decodeGene(gene) {
    var x = 0;
    for (var i = 0; i < gene.length; i++) {
        x += gene[i] * Math.pow(2, i);
    }
    return x;
}

// function decodeGenotype : convertie en entier un génotype
function decodeGenotype(genotype) {
    var x = [];
    var offset = 0;
    var genNumber = geneStructure.length;
    console.log(genNumber);

    for (var i = 0; i < genNumber; i++) {
        var geneSize = geneStructure[i];
        console.log(geneSize);

        var gene = genotype.slice(offset, offset + geneSize);
        console.log(gene);
        x.push(decodeGene(gene));
        offset += geneSize;
    }
    return x;
}

// fonction fitness : fonction à optimiser
function fitness(x) {
    return x[0] * x[1] + x[2];
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
