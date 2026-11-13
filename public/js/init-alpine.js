function data() {
  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem("dark")) {
      return JSON.parse(window.localStorage.getItem("dark"));
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem("dark", value);
  }

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark;
      setThemeToLocalStorage(this.dark);
    },
    isSideMenuOpen: false,
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
    },
    isNotificationsMenuOpen: false,
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    },
    closeNotificationsMenu() {
      this.isNotificationsMenuOpen = false;
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    isPagesMenuOpen: false,
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen;
    },
    isPagesReligionOpen: false,
    togglePagesReligion() {
      this.isPagesReligionOpen = !this.isPagesReligionOpen;
    },
    isPagesStalkerOpen: false,
    togglePagesStalker() {
      this.isPagesStalkerOpen = !this.isPagesStalkerOpen;
    },
    isPagesMakerOpen: false,
    togglePagesMaker() {
      this.isPagesMakerOpen = !this.isPagesMakerOpen;
    },
    isPagesPhotooxyOpen: false,
    togglePagesPhotooxy() {
      this.isPagesPhotooxyOpen = !this.isPagesPhotooxyOpen;
    },
    isPagesEphotoOpen: false,
    togglePagesEphoto() {
      this.isPagesEphotoOpen = !this.isPagesEphotoOpen;
    },
    isPagesTextproOpen: false,
    togglePagesTextpro() {
      this.isPagesTextproOpen = !this.isPagesTextproOpen;
    },
    isPagesFunOpen: false,
    togglePagesFun() {
      this.isPagesFunOpen = !this.isPagesFunOpen;
    },
    isPagesWibuOpen: false,
    togglePagesWibu() {
      this.isPagesWibuOpen = !this.isPagesWibuOpen;
    },
    isPagesRandomOpen: false,
    togglePagesRandom() {
      this.isPagesRandomOpen = !this.isPagesRandomOpen;
    },
    isPagesSearchingOpen: false,
    togglePagesSearching() {
      this.isPagesSearchingOpen = !this.isPagesSearchingOpen;
    },
    isPagesMoviesOpen: false,
    togglePagesMovies() {
      this.isPagesMoviesOpen = !this.isPagesMoviesOpen;
    },
    isPagesPrimbonOpen: false,
    togglePagesPrimbon() {
      this.isPagesPrimbonOpen = !this.isPagesPrimbonOpen;
    },
    isPagesInfoOpen: false,
    togglePagesInfo() {
      this.isPagesInfoOpen = !this.isPagesInfoOpen;
    },
    isPagesConvertOpen: false,
    togglePagesConvert() {
      this.isPagesConvertOpen = !this.isPagesConvertOpen;
    },
    isPagesToolsOpen: false,
    togglePagesTools() {
      this.isPagesToolsOpen = !this.isPagesToolsOpen;
    },
    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      this.isModalOpen = true;
      this.trapCleanup = focusTrap(document.querySelector("#modal"));
    },
    closeModal() {
      this.isModalOpen = false;
      this.trapCleanup();
    },
  };
}
