
import 'webix'
import {JetApp, UrlRouter} from "webix-jet";
import {authModel} from "./models/authModel";
import {auth} from "./plugins/auth";

webix.ready(() => {
    const app = new JetApp({
        id: "asdf",
        version: "1.0",
        start: "/login"
    });

    webix.ready(() => app.render() );   // mandatory!
    app.use(auth, {model: new authModel()});

    app.attachEvent("app:error:resolve", function (name, error) {
         window.console.error(error);
     });
});