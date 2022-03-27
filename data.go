package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

//Artists struct
type Artists []struct {
	ID           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Locations    string   `json:"locations"`
	ConcertDates string   `json:"concertDates"`
	Relations    string   `json:"relations"`
}

//Locations struct
type Locations struct {
	Index []struct {
		ID        int      `json:"id"`
		Locations []string `json:"locations"`
		Dat       string   `json:"dates"`
	} `json:"index"`
}

//Dates struct
type Dates struct {
	Index []struct {
		ID  int      `json:"id"`
		Dat []string `json:"dates"`
	} `json:"index"`
}

//Relation struct
type Relation struct {
	Index []struct {
		ID      int                 `json:"id"`
		DatLocs map[string][]string `json:"datesLocations"`
	} `json:"index"`
}

//API struct
type API struct {
	Id        int
	Artists   Artists
	Locations Locations
	Dates     Dates
	Relation  Relation
}

var data API

func GetAPI() {
	urlAPI := map[interface{}]string{&data.Artists: "https://groupietrackers.herokuapp.com/api/artists", &data.Locations: "https://groupietrackers.herokuapp.com/api/locations", &data.Dates: "https://groupietrackers.herokuapp.com/api/dates", &data.Relation: "https://groupietrackers.herokuapp.com/api/relation"}
	for interf, url := range urlAPI {
		res, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}
		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			log.Fatal(err)
		}
		json.Unmarshal(body, interf)
	}
}
