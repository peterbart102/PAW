import 'webix'
import Cookies from 'js-cookie'
import {JetView} from "webix-jet";


export default class LoginView extends JetView {
    config() {

        const authService = this.app.getService('auth');

        return {
            id: "login",
            view: "form",
            css: 'loginForm',
            width: 400,
            height: 170,
            elements: [
                {
                    view: "text",
                    label: "<b>E-mail</b>",
                    name: "login",
                    value: "rafal@ot.com"
                },
                {
                    view: "text",
                    label: "<b>Password</b>",
                    type: "password",
                    name: "password",
                    value: "123456"
                },
                {
                    view: "button",
                    value: "Zaloguj",
                    on: {
                        onItemClick: () => {
                            const formValues = $$('login').getValues();
                            console.log(formValues.login);
                            console.log(formValues.password);
                            authService.login(formValues.login, formValues.password);
                            this.app.show("/some");
                        }
                    }
                }
            ]
        };
    }

    init(view, url) {
    };
}