export const LANGUAGE_FR = {
    global: {
        noData: "non-disponible",
    },
    navigation: {
        explore: "Explorer",
        login: "Connexion",
        register: "Créer un compte",
        dashboard: "Mon tableau de bord",
        profile: "Mon profil",
        logout: "Déconnexion",
    },
    pages: {
        dashboard: {
            h1: "Tableau de bord",

            errorMessage: "Impossible d'afficher les données.",
        },
        error404: {
            h1: "Page introuvable.",
            backHomeLink: "Revenir à l'accueil",
        },
        home: {
            h1: "Explorer",
            searchButton: "Recherche par titre",
            numberOfResults: {
                label: "Nombre de résultats :",
                available: "max. disponibles",
            },
            errorMessage: "Impossible d'afficher les données.",
        },
        login: {
            h1: "Connexion",
        },
        movie: {
            h1: "",
        },
        person: {
            birth: "Naissance :",
            death: "Mort :",
            filmography: "Filmographie",
            director: {
                male: "Réalisateur",
                female: "Réalisatrice",
            },
            actor: {
                male: "Acteur",
                female: "Actrice",
            },
            writer: "Scénariste",
        },
        profile: {
            h1: "Mon profil",
            username: "Nom d'utilisateur",
            email: `Adresse e${(<span>&#8209;</span>)}mail`,
            firstName: "Prénom",
            lastName: "Nom",
            update: {
                label: "Modifier les informations",
                submit: "Enregistrer",
                validation: "Profil mis à jour.",
            },
            delete: {
                label: "Supprimer le compte",
            },
            updateValidation: "profil mis à jour.",
            errorMessage: "Impossible de modifier les données.",
        },
        register: {
            h1: "Créer un compte",
        },
    },
    components: {
        branding: {
            tagline: "20 ans de magie hollywoodienne",
        },
        dashboardTabs: {
            primary: {
                toSee: "À voir",
                seen: "Déjà vus",
                favorites: "Favoris",
            },
            secondary: "Total :",
        },
        deleteAccountDialog: {
            title: "Êtes-vous sûr de vouloir supprimer votre compte ?",
            description:
                "Toutes les informations qui y sont attachées seront supprimées. Cette opération est irréversible.",
            confirm: "Supprimer le compte",
            cancel: "Annuler",
            errors: {
                impossible:
                    "Une erreur s'est produite, suppression impossible.",
                forbidden:
                    "Vous ne pouvez pas supprimer le compte de démonstration de l'application.",
            },
        },

        errorBoundary: {
            pages: {
                all: "Quelque chose s'est mal passé.",
                home: "Aïe ! Impossible d'afficher les films.",
                movie: "Aïe ! Impossible d'afficher les données du film.",
                dashboard: "Aïe ! Impossible d'afficher les données.",
                profile: "Aïe ! Impossible d'afficher les données du profil.",
                person: "Aïe ! Impossible d'afficher les données de la personne.",
                default: "Quelque chose s'est mal passé.",
            },
            refreshLink: "Essayer de rafraîchir la page",
            backHomeLink: "Revenir à l'accueil",
        },
        filterGenre: {
            label: "Genres",
        },
        filterYear: {
            label: "Période",
        },
        filtersHome: {
            noneActive: "Aucun filtre actif",
            clearFilters: "Supprimer les filtres",
        },
        imdbLink: "Voir sur IMDB",
        inputEmail: "Adresse e-mail",
        inputPassword: "Mot de passe",
        inputPasswordConfirm: "Confirmez votre mot de passe",
        inputFirstName: "Prénom",
        inputLastName: "Nom",
        inputUsername: "Nom d'utilisateur",
        language: "Langue :",
        loggedOnlyDialog: {
            title: "Fonctionnalité réservée aux membres",
            description:
                "Cette fonctionnalité est réservée aux utilisateurs connectés.",
            redirect: {
                question: "Pas encore inscrit ?",
                link: "Créer un compte",
            },
            confirm: "Se connecter",
            cancel: "Annuler",
        },
        loginForm: {
            demo: {
                description: "Pour tester l'application sans s'inscrire :",
                label: "Utilisateur démo",
            },
            submit: "Se connecter",
            redirect: {
                question: "Pas encore inscrit ?",
                link: "Créer un compte",
            },
        },
        loginDialog: {
            title: "Connexion",
        },
        movieBudget: "Budget :",
        movieCard: {
            starTitle: "Ce film fait partie de vos favoris",
        },
        movieCastAndCrew: {
            from: "De",
            with: "Avec",
            writtenBy: "Écrit par",
        },
        movieRevenue: "Recettes :",
        registerDialog: {
            title: "Créer un compte",
        },
        registerForm: {
            submit: "Créer le compte",
            redirect: {
                question: "Déjà inscrit ?",
                link: "Se connecter",
            },
        },
        searchMovieDialog: {
            title: "Chercher un titre de film",
            result: "résultat",
            plural: "résultats",
            noResult: "Aucun résultat.",
        },
        toggleFavorite: {
            add: "Ajouter aux favoris",
            remove: "Retirer des favoris",
        },
        toggleMovieSeen: "J'ai vu ce film !",
        toggleMovieToSee: "Je veux le voir !",
        userAvatarUpdateDialog: {
            title: "Votre avatar",
            choose: "Choisir une image",
            remove: "Supprimer l'image",
            maxSize: "taille maximale :",
            unit: "Mo",
            error: "La taille du fichier ne doit pas dépasser",
        },
        wikiLink: "Voir sur Wikipédia",
    },

    layout: {
        footer: {
            usedAPI: "API externes utilisées :",
            sourceCode: "Code source :",
        },
    },
};
