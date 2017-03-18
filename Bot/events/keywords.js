let table =
    {
	"Telephone": [
	    "Telephone", "telephone", "Phone", "Service Client", "Service client"
	],
	"Adresse": [
	    "Adresse&nbsp;: ", "Adresse", "adresse", "adress", "Adresse&nbsp:", "Adresse&nbsp:&nbsp"
	],
	"Ville": [
	    "Ville", "ville", "city", "City"
	],
	"Pays": [
	    "Pays", "pays"
	],
	"SIRET": [
	    "SIRET", "SIRET (siege)"
	],
	"Code postal": [
	    "Code postal", "Code Postal", "ZIP", "zip", "code postal"
	],
	"Creation": [
	    "Creation&nbsp:", "Creation&nbsp:", "creation", "Creation", "Date de création entreprise"
	],
	"Nom": [
	    "Nom", "Dénomination"
	],
	"Capital social": [
	    "Capital Social", "Capital social"
	],
	"SIREN": [
	    "SIREN", "Siren"
	],
	"NIC": [
	    "NIC", "Nic", "N° d'établissement (NIC)"
	],
	"Type": [
	    "Nature de l'établissement", "Type"
	],
	"Taille": [
	    "Taille de l'unité urbaine", "Taille"
	],
	"Categorie": [
	    "Categorie", "Nature de l'établissement"
	],
	"Description": [
	    "Libellé du code APE", "Description"
	]
    };

module.exports = {
	assoc: table,

	validProperty: function(name) {
		for(let i = 0; i < Object.keys(table).length; i++) {
			let key = Object.keys(table)[i];
			let value = table[key];
			
			for(let j = 0; j < value.length; j++) {
				if (value[j] == name)
					return (key);
			}
		}
		return (undefined);
	},
    accent_fold: (function () {
	var accent_map = {
	    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
	    'ç': 'c',                                                   // c
	    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
	    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
	    'ñ': 'n',                                                   // n
	    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
	    'ß': 's',                                                   // s
	    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
	    'ÿ': 'y'                                                    // y
	};

	return function accent_fold(s) {
	    if (!s) { return ''; }
	    var ret = '';
	    for (var i = 0; i < s.length; i++) {
		ret += accent_map[s.charAt(i)] || s.charAt(i);
	    }
	    return ret;
	};
    }()),
    capitalize: function(s)
    {
	return s && s[0].toUpperCase() + s.slice(1);
    }
}

