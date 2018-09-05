import 'webix'
import {JetView} from "webix-jet";

import Cookies from 'js-cookie'


export default class SomeView extends JetView {
    config() {
        return webix.ajax().headers({
            "Authorization": `Bearer ${Cookies.get("access_token")}`
        }).get("http://localhost:9000/auth/board/123").then((e) => {
            console.log("herbatka");
            console.log(e.json());
            return {cols: e.json().tasksList.map(task => this.getList(task)), margin: 50}
        });
    }

    getList(loadedData) {
        const addItemId = `add-item-${loadedData.id}`;
        return {
            id: `list-${loadedData.id}`,
            rows: [
                this.getListTitle(loadedData),
                this.getTasksList(loadedData),
                {
                    cols: [
                        {
                            id: addItemId,
                            view: "text",
                        },
                        {
                            view: "button",
                            width: 50,
                            value: "Dodaj",
                            click: (e) => {
                                const addItem = $$(addItemId);
                                const addItemValue = addItem.getValue();
                                addItem.setValue("");
                                const tasks = $$(`list-tasks-${loadedData.id}`);
                                tasks.add({"title": addItemValue}, tasks.count())
                                console.log(`calling http://localhost:9000/auth/board/123/addItem/ with ${addItemValue}`)
                            }
                        }
                    ]
                }
            ]
        };
    }

    getTasksList(loadedData) {
        return {
            id: `list-tasks-${loadedData.id}`,
            view: "list",
            template: "<div><b>#title#</b>#id#<!--<p>#userName#</p>--></div>",
            type: {
                height: "auto", width: 250
            },
            select: true, drag: true,
            data: loadedData.cards,
            on: {
                onAfterDrop: (context, e) => {
                    console.log(context.start)
                    console.log(e)
                }
            }
        };
    }

    getListTitle(loadedData) {
        return {
            id: `list-title-${loadedData.id}`,
            view: "template",
            template: `<b class='editTabName' id="list-${loadedData.id}">${loadedData.title}</b>`,
            type: "header",
            editable: true,
            onClick: {
                "editTabName": this.getEditTabName(loadedData)
            }
        };
    }

    getEditTabName(loadedData) {
        const that = this;
        return function (event) {
            const listId = event.target.id;
            const selectedList = $$(listId);
            const editNameId = `editName-${listId}`;
            selectedList.removeView(this)
            selectedList.addView({view: "text", id: editNameId, value: loadedData.title}, 0)
            const editName = $$(editNameId);
            that.setFocusToTheEnd(editName);
            const handleSaveTab = function (e) {
                const newTabName = editName.getValue();
                //TODO: save this new tab to the DB
                selectedList.removeView(editName)
                const loadedDataWithNewTabName = {...loadedData, title: newTabName};
                selectedList.addView(that.getListTitle(loadedDataWithNewTabName), 0)
            };
            editName.attachEvent("onEnter", handleSaveTab)
            editName.attachEvent("onBlur", handleSaveTab)
            return false;
        };
    }

    setFocusToTheEnd(editName) {
        webix.html.setSelectionRange(editName.getInputNode(), editName.getValue().length);
        editName.focus()
    }
}
