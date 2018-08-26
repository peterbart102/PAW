import 'webix'
import Cookies from 'js-cookie'
import {JetView} from "webix-jet";


export default class SomeView extends JetView {
    config() {
        console.log("asdasdad");
        const dane_01 = [
            {id: 1, zad1: "The Shawshank Redemption_01"},
            {id: 2, zad1: "The Godfather_01"},
            {id: 3, zad1: "The Godfather: Part II_01"},
            {id: 4, zad1: "Pulp fiction_01"}

        ];
        return {
            container: "login",
            cols: [
                {
                    view: "datatable",
                    id: "dtable1",
                    drag: true,
                    scrollY: false,
                    scrollX: false,
                    columns: [{id: "zad1", header: "Zadanie_01", width: 300}],
                    data: dane_01

                },
                {
                    view: "datatable",
                    id: "dtable2",
                    drag: true,
                    scrollY: false,
                    scrollX: false,
                    columns: [{id: "zad1", header: "Zadanie_02", width: 300}],
                }
            ]
        };
    }


    init(view, url) {
    };
}