package main

import (
	"log"
	"net/http"
	"text/template"

	"github.com/gorilla/mux"
)


var templates = template.Must(template.ParseFiles("templates/index.html"))


func renderTemplate(w http.ResponseWriter, tmpl string) {
	err := templates.ExecuteTemplate(w, tmpl+".html", nil)
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

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "index")
}

func main() {
	log.Print("Server listening on port 8080 ...")
	router := mux.NewRouter()

	// static assets handler
	fs := http.FileServer(http.Dir("./assets/"))
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", fs))

	// page handlers
	router.HandleFunc("/", IndexHandler)


	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", router))
}
