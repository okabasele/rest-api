package main

import (
	"html/template"
	"log"
	"net/http"
	"strconv"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	var t *template.Template
	var id, err = strconv.Atoi(r.URL.Path[1:])
	if r.URL.Path[0] == '/' {
		if len(r.URL.Path) == 1 {
			t = template.Must(template.ParseFiles("./assets/templates/home.html"))
			t.Execute(w, data)

		} else if len(r.URL.Path) > 1 && len(r.URL.Path) <= 3 {
			if (id <= 0 || id > 52) && err != nil {
				http.Error(w, "Not Found", http.StatusNotFound)
				return
			} else {
				t = template.Must(template.ParseFiles("./assets/templates/artist.html"))
				data.Id = id - 1
				t.Execute(w, data)
			}
		}
	}
}

func handleRequests() {
	fs := http.FileServer(http.Dir("./assets/"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))
	http.HandleFunc("/", Handler)
	log.Fatal(http.ListenAndServe(":10000", nil)) // setting listening port
}
