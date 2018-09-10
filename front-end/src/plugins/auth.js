export function auth(app, view, config) {

    const authModel = config.model;
    const login = config.login || "/login";
    const logout = config.logout || "/logout";
    const afterLogin = "/some" //config.afterLogin || app.config.start;
    const afterLogout = config.afterLogout || "/login";
    const ping = config.ping || 5 * 60 * 1000;

    let credentials = null;

    const service = {

        getUser() {
            return credentials;
        },

        getStatus(server) {
            if (!server) {
                return credentials !== null;
            }
            return authModel.status().catch(() => null).then(data => {
                credentials = data;
            });
        },

        async login(name, pass) {
            const promise = authModel.login(name, pass)
            promise.then((data) => {
                credentials = data;
                console.log("data")
                console.log(data)
                if (!data.failed) {
                    app.show(afterLogin);
                }
            });
            return promise;
        },

        logout() {
            credentials = null;
            authModel.logout();
            //app.show(afterLogout);
        }
    };

    function canNavigate(url, obj) {

        if (url === logout) {
            service.logout();
            obj.redirect = afterLogout;
            app.show(afterLogout);
        } else if (url !== login && !service.getStatus()) {
            obj.redirect = login;
            app.show(login);
        }
    }

    app.setService("auth", service);

    app.attachEvent(`app:guard`, function (url, _$root, obj) {
        console.log(url);
        console.log(_$root);
        console.log(obj);
        console.log(credentials);
        if (credentials === null) {
            obj.confirm = service.getStatus(true).then(any => {
                canNavigate(url, obj);
            });
        } else {
            canNavigate(url, obj);
        }
    });

    if (ping) {
        setInterval(() => service.getStatus(true), ping);
    }

    canNavigate(app.$router.get(), {});
}