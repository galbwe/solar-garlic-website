package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var templates = template.Must(template.ParseFiles(
	"templates/index.html",
))

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s", r.Method, r.URL.Path)

	err := templates.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func AssetsHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("GET %v", r.URL.Path)
	assets := "assets"
	vars := mux.Vars(r)
	log.Printf("vars: %v", vars)
	http.FileServer(http.Dir(assets)).ServeHTTP(w, r)
}

func main() {
	log.Print("Server listening on port 8080 ...")
	router := mux.NewRouter()

	// index handler
	router.HandleFunc("/", HomeHandler)

	// static assets handler
	fs := http.FileServer(http.Dir("./assets/"))
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", fs))

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", router))
}
