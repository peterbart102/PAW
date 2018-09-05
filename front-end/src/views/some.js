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
            return {cols: [this.getList(e.json())], margin: 50}
        });
    }

    getList(loadedData) {
        const addItemId = `add-item-${loadedData.listId}`;
        return {
            id: `list-${loadedData.listId}`,
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
                                loadedData.tasksList.push({"title":"asds"})

                                const tasks = $$(`list-tasks-${loadedData.listId}`);
                                tasks.add({"title":addItemValue}, tasks.count())
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
            id: `list-tasks-${loadedData.listId}`,
            view: "list",
            template: "<div><b>#title#</b><!--<p>#userName#</p>--></div>",
            type: {
                height: "auto", width: 250
            },
            select: true, drag: true,
            data: loadedData.tasksList,
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
            id: `list-title-${loadedData.listId}`,
            view: "template",
            template: `<b class='editTabName' id="list-${loadedData.listId}">${loadedData.listName}</b>`,
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
            selectedList.addView({view: "text", id: editNameId, value: loadedData.listName}, 0)
            const editName = $$(editNameId);
            that.setFocusToTheEnd(editName);
            const handleSaveTab = function (e) {
                const newTabName = editName.getValue();
                //TODO: save this new tab to the DB
                selectedList.removeView(editName)
                const loadedDataWithNewTabName = {...loadedData, listName: newTabName};
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
