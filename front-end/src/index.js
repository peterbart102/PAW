import 'webix'
import Cookies from 'js-cookie'

const loginCallback = (text, data) => {
    const dataJson = data.json();
    if (dataJson.failed) {
        console.log("login failed")
    } else {
        console.log("success");
        Cookies.set('access_token', dataJson.access_token, {expires: dataJson.expires_in});
    }
};
webix.ui({
    id: "login",
    view: "form",
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
                    webix.ajax().post("http://localhost:9000/auth/token", {
                        "email": formValues.login,
                        "password": formValues.password
                    }, loginCallback);
                }
            }
        }
    ]
});