export const LANGUAGE_EN = {
    global: {
        noData: "no data",
    },
    navigation: {
        explore: "Explore",
        login: "Log in",
        register: "Register",
        dashboard: "My dashboard",
        profile: "My profile",
        logout: "Log out",
    },
    pages: {
        dashboard: {
            h1: "Dashboard",

            errorMessage: "Unable to display data.",
        },
        error404: {
            h1: "Page not found.",
            backHomeLink: "Back to home page",
        },
        home: {
            h1: "Explore",
            searchButton: "Find a title",
            numberOfResults: {
                label: "Number of results:",
                available: "max. available",
            },
            errorMessage: "Unable to display data.",
        },
        login: {
            h1: "Log in",
        },
        movie: {
            h1: "",
        },
        person: {
            birth: "Naissance :",
            death: "Mort :",
            filmography: "Filmography",
            director: {
                male: "Director",
                female: "Director",
            },
            actor: {
                male: "Actor",
                female: "Actress",
            },
            writer: "Writer",
        },
        profile: {
            h1: "My profile",
            username: "Username",
            email: "Email",
            firstName: "First name",
            lastName: "Last name",
            update: {
                label: "Update",
                submit: "Save changes",
                validation: "Profile updated.",
            },
            delete: {
                label: "Delete account",
            },
            updateValidation: "Profile updated.",
            errorMessage: "Unable to update profile.",
        },
        register: {
            h1: "Register",
        },
    },
    components: {
        branding: {
            tagline: "20 years of Hollywood magic",
        },
        dashboardTabs: {
            primary: {
                toSee: "To see",
                seen: "Already seen",
                favorites: "Favorites",
            },
            secondary: "Total:",
        },
        deleteAccountDialog: {
            title: "Are you sure you want to delete your account?",
            description:
                "All the data linked to this account will be deleted. This operation cannot be reversed.",
            confirm: "Delete account",
            cancel: "Cancel",
            errors: {
                impossible: "An error occurred, deletion impossible.",
                forbidden: "You cannot delete the app demo account.",
            },
        },
        errorBoundary: {
            pages: {
                all: "Something went wrong.",
                home: "Ouch ! Unable to display movies.",
                movie: "Ouch ! Unable to display movie data.",
                dashboard: "Ouch ! Unable to display data.",
                profile: "Ouch ! Unable to display profile data.",
                person: "Ouch ! Unable to display person's data.",
                default: "Something went wrong.",
            },
            refreshLink: "Try to refresh the page",
            backHomeLink: "Back to home page",
        },
        filterGenre: {
            label: "Genres",
        },
        filterYear: {
            label: "Period",
        },
        filtersHome: {
            noneActive: "No active filter",
            clearFilters: "Clear filters",
        },
        inputPassword: "Password",
        inputPasswordConfirm: "Password confirmation",
        inputEmail: "E-mail address",
        inputFirstName: "First name",
        inputLastName: "Last name",
        inputUsername: "Username",
        imdbLink: "See on IMDB",
        language: "Language:",
        loggedOnlyDialog: {
            title: "Members only",
            description: "Only logged users have access to this feature.",
            redirect: {
                question: "Not a member yet?",
                link: "Register",
            },
            confirm: "Log in",
            cancel: "Cancel",
        },
        loginForm: {
            demo: {
                description: "To test the app without signing up:",
                label: "Demo user",
            },
            submit: "Log in",
            redirect: {
                question: "Not a member yet?",
                link: "Register",
            },
        },
        loginDialog: {
            title: "Log in",
        },
        movieBudget: "Budget:",
        movieCard: {
            starTitle: "This movie is one of your favorites",
        },
        movieCastAndCrew: {
            from: "From",
            with: "With",
            writtenBy: "Written by",
        },
        movieRevenue: "Revenue:",
        registerDialog: {
            title: "Create an account",
        },
        registerForm: {
            submit: "Register",
            redirect: {
                question: "Already a member?",
                link: "Log in",
            },
        },
        searchMovieDialog: {
            title: "Find a movie by its title",
            result: "result",
            plural: "results",
            noResult: "No result.",
        },
        favorites: {},
        toggleFavorite: {
            add: "Add to favorites",
            remove: "Remove from favorites",
        },
        toggleMovieSeen: "I've seen this movie!",
        toggleMovieToSee: "I want to see it!",
        userAvatarUpdateDialog: {
            title: "Your avatar",
            choose: "Choose a picture",
            remove: "Remove the picture",
            maxSize: "maximum size:",
            unit: "MB",
            errors: {
                size: "File's size must not exceed",
                imgBBKey: "ImgBB API key could not be retrieved.",
                imgBBUpload: "Upload on ImgBB server failed.",
                update: "User update failed.",
                global: "Something went wrong.",
            },
        },
        wikiLink: "See on Wikipedia",
    },
    layout: {
        footer: {
            usedAPI: "Used external APIs:",
            sourceCode: "Source code:",
        },
    },
};
