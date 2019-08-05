
class Dialog {
    constructor(element, width, height) {
        this.dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,

        })
    }
    // Hàm thực hiện mở dialog
    openDialog() {
        this.dialog.dialog("open");
    }

    //Hàm thực hiện đóng dialog
    closeDialog() {
        this.dialog.dialog("close");
    }

    //hàm thực hiện sửa title cho dialog
    setTitleDialog(title) {
        this.dialog.dialog({
            title: title
        })
    }

    //Hàm thực hiện việc kiểm tra đóng mở dialog
    isOpen() {
        return this.dialog.dialog("isOpen");
    }

    //hiển thị dialog thêm mới
    ShowDialogAddNewRef() {
        dialogEdit.setTitleDialog("Thêm mới phiếu nhập hàng");
        var dlgAddNewRef = dialogEdit.dialog.attr("class", "dialog-content ui-dialog-content ui-widget-content");
        dlgAddNewRef.addClass("AddNewForm");
       
    }

    //hiển thi dialog sửa
    ShowDialogEdit() {
        dialogEdit.setTitleDialog("Sửa phiếu nhập hàng");
        var dlgEdit = dialogEdit.dialog.attr("class", "dialog-content ui-dialog-content ui-widget-content");
        dlgEdit.addClass("FormEdit");
    }

    ShowDialogDuplicate() {
        dialogEdit.setTitleDialog("Nhân bản phiếu nhập hàng");
        var dlgEdit = dialogEdit.dialog.attr("class", "dialog-content ui-dialog-content ui-widget-content");
        dlgEdit.addClass("FormDuplicate");
    }

}

var dialogEdit = new Dialog(".dialog-content", 1000, 720);
