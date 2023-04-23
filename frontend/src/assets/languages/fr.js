export const language_fr = {
    pages: {
        dashboard: {
            h1: "Tableau de bord",
            titles: {
                toSee: "À voir",
                alreadySeen: "Déjà vus",
                favorites: "Favoris",
                myReviews: "Mes critiques",
            },
            sideNav: {
                toSee: {
                    primary: "À voir",
                    secondary: "Total : ",
                },
                seen: {
                    primary: "Déjà vus",
                    secondary: "Total : ",
                },
                favorites: {
                    primary: "Favoris",
                    secondary: "Total : ",
                },
            },
            errorMessage: "Impossible d'afficher les données.",
        },
        error404: {
            h1: "Page introuvable.",
            backHomeLink: "Revenir à l'accueil",
        },
        home: {
            h1: "Explorer",
            filters: {
                year: {
                    label: "Période",
                },
                genre: {
                    label: "Genres",
                },
                clearFiltersButton: "Aucun filtre",
            },
            numberOfResults: {
                label: "Nombre de résultats :",
                available: "max. disponibles",
            },
            resultsLanguageLabel: "Langue des résultats :",
            pagination: {
                previous: "Page préc.",
                next: "Page suiv.",
            },
            errorMessage: "Impossible d'afficher les données.",
        },
        login: {
            h1: "Connexion",
            buttons: {
                submit: "Se connecter",
            },
            redirect: {
                question: "Pas encore inscrit ?",
                link: "Créer un compte",
            },
        },
        movie: {
            budget: "Budget :",
            revenue: "Recettes :",
            unavailable: "non-disponible",
            imdbLink: "Voir sur IMDB",
            seen: "J'ai vu ce film !",
            toSee: "Je veux voir ce film !",
        },
        person: {
            titles: {
                filmography: "Filmographie",
                director: {
                    male: "Réalisateur",
                    female: "Réalisatrice",
                },
                actor: {
                    male: "Acteur",
                    female: "Actrice",
                },
            },
            wikiLink: "Voir sur Wikipédia",
        },
        profile: {
            h1: "Mon profil :",
            buttons: {
                showForm: "Modifier les informations",
                submit: "Enregistrer les modififcations",
            },
            updateValidation: "Informations mises à jour.",
            errorMessage: "Impossible de modifier les données.",
        },
        register: {
            h1: "Créer un compte",
            buttons: {
                submit: "S'enregistrer",
            },
            redirect: {
                question: "Déjà membre ?",
                link: "Se connecter",
            },
        },
    },
    components: {
        addToFavorites: {
            add: "Ajouter aux favoris",
            remove: "Retirer des favoris",
        },
        movieCard: {
            actorsWith: "Avec",
        },
        formFields: {
            labels: {
                username: "Nom d'utilisateur",
                password: "Mot de passe",
                passwordConfirm: "Confirmation du mot de passe",
                email: "Adresse e-mail",
                firstName: "Prénom",
                lastName: "Nom",
            },
            placeholders: {
                username: "Votre nom d'utilisateur",
                password: "Votre mot de passe",
                passwordConfirm: "Confirmez votre mot de passe",
                email: "Votre adresse e-mail",
                firstName: "Votre prénom",
                lastName: "Votre nom",
            },
        },
        userMenu: {
            profile: "Profil",
            logOut: "Déconnexion",
        },
    },
    layout: {
        footer: {
            usedAPI: "API externes utilisées :",
            sourceCode: "Code source :",
        },
    },
};
