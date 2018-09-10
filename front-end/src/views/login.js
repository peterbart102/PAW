import 'webix'
import {JetView} from "webix-jet";


export default class LoginView extends JetView {

    incorrect = false;

    config() {

        const authService = this.app.getService('auth');
        const that = this
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
                        onItemClick: function () {
                            const formValues = $$('login').getValues();
                            console.log(formValues.login);
                            console.log(formValues.password);
                            (authService.login(formValues.login, formValues.password)).then(()=> {
                                    if (!that.incorrect) {
                                        const loginView = $$('login');
                                        loginView.config.height = 215;
                                        loginView.resize();
                                        loginView.addView(
                                            {
                                                view: "template",
                                                type: {height: 100},
                                                height: 45,
                                                template: "<p>Nieprawidłowy mail lub hasło</p>"
                                            })
                                        that.incorrect = true
                                    }
                                }
                            )
                        }
                    }
                }
            ]
        };
    }

    init(view, url) {
    };
}