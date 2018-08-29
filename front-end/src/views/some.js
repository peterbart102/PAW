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

        const row = this.getList(loadedData);
        return {cols: [row], margin: 50}
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
            template: `<b class='editTabName' id="list-${loadedData.listId}">some text</b>`,
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

            $$(event.target.id).removeView(this)
            $$(event.target.id).addView(
                {view: "text", id: `editName-${event.target.id}`},
                0)
            const editName = $$(`editName-${event.target.id}`);
            editName.focus()
            const handleSaveTab = function (e) {
                console.log(e)
                console.log(this)
                $$(event.target.id).removeView(this)
                $$(event.target.id).addView(that.getListTitle(loadedData), 0)
            };
            editName.attachEvent("onEnter", handleSaveTab)
            editName.attachEvent("onBlur", handleSaveTab)
            return false;
        };
    }
}
