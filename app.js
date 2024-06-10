// Importer les modules requis
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

// Créer une application Express
const app = express();
const port = 4000;

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Se connecter à la base de données MongoDB en utilisant l'URI de connexion
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connexion à MongoDB réussie !');

    // Définir un schéma pour la personne
    const personSchema = new mongoose.Schema({
        nom: { type: String, required: true },
        age: { type: Number, min: 0 },
        favoriteFoods: { type: [String] }
    });

    // Créer un modèle pour la personne
    const Person = mongoose.model('Person', personSchema);
    const person = new Person({
        nom: 'Osman',
        age: 25,
        favoriteFoods: ['Pizza', 'Tacos']
    });

    // Sauvegarder une nouvelle personne dans la base de données
    person.save()
    .then(() => {
        console.log('Personne enregistrée avec succès !');
    })
    .catch(() => {
        console.log('Echec de l\'enregistrement de la personne !');
    });

    // Créer plusieurs personnes avec Model.create()
    const arrayOfPeople = [
        { nom: 'Mamadou', age: 30, favoriteFoods: ['Burger', 'Tacos'] },
        { nom: 'Moussa', age: 35, favoriteFoods: ['Pizza', 'Burger'] }
    ];

    Person.create(arrayOfPeople)
    .then(() => {
        console.log('Personnes enregistrées avec succès !');
    })
    .catch(() => {
        console.log('Echec de l\'enregistrement des personnes !');
    });

    // Rechercher toutes les personnes ayant un prénom
    Person.find({ nom: 'Osman' })
    .then((person) => {
        console.log(person);
    })
    .catch(() => {
        console.log('Aucune personne trouvée !');
    });

    // Trouver une seule personne qui a un certain aliment dans ses favoris
    Person.findOne({ favoriteFoods: 'Pizza' })
    .then((person) => {
        console.log(person);
    })
    .catch(() => {
        console.log('Aucune personne trouvée !');
    });

    // Trouver la (seule !!) personne ayant un _id donné
    Person.findById('60f0d4d4d5d3c33f3c7f9b4b')
    .then((person) => {
        console.log(person);
    })
    .catch(() => {
        console.log('Aucune personne trouvée !');
    });

    // Rechercher une personne par _id et mettre à jour sa liste d'aliments préférés
    Person.findById('60f0d4d4d5d3c33f3c7f9b4b')
    .then((person) => {
        person.favoriteFoods.push('Hamburger');
        person.save()
        .then(() => {
            console.log('Personne mise à jour avec succès !');
        })
        .catch(() => {
            console.log('Echec de la mise à jour de la personne !');
        });
    })
    .catch(() => {
        console.log('Aucune personne trouvée pour mettre à jour !');
    });

    //Recherchez une personne par nom et définissez son âge sur 20. Utilisez le paramètre de fonction personName comme clé de rechercheVous devez renvoyer le document mis à jour. Pour ce faire, vous devez transmettre le document d'options { new: true } comme troisième argument à findOneAndUpdate(). Par défaut, ces méthodes renvoient l'objet non modifié.
Person.findOneAndUpdate({ nom: 'Osman' }, { age: 20 }, { new: true })
.then((person) => {
    console.log(person);
})
.catch(() => {
    console.log('Aucune personne trouvée !');
});

    // Démarrer le serveur Express
    app.listen(port, () => {
        console.log(`Serveur en écoute sur le port ${port}`);
    });
})
.catch(() => {
    console.log('Connexion à MongoDB échouée !');
});

