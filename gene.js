// définition de la notion de gène

function Gene(bmin, bmax, precision ) {

    this.bmin = bmin;
    this.bmax = bmax;
    this.precision = precision;
    this.size = Math.ceil(Math.log2((bmax - bmin) / precision));
    // console.log("taille du gene " + this.size + " min " + this.bmin + " max " + this.bmax + " precision " + this.precision + " nb digit " + Math.log2((bmax - bmin) / precision));

    // fonction de décodage
    this.decode = function(bits) {
        
        var entier = binaireToInt(bits);
        var x = this.bmin + entier * (this.bmax - this.bmin) / (Math.pow(2, this.size) - 1);
        return x;
    }
    
}

// fonction decodeGene : convertie un nombre binaire en entier
function binaireToInt(gene) {
    var x = 0;
    for (var i = 0; i < gene.length; i++) {
        x += gene[i] * Math.pow(2, i);
    }
    return x;
}
