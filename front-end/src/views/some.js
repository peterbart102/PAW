import 'webix'
import {JetView} from "webix-jet";


export default class SomeView extends JetView {
    config() {
        const loadedData = {
            listId: 123,
            listName: "some text",
            tasksList: Array(5).fill().map((v, i) => {
                return {/*id: "task-" + i, */title: "Do something" + i, userName: "SuperHero123"}
            })
        }

        const loadedData2 = {
            listId: 1234,
            listName: "some text2",
            tasksList: Array(5).fill().map((v, i) => {
                return {/*id: "task-" + i, */title: "Do something" + i, userName: "SuperHero123"}
            })
        }

        return {cols: [this.getList(loadedData), this.getList(loadedData2)], margin: 50}
    }

    getList(loadedData) {
        return {
            id: `list-${loadedData.listId}`,
            rows: [
                this.getListTitle(loadedData),
                this.getTasksList(loadedData.tasksList)
            ]
        };
    }

    getTasksList(tasksList) {
        return {
            view: "list",
            template: "<div><b>#title#</b><p>#userName#</p></div>",
            type: {
                height: "auto", width: 250
            },
            select: true, drag: true,
            data: tasksList,
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
                const loadedDataWithNewTabName = {...loadedData,listName:newTabName};
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
