//Khởi tạo class Base
$(document).ready(function () {
    // khai báo class base
    base = new Base();
    var ref = {
        Columns: [],
        Filters: [],
        RecordCount: 50,
        Page: 1,
        OrderBy: "RefNo DESC"
    };
    base.CallAjaxLoad(ref);

});
//class tổng chửa các phương thức chung nhất cho trang
class Base {
    constructor() {
        this.InitEvents();
        //this.LoadData();
        //this.LoadDataItem();
        this.LoadDataObjectDetails();
        this.TimeNow();
        this.DateNow();
        this.LoadDataObjectMini();
        this.LoadDataObjectMini2();
        this.LoadDataObjectMini3();
        this.LoadStock();


    }
    //Chứa các sự kiện
    InitEvents() {
        $('.table-details-height,.table-table,.dialog-chonnhacungcap-content-des').on('mouseup', '.table-details,tr,.dialog-chonnhacungcap-content-des-element', this.RowItemOnClick);
        $(document).on("click", "#dialog-insert,.insert", this.ShowDialogInsert);
        $(".dialog-watch").on("click", ".insert", this.CloseDialoguWatch);
        $(".dialog-buy").on("click", ".insert", this.CloseDialogBuy);
        $(".dialog-watch, .dialog-buy").on("click", ".delete", this.ShowDialogAlertDelete);
        $(document).on("click", "#dialog-edit", this.ShowDialogBuy);
        $(document).on("click", "#dialog-duplicate", this.ShowDialogDupliCate);
        $(document).on("click", "#get-data", this.FilterDate);
        $(document).on("click", "#load", this.EmptyLoadData);
        $(".dialog-nhacungcap").on("click", "#open-group-nhacungcap1", this.ShowDialogGroupNhacungcap);
        $(".dialog-nhacungcap").on("click", "#open-group-nhacungcap2", this.ShowDialogGroupNhacungcap);
        $(".dialog-content").on("click", '#dialog-content-details-choise2', this.DialogInsert_RadioButton);
        $(document).on("click", "#dialog-content-icon-plus1", this.ShowDialogNhacungcap);
        $(".dialog-nhacungcap").on("click", "#dialog-nhacungcap-choise2", this.DialogNhacungcap_RadioButton);
        $(".dialog-content").on("click", "#icon-quicksearch1, #icon-quicksearch2", this.ShowChonNhaCungCap);
        $(document).on("click", "#dialog-watch", this.ShowDialogWatch);
        $(document).on("click", "#dialog-content-icon-plus2", this.ShowDialogNvmuahang);
        $(".dialog-nvmuahang").on("click", ".allow", this.ShowTabMenu_ThoiGianTruyCap);
        $(".dialog-nvmuahang").on("click", ".icon-check-time", this.ChoiseTime_Thoigiantruycap);
        $(".dialog-nvmuahang").on("click", ".img2", this.Radio_DialogNvmnuahang_Tabmenu1);
        $(".dialog-nvmuahang").on("click", ".tabmenu-nvmuahang-header-element", this.TabMenu_DialogNvmuahang);
        $("#dialog-delete").on("click", this.CheckRowDelete);
        $(".dialog-delete").on("click", "#close-dialog-delete", this.CloseDialog);
        $(".dialog-delete").on("click", "#delete-dialog", this.Deletes);
        $(document).on("blur", "[required]", this.ValidateRequired);
        $(document).on("click", ".toggle-nhacungcap-content-element2", this.HideToggleTabMenu);
        $(document).on("click", ".FormEdit .Save", this.Update);
        $(document).on("click", ".FormDuplicate .Save", this.Duplicate);
        $(document).on("click", ".AddNewForm  .Save", this.CheckValueDialogInsert);
        $(".dialog-content").on("click", "#close-dialog-content", this.ShowDialogAlertClose);
        $(".dialog-warning").on("click", ".Save", this.CloseDialogWarning);
        $(".dialog-warning2").on("click", ".Save", this.CloseDialogWarning2);
        $(".table-details-height").on("dblclick", ".link", this.Dbclick);
        $(".dialog-close").on("click", "#close-dialog-delete1", this.CloseDialogClose);
        $(".dialog-close").on("click", ".button-dialog-not-save", this.CloseAllDialog);
        $(".dialog-group").on("click", ".button-cancel", this.CloseDialogGroupnhacungcap);
        $(".dialog-nhacungcap").on("click", ".button-cancel", this.CloseDialogNhacungcap);
        $(".dialog-chonnhacungcap").on("click", ".button-cancel", this.CloseDialogChonnhacungcap);
        $(".dialog-nvmuahang").on("click", ".button-cancel", this.CloseDialogNvmuahang);
        $(".dialog-watch").on("click", "#close-dialog-watch", this.CloseDialoguWatch);
        $(".dialog-buy").on("click", "#close-dialog-buy", this.ShowDialogAlertClose);
        $(document).on('blur', '.ip-last', this.onJumpToNextOrFirst);
        $('.dialog-content').on('click', ".Savee", this.ShowdialogWaring);
        $('.dialog-content').on('click', ".Savee", this.ShowdialogWaring2);
        $.key('ctrl+1', this.ShowDialogInsert);
        $.key('ctrl+d', this.ShowDialogAlertDelete);
        $(document).on('mouseover', ".error", this.onShowRequiredError);
        $(document).on('mouseout', ".error", this.onHideRequiredError);
        $(document).on("keyup", "[filter]", function myfunction(e) {
            if (e.keyCode == 13 || e.keyCode==9) {
                base.SelectPaging();
            }
        })
        $(document).on("input", ".current-money", this.FomartCurrency);

        $(this.ShowMenuContext());
        $(document).tooltip({

            show: { duration: 400 },
            track: true
        });
        $('#focus1').focus(function () {
            $('.button-help').focus();
        });
        $('#focus2').focus(function () {
            $('.code').focus();
        });
        $("#focus5,#focus4").focus(function () {

            $('#focus3').focus();
        });
        $("#focus-tabindex2").focus(function () {
            $("#focus-tabindex1").focus();
        });
        $(".dialog-content").on("change keyup", "[notnull]", this.ValidateDialog);
        $(".dialog-content").on("blur", "[notnull]", this.ReturnValue);
        $(".dialog-content, .dialog-buy").on("click", ".dialog-footer-td-element-special", this.TabMenuClick);
        $(".dialog-content, .dialog-buy").on("focus", ".dialog-footer-td-element-special", this.TabMenuFocus);
        $(".dialog-content, .dialog-buy").on("blur", ".dialog-footer-td-element-special", this.TabMenuBlur);
        $(".dialog-content").on("change", ".revalue", this.ReValue);
        $(".dialog-content").on("change", ".coculator", this.Coculator);
        $(".dialog-content").on("click", ".remove-row", this.RemoveGridRow);
        $(".dialog-close1").on("click", ".no", this.CloseDialogClose1);
        $(document).on("keyup", ".AddNewForm .clear-value, .clear-value", this.ClearValue);
        $(document).on("keyup", ".AddNewForm .clear-value, .clear-value1", this.ClearValue1);
        $(document).on("click", ".pagination-value", this.SelectPaging);
        $(document).on("click", ".pagination1", this.SelectPaging);
        $(document).on("click", ".pagination2", this.SelectPaging);
        $(document).on("click", ".pagination3", this.SelectPaging);
        $(document).on("click", ".pagination4", this.SelectPaging);
    }
    /// Xóa trắng value
    ClearValue(e) {

        if (e.key == 'Backspace') {
            $(this).parents(".dialog-content-details-info-input").find(".clear-value").val("")
            $(this).removeAttr("valuencc");
        }
    }

    ClearValue1(e) {

        if (e.key == 'Backspace') {
            $(this).parents(".dialog-content-details-info-input").find(".clear-value1").val("")
            $(this).removeAttr("valuenv");
        }
    }

    //Xóa 1 hàng trong grid table
    RemoveGridRow() {

        var not = $(".dialog-footer-td").last();

        var v = $(this).parents(".dialog-footer-td")
        if (v[0] == not[0]) {

        }
        else {

            $(this).parents(".dialog-footer-td").remove();
        }
    }
    //Tính toán trong grid Table
    Coculator() {


        var discountRate = $(this).parents(".dialog-footer-td").find("[fielditemname2='DiscountRate']").val(); //% CK
        var discountAmount = $(this).parents(".dialog-footer-td").find("[fielditemname2='DiscountAmount']").text(); //Tiền CK
        var vatRate = $(this).parents(".dialog-footer-td").find("[fielditemname2='VATRate']").val(); // Thuế suất
        var vatAmount = $(this).parents(".dialog-footer-td").find("[fielditemname2='VATAmount']").text(); // Tiền thuế
        var unitPrice = $(this).parents(".dialog-footer-td").find("[fielditemname1='CostPrice']").val(); // đơn giá
        var quantity = $(this).parents(".dialog-footer-td").find("[fielditemname2='Quantity']").val(); // Số lượng
        var amount = $(this).parents(".dialog-footer-td").find("[fielditemname2='Amount']").val() //Thành tiền
        var payAmount = $(this).parents(".dialog-footer-td").find("[fielditemname2='PayAmount']").text() //Tiền thanh toán



        //Thành tiền = Số lượng * Đơn giá
        var valueAmount = quantity * ParseMonneyToNumber(unitPrice);
        $(this).parents(".dialog-footer-td").find("[fielditemname2='Amount']").val((lamtronso(valueAmount)).formatMoney());


     
        //Tiền CK = Thành tiền * %CK
        var valueDiscountAmount = ParseMonneyToNumber(amount) * (discountRate / 100);
        $(this).parents(".dialog-footer-td").find("[fielditemname2='DiscountAmount']").text((lamtronso(valueDiscountAmount)).formatMoney());


        //Tiền thuế = (Thành tiền – Tiền CK) x Thuế suất
        var valueVATAmount = (ParseMonneyToNumber(amount) - ParseMonneyToNumber(discountAmount)) * (parseInt(vatRate)/ 100);
        $(this).parents(".dialog-footer-td").find("[fielditemname2='VATAmount']").text(lamtronso(valueVATAmount).formatMoney());


        //Tiền thanh toán = Thành tiền – Tiền CK + Tiền thuế
       
        var valuePayAmount = parseInt(valueAmount) - ParseMonneyToNumber(discountAmount) + ParseMonneyToNumber(vatAmount);
        $(this).parents(".dialog-footer-td").find("[fielditemname2='PayAmount']").text(lamtronso(valuePayAmount).formatMoney());




    }
    //Trả về giá trị rỗng
    ReValue() {
        $(this).val("");
    }

    //Formart value money
    FomartCurrency() {
        $(this).val($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    }

    //Kiếm tra value của dialog insert xem đã nhập đủ trường chưa
    CheckValueDialogInsert() {
        if ($(".item1").val() === "") {
            base.ShowdialogWaring();
        }
        else if ($(".item0").val() === "") {
            base.ShowdialogWaring2();
        }
        else {
            base.Save();
        }
    }

    //Show dialog warning khi chưa nhập đủ trường
    ShowdialogWaring() {
        $(".dialog-warning").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "MShopKeepper",
            position: {
                my: "center",
                at: "center",
                of: ".dialog-content",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });

    }
    ShowdialogWaring2() {
        $(".dialog-warning2").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "MShopKeepper",
            position: {
                my: "center",
                at: "center",
                of: ".dialog-content",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });

    }

    /**
  * Hàm xử lý tabindex trong tabmenu
  * Created by: NHTHAI (30/05/2019)
  * */
    onJumpToNextOrFirst(event) {
        var parent = $(this).parents('.dialog-footer-td');

        var next = parent.next();
        if (next.length > 0) {
            // $('.dialog-footer-content').scrollLeft(0);
            next.find('.ip-first').focus();
        } else {
            var first = parent.find('.ip-first').focus();
        }

    }

    /**
 * Hàm xử ẩn toggle chọn item trong tabmenu
 * Created by: NHTHAI (30/05/2019)
 * */
    HideToggleTabMenu() {
 
        var child1 = $(this).attr("skuCode");
        var that = $(".flex-menu").data("inventory");
        $(that).parents(".dialog-footer-td").attr("inventoryItemCode", child1);
        $(".toggle-nhacungcap2").data("code", $(this).attr("skuCode"));

        //$(".toggle-stock-content-element").trigger("click");
        base.GetItem();

        $(".toggle-nhacungcap2").hide();
    }

    /**
  * Các hàm xử lý ẩn hiện tabmenu
  * Created by: NHTHAI (12/06/2019)
  * */
    TabMenuClick() {
        $(".addrow").addClass("normal").parent().addClass("normal")
        $(".addrow1").addClass("normal")
        $(this).find("input").removeClass("normal").addClass("hidden").parent().removeClass("normal");
        $(this).find("#focus-tabindex1").attr("placeholder", "Tìm mã hoặc tên");
        $(".dialog-footer-td-element").addClass("rowtabmenu");
        $(this).removeClass("rowtabmenu");
        if ($(this).children().hasClass("hidden")) {
            $(this).children().removeClass("hidden");
        }
        var a = $(this).children()[0];

        $(a).focus();
    }
    TabMenuFocus() {
        $(".addrow").addClass("normal").parent().addClass("normal")
        $(this).find("input").removeClass("normal").addClass("hidden").parent().removeClass("normal");
        $(this).find("#focus-tabindex1").attr("placeholder", "Tìm mã hoặc tên");
        $(".dialog-footer-td-element").addClass("rowtabmenu");
        $(this).removeClass("rowtabmenu");
        if ($(this).children().hasClass("hidden")) {
            $(this).children().removeClass("hidden");

        }

        var a = $(this).children()[0];
    }
    TabMenuBlur() {

        var row = `
                       <div class="dialog-footer-td">

                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">

                            <input fielditemname1="SKUCode" class="hidden ip-first item0" type="text" name="tabmenuinput" id="focus-tabindex1" value=""
                                   placeholder="Tìm mã hoặc tên" />
                            <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                            <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                            <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                        </div>

                        <div class="dialog-footer-td-element noclick"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName"></span></div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                            <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue" type="text"
                                   value="" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                            <input fielditemname1="UnitName" class="addrow1 text-right revalue" type="text"
                                   value="" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                        </div>

                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="Quantity" class=" text-right addrow number coculator" value="0" type="number" name="name" min="0" onkeypress='validate(event)' />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator" value="0" type="text" onkeypress='validate(event)'
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="Amount" class=" text-right addrow number current-money coculator" value="0" type="text"
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="DiscountRate" class=" text-right addrow coculator" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                   name="name" min="0" />
                        </div>
                        <div class="dialog-footer-td-element text-right " style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">0</div></div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="VATRate" class=" text-right addrow ip-last coculator" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px">
                            <div fielditemname2="VATAmount" style="border:none" data-type="number">0</div>
                        </div>
                        <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">0</div></div>
                        <div class="icon-tabmenu">
                            <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                            <div class="text-center icon-tabmenu-element remove-row"><i class="fas fa-trash" style="color:red"></i></div>
                        </div>
                    </div>
`


        //var row = $('.d-none.footer-td').html()


        $(this).children().addClass("hidden");
        $(this).find("#focus-tabindex1").removeAttr("placeholder", "Tìm mã hoặc tên");
        $(this).find("input").removeClass("hidden").addClass("normal").parent().addClass("normal")
        //var amount = $(this).parent().find("[fielditemname1='Amount']").val();
        //var payamount = $(this).parent().find("[fielditemname1 = 'PayAmount']").val();
        var value = $(this).find(".number").val();
        if (value > 0) {
            if ($(this).parents(".dialog-footer-td").next().hasClass("dialog-footer-td")) {
            }
            else {
                $(this).parents(".appendShow1").last().append(row);
            }
        }

    }





    /**
  * Hàm xử lý icon load khi load trang
  * Created by: NHTHAI (30/05/2019)
  * */
    IconLoad() {
        $(".load").delay(1300).fadeOut("fast");
    }

    /**EmptyLoadData
  * Hàm xử lý lấy ngày giờ hiện tại
  * Created by: NHTHAI (04/06/2019)
  * */
    TimeNow() {
        var time = new Date();
        var timenow = time.getHours() + ":" + time.getMinutes();
        $(".time-value").data("time-value", timenow);
        $(".timepicker").val(timenow);
    }
    DateNow() {
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear()
        $(".datepicker").val(output);
        $(".date-value").data("date-value", output);
    }


    //hàm Showmenucontext
    ShowMenuContext() {
        var me = this;

        $.contextMenu({

            selector: '.table-details-height',
            callback: function (key, options) {
                var m = key;
                if (key === "add") {

                    me.ShowDialogInsert();
                }
                if (key === "delete") {
                    me.ShowDialogAlertDelete();
                }
                if (key === "watch") {
                    me.ShowDialogWatch();
                }
                if (key === "edit") {
                    me.ShowDialogBuy();
                }
                if (key === "edit") {
                    me.EmptyLoadData();
                }
            },
            items: {
                "add": { name: "Thêm", icon: "add" },
                "duplicate": { name: "Nhân bản", icon: "copy" },
                "watch": { name: "Xem", icon: "fas fa-eye" },
                "edit": { name: "Sửa", icon: "edit" },
                "delete": { name: "Xóa", icon: "delete" },
                "load": { name: "Nạp", icon: "fas fa-sync-alt" }
                //"quit": {
                //    name: "Quit", icon: function () {
                //        return 'context-menu-icon context-menu-icon-quit';
                //    }
                //}
            }
        });

        $(".table-details-height").on('click', function (e) {

        });

    }

    //hàm đóng dialog Closes
    CloseDialog() {
        $(".dialog-delete").dialog("close");
    }
    CloseDialogClose() {

        $(".dialog-close").dialog("close");
    }
    CloseAllDialog() {
        $('.form_id').trigger("reset").find("INPUT").val("");
        base.GetLastId();
        base.TimeNow();
        base.DateNow();
        $('.dialog-close').dialog("close");
        $(".dialog-content").dialog("close");
    }
    CloseDialogGroupnhacungcap() {

        $(".dialog-group").dialog("close");
    }
    CloseDialogNhacungcap() {
        $(".dialog-nhacungcap").dialog("close");
    }
    CloseDialogChonnhacungcap() {
        $(".dialog-chonnhacungcap").dialog("close");
    }
    CloseDialogNvmuahang() {
        $(".dialog-nvmuahang").dialog("close");
    }
    CloseDialoguWatch() {
        $(".dialog-watch").dialog("close");
    }
    CloseDialogBuy() {
        $(".dialog-buy").dialog("close");
    }
    CloseDialogWarning() {
        $(".dialog-warning").dialog("close")
    }
    CloseDialogWarning2() {
        $(".dialog-warning2").dialog("close")
    }
    CloseDialogClose1() {
        $(".dialog-close1").dialog("close")
    }



    //db click hiện ra dialog insert trong table menu chính
    Dbclick() {

        base.ShowDialogWatch();

    }


    ///filter theo ngày
    FilterDate() {
        $(".load").show();
        var data = [];
        var total = 0;
        $(".table-details-height").empty();
        var startdate1 = $("#start-date").val();
        var enddate1 = $("#end-date").val();
        var startdate = moment(startdate1, "DD/MM/YYYY")._d;
        var enddate = moment(enddate1, "DD/MM/YYYY")._d;
        var data = [];
        data.push(startdate);
        data.push(enddate);

        $.ajax({
            method: 'POST',
            url: '/Refs/listrefbyDate',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset="utf-8"'
        }).done(function (res) {

            data = res.Data;
            var fields = $("[fieldName]");

            $.each(data, function (index, item) {
                var rowHTML = $('<div data-id="' + item.RefID + '" class="table-details"></div>');


                $.each(fields, function (i, fieldItem) {
                    var fieldName = fieldItem.getAttribute('fieldName');



                    var value = '';
                    var cls = 'text-align-left';

                    if (fieldName) {
                        value = item[fieldName];

                        if (fieldName === "RefNo") {
                            var clss = 'link';
                        }

                        if (fieldName === "TotalAmount") {
                            total = total + value;
                        }
                        if (fieldName === "RefDate") {
                            value = new Date(value);
                        }
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }
                        // Thực hiện định dạng dữ liệu hiển thị tương ứng:
                        if (!value)
                            value = '';

                        rowHTML = rowHTML.append('<div class="{2} {1}">{0}</div>'.format(value, cls, clss));

                    }
                    else {
                        rowHTML = rowHTML.append(' <div  class="text-center "><img class="check-img" src="/Content/nhthai/Img/uncheck.png" /></div>');
                    }

                });
                $("strong").text(total.formatMoney());
                $('.table-details-height').append(rowHTML);
                setTimeout(function () {
                    $(".load").hide();
                },1000)   




            });

            $('.table-details').eq(0).addClass('row-selected').trigger("mouseup");

        });
    }




    /**
     * Hàm xử lý khi nhấn chuột vào row item và load dữ liệu của item đó
     * Created by: NHTHAI (11/05/2019)
     * */
    RowItemOnClick() {
        var quantity = 0;
        var amount = 0;
        var discountrate = 0;
        var vatamount = 0;
        var payamount = 0;
        // hightlight dòng đang chọn:
        $('.table-details,tr,.dialog-chonnhacungcap-content-des-element').removeClass('row-selected');
        $(this).addClass('row-selected');
        var idEm = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/InventoryItems/itemdetails/" + idEm
        }).done(function (res) {
            res = res.Data;
            var tbody = $(".tbody-tbody");
            tbody.empty();


            if (res && res.length > 0) {

              
                $.each(res, function (index, item) {
                    quantity = quantity + item.Quantity;
                    amount = amount + item.Amount;
                    discountrate = discountrate + item.DiscountRate;
                    vatamount = vatamount + item.VATAmount;
                    payamount = payamount + item.PayAmount;
                    var RowHTML = $('<tr>' +
                        '<td>' + item["SKUCode"] + '</td>' +
                        '<td>' + item["InventoryItemName"] + '</td>' +
                        '<td>' + item["StockName"] + '</td>' +
                        '<td>' + item["UnitName"] + '</td>' +
                        '<td class="text-right">' + item["Quantity"] + '</td>' +
                        '<td class="text-right">' + (lamtronso(item["CostPrice"]).formatMoney()) + '</td>' +
                        '<td class="text-right">' + (lamtronso(item["Amount"]).formatMoney()) + '</td>' +
                        '<td class="text-right">' + (lamtronso(item["DiscountRate"]).formatMoney()) + '</td>' +
                        '<td class="text-right">' + (item["DiscountAmount"]).formatMoney() + '</td>' +
                        '<td class="text-right">' + (item["VATRate"]).formatMoney() + '</td>' +
                        '<td class="text-right">' + (item["VATAmount"]).formatMoney() + '</td>' +
                        '<td class="text-right">' + (item["PayAmount"]).formatMoney() + '</td>' +
                        '</tr>');
                    tbody.append(RowHTML);
                })
                $("[total-footer= Quantity] ").text("Tổng số lượng: " + quantity);
                $("[total-footer= Amount] ").text("Tổng thành tiền: " + amount.formatMoney());
                $("[total-footer= DiscountRate] ").text("Tiền CK: " + discountrate);
                $("[total-footer= VATAmount] ").text("Tiền thuế: " + vatamount.formatMoney());
                $("[total-footer= PayAmount] ").text("Tổng thành tiền: " + payamount.formatMoney());

            }

        });


    }

    /**
     * Hàm xử lý lấy giữ liệu từ api vào form sửa
     * Created by: NHTHAI (11/05/2019)
     * */
    LoadDataFix() {

        var code = $(".row-selected").attr("data-code");
        var fixName = $("")
        $.ajax({
            method: "GET",
            url: "/Refs/managerShop/" + code
        }).done(function (res) {


            $("[fixName='Code']").val(res["Code"]);
            $("[fixName='AccountObjectName']").val(res["AccountObjectName"]);
            $("[fixName='JournalMemo']").val(res["JournalMemo"]);
            $("[fixName='EmployeeName']").val(res["EmployeeName"]);
            $("[fixName='RefNo']").val(res["RefNo"]);


        })

    }



    /**
 * Hàm hiển thị dữ liệu dialog watch
 * Created by: NHTHAI (28/05/2019)
 * */
    GetDataInDialogShow() {

        var data = $(".row-selected").attr("data-id");

        $.ajax({

            method: 'GET',
            url: '/Refs/managerShop/' + data,
            async: false,

        }).done(function (res) {
            res = res.Data;
            $('.appendShow').empty();
            var timeDB = res.RefDate;
            $("[data-1]").val(res.VendorCode);
            $("[data-2]").val(res.VendorName);
            $("[data-3]").val(res.ContactName);
            $("[data-4]").val(res.JournalMemo);
            $("[data-5]").val(res.EmployeeCode);
            $("[data-6]").val(res.EmployeeName);
            $("[data-7]").val(res.RefNo);
            $("[data-8]").val((timeDB.substring(0, 10)).formatDate1());
            $("[data-9]").val(timeDB.substring(11, 16));

            var refDetails = [];
            $.ajax({

                method: 'GET',
                url: '/InventoryItems/itemdetails/' + data,

            }).done(function (res) {
                refDetails = res.Data;

                var fields = $("[WatchData]");

                $.each(refDetails, function (index, item) {
                    var rowHTML = $('<div class="dialog-footer-td not"></div>');

                    $.each(fields, function (i, fieldItem) {
                        var fieldName = fieldItem.getAttribute('WatchData');

                        var value = '';
                        var cls = 'text-align-left';

                        if (fieldName) {
                            value = item[fieldName];
                            var dataType = $.type(value);

                            if (fieldName === "CostPrice" || fieldName === "Quantity" || fieldName === "UnitPrice" || fieldName === "Amount" || fieldName === "DiscountRate" || fieldName === "DiscountAmount" || fieldName === "VATRate" || fieldName === "VATAmount" || fieldName === "PayAmount") {
                                value = lamtronso(parseInt(value));
                                var clss = 'text-right';

                            }

                            switch (dataType) {

                                case "number":
                                    // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                    value = value.formatMoney();
                                    cls = 'text-align-right';
                                    break;
                                case "date":

                                    // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                    value = value.formatddMMyyyy();
                                    cls = 'text-align-center';
                                    break;
                                default:

                                    break;
                            }
                            // Thực hiện định dạng dữ liệu hiển thị tương ứng:
                            if (!value) {
                                value = '';
                            }

                            rowHTML = rowHTML.append('<div style="padding-left:4px;padding-right:4px;text-overflow: ellipsis;overflow: hidden;" class="{1}">{0}</div>'.format(value, clss));
                        }
                        else {

                            var abc = ` <div class="icon-tabmenu">
                                <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                                <div class="text-center icon-tabmenu-element"><i class="fas fa-trash" style="color:red"></i></div>
                            </div>`
                            rowHTML = rowHTML.append(abc);
                        }
                    });
                    $('.appendShow').append(rowHTML);
                });
            });
        });
    }




    /**
* Hàm hiển thị dữ liệu dialog watch
* Created by: NHTHAI (28/05/2019)
* */
    GetDataInDialogShow1() {

        var data = $(".row-selected").attr("data-id");

        $.ajax({

            method: 'GET',
            url: '/Refs/managerShop/' + data,
            async: false,

        }).done(function (res) {
            res = res.Data;
            $('.appendShow').empty();
            var timeDB = res.RefDate;
            $("[data-1]").val(res.VendorCode);
            $("[data-2]").val(res.VendorName);
            $("[data-3]").val(res.ContactName);
            $("[data-4]").val(res.JournalMemo);
            $("[data-5]").val(res.EmployeeCode);
            $("[data-6]").val(res.EmployeeName);
            $("[data-7]").val(res.RefNo);
            $("[data-8]").val((timeDB.substring(0, 10)).formatDate1());
            $("[data-9]").val(timeDB.substring(11, 16));
            $("[data-9]").attr("data-refID", res.RefID);
            $(".codestaff").attr('valuenv', res.EmployeeID);
            $(".item1").attr('valuencc', res.VendorID);

            var refDetails = [];
            $.ajax({
                method: 'GET',
                url: '/InventoryItems/itemdetails/' + data,

            }).done(function (res) {
                refDetails = res.Data;

                var fields = $("[WatchData1]");

                $.each(refDetails, function (index, item) {
                    var rowHTML = $('<div class="dialog-footer-td"  inventoryitemcode = ' + item.InventoryItemID + ' stockid=' + item.StockID + ' data-ref-detail=' + item.RefDetailID + '></div>');

                    $.each(fields, function (i, fieldItem) {
                        var fieldName = fieldItem.getAttribute('WatchData1');

                        var value = '';
                        var cls = 'text-align-left';

                        if (fieldName) {
                            value = item[fieldName];
                            var dataType = $.type(value);
                            if (fieldName === "SKUCode") {
                                rowHTML = rowHTML.append(` <div class="dialog-footer-td-element dialog-footer-td-element-special normal">

                                <input fielditemname1="SKUCode" class="ip-first item0 normal" type="text" name="tabmenuinput" id="focus-tabindex1" value="{0}"
                                       placeholder="Tìm mã hoặc tên" />
                                <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                                <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                                <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                            </div>`.format(value));
                            }

                            if (fieldName === "InventoryItemName") {
                                rowHTML = rowHTML.append(`<div class="dialog-footer-td-element noclick rowtabmenu"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName">{0}</span></div>`.format(value));
                            }
                            if (fieldName === "StockName") {
                                rowHTML = rowHTML.append(`  <div class="dialog-footer-td-element dialog-footer-td-element-special rowtabmenu">
                                <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue normal" type="text"
                                       value="{0}" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>`.format(value));
                            }
                            if (fieldName === "UnitName") {
                                rowHTML = rowHTML.append(`  <div class="dialog-footer-td-element dialog-footer-td-element-special rowtabmenu">
                                <input fielditemname1="UnitName" class="addrow1 text-right revalue normal" type="text"
                                       value="{0}" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>`.format(value))
                            }
                            if (fieldName === "Quantity") {
                                rowHTML = rowHTML.append(` <div class="dialog-footer-td-element dialog-footer-td-element-special normal rowtabmenu">
                                <input fielditemname2="Quantity" class="text-right addrow number coculator define normal" value="{0}" type="number" name="name" min="0" onkeypress='validate(event)' />
                            </div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "CostPrice") {
                                rowHTML = rowHTML.append(` <div class="dialog-footer-td-element dialog-footer-td-element-special normal rowtabmenu">
                                <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator define normal" value="{0}" type="text" onkeypress='validate(event)'
                                       name="name" />
                            </div>`.format(value.formatMoney()))
                            }

                            if (fieldName === "Amount") {
                                rowHTML = rowHTML.append(` <div class="dialog-footer-td-element dialog-footer-td-element-special normal rowtabmenu">
                                <input fielditemname2="Amount" class="text-right addrow number current-money coculator define normal" value="{0}" type="text"
                                       name="name" />
                            </div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "DiscountRate") {
                                rowHTML = rowHTML.append(`  <div class="dialog-footer-td-element dialog-footer-td-element-special normal rowtabmenu">
                                <input fielditemname2="DiscountRate" class="text-right addrow coculator define normal" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="{0}" type="number"
                                       name="name" min="0" />
                            </div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "DiscountAmount") {
                                rowHTML = rowHTML.append(`<div class="dialog-footer-td-element text-right rowtabmenu" style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">{0}</div></div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "VATRate") {
                                rowHTML = rowHTML.append(` <div class="dialog-footer-td-element dialog-footer-td-element-special normal rowtabmenu">
                                <input fielditemname2="VATRate" class="text-right addrow ip-last coculator define normal" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="{0}" type="number"
                                       name="name" />
                            </div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "VATAmount") {
                                rowHTML = rowHTML.append(`  <div class="dialog-footer-td-element text-right number rowtabmenu" style="padding:0 4px 0 5px">
                                <div class="define" fielditemname2="VATAmount" style="border:none" data-type="number">{0}</div>
                            </div>`.format(value.formatMoney()))
                            }
                            if (fieldName === "PayAmount") {
                                rowHTML = rowHTML.append(`    <div class="dialog-footer-td-element text-right number define rowtabmenu" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">{0}  </div></div>`.format(value.formatMoney()))
                            }

                            //if (fieldName === "CostPrice" || fieldName === "Quantity" || fieldName === "UnitPrice" || fieldName === "Amount" || fieldName === "DiscountRate" || fieldName === "DiscountAmount" || fieldName === "VATRate" || fieldName === "VATAmount" || fieldName === "PayAmount") {
                            //    value = lamtronso(parseInt(value));
                            //    var clss = 'text-right';

                            //}

                            //rowHTML = rowHTML.append('<div style="padding-left:4px;padding-right:4px;text-overflow: ellipsis;overflow: hidden;" class="{1}">{0}</div>'.format(value, clss));
                        }
                        else {

                            var abc = ` <div class="icon-tabmenu remove-row">
                                <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                                <div class="text-center icon-tabmenu-element"><i class="fas fa-trash" style="color:red"></i></div>
                            </div>`
                            rowHTML = rowHTML.append(abc);
                        }
                    });
                    $('.appendShow1').append(rowHTML);
                });
            });
        });
    }







    //Kiểm tra và show dialog xóa phù hợp
    CheckRowDelete() {

        if ($(".table-details").hasClass("row-selected")) {
            base.ShowDialogAlertDelete();
        }
        else if ($(".table-details").hasClass("row-selected1")) {
            base.ShowDialogAlertDelete1();
        }

    }

    /**
    * Hàm xử lý khi Show dialog delete khi click chuột và hiển thị mã muốn xóa
    * Created by: NHTHAI (4/05/2019)
    * */

    ShowDialogAlertDelete(e) {

        $(".dialog-delete").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "Xóa dữ liệu ",
            position: {
                my: "center",
                at: "center",
                of: document,
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });

        var row = $(".row-selected");

        var child = $(row).children()[2].textContent;
        $("#id-Code").text(child);

    }
    ShowDialogAlertDelete1(e) {

        $(".dialog-delete").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "Xóa dữ liệu ",
            position: {
                my: "center",
                at: "center",
                of: document,
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });

        var row = $(".row-selected");
        $("#id-Code").empty()


        //var child = $(row).children()[2].textContent;
        //$("#id-Code").text(child);
    }

    /**
    * Hàm xử lý đóng tất cả các dialog
    * Created by: NHTHAI (4/05/2019)
    * */

    ShowDialogAlertClose() {
        $(".dialog-close").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "Dữ liệu chưa được lưu",
            position: {
                my: "center",
                at: "center",
                of: document,
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });


    }

    ShowDialogAlertClose1() {
        $(".dialog-close1").dialog({
            modal: true,
            width: 500,
            dialogClass: "",
            resizable: false,
            height: 160,

            title: "MShoppKeeper",
            position: {
                my: "center",
                at: "center",
                of: document,
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }

        });


    }



    /**
    * Hàm hiển thị dialog insert
    * Created by: NHTHAI (28/05/2019)
    * */
    ShowDialogInsert() {

        dialogEdit.ShowDialogAddNewRef();
        dialogEdit.openDialog();
        $('.AddNewForm .form_id').trigger("reset")
      

        base.GetLastId();
        base.TimeNow();
        base.DateNow();
        $(".appendShow1").empty();
        var row = ` <div class="dialog-footer-td notdelete">

                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">

                                <input fielditemname1="SKUCode" class="hidden ip-first item0" type="text" name="tabmenuinput" id="focus-tabindex1" value=""
                                       placeholder="Tìm mã hoặc tên" />
                                <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                                <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                                <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                            </div>

                            <div class="dialog-footer-td-element noclick"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName"></span></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue" type="text"
                                       value="" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname1="UnitName" class="addrow1 text-right revalue" type="text"
                                       value="" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>

                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Quantity" class=" text-right addrow number coculator define" value="0" type="number" name="name" min="0" onkeypress='validate(event)' />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator define" value="0" type="text" onkeypress='validate(event)'
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Amount" class=" text-right addrow number current-money coculator define" value="0" type="text"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="DiscountRate" class="text-right addrow coculator define" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" min="0" />
                            </div>
                            <div class="dialog-footer-td-element text-right " style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">0</div></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="VATRate" class=" text-right addrow ip-last coculator define" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px">
                                <div class="define" fielditemname2="VATAmount" style="border:none" data-type="number">0</div>
                            </div>
                            <div class="dialog-footer-td-element text-right number define" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">0</div></div>
                            <div class="icon-tabmenu">
                                <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                                <div class="text-center icon-tabmenu-element remove-row"><i class="fas fa-trash" style="color:red"></i></div>
                            </div>
                        </div>`
        $(".appendShow1").append(row);


        //Lấy ra ID mới nhất +1
        $.ajax({

            method: 'GET',
            url: '/Refs/getlastid'
        }).done(function (res) {
            $(".ui-dialog #RefNo-Code").data("dataRefCode", res.Data);
            $('.ui-dialog #RefNo-Code').val(res.Data);
        });

    }


        /**
  * Hàm hiển thị dialog Fix
  * Created by: NHTHAI (28/05/2019)
  * */
    ShowDialogDupliCate() {

        dialogEdit.ShowDialogDuplicate();
        dialogEdit.openDialog();
        base.GetDataInDialogShow1();
        base.TimeNow();
        base.DateNow();
        base.GetLastId()

        if ($(".dialog-content").hasClass("FormDuplicate")) {
            $(".appendShow1").empty();
            var row = ` <div class="dialog-footer-td">

                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">

                                <input fielditemname1="SKUCode" class="hidden ip-first item0" type="text" name="tabmenuinput" id="focus-tabindex1" value=""
                                       placeholder="Tìm mã hoặc tên" />
                                <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                                <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                                <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                            </div>

                            <div class="dialog-footer-td-element noclick"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName"></span></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue" type="text"
                                       value="" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname1="UnitName" class="addrow1 text-right revalue" type="text"
                                       value="" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>

                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Quantity" class=" text-right addrow number coculator define" value="0" type="number" name="name" min="0" onkeypress='validate(event)' />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator define" value="0" type="text" onkeypress='validate(event)'
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Amount" class=" text-right addrow number current-money coculator define" value="0" type="text"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="DiscountRate" class="text-right addrow coculator define" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" min="0" />
                            </div>
                            <div class="dialog-footer-td-element text-right " style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">0</div></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="VATRate" class=" text-right addrow ip-last coculator define" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px">
                                <div class="define" fielditemname2="VATAmount" style="border:none" data-type="number">0</div>
                            </div>
                            <div class="dialog-footer-td-element text-right number define" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">0</div></div>
                            <div class="icon-tabmenu">
                                <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                                <div class="text-center icon-tabmenu-element remove-row"><i class="fas fa-trash" style="color:red"></i></div>
                            </div>
                        </div>`

            setTimeout(function () {
                $(".appendShow1").last().append(row);
            }, 300)
        }
    }

    /**
  * Hàm hiển thị dialog Fix
  * Created by: NHTHAI (28/05/2019)
  * */
    ShowDialogBuy() {
        dialogEdit.ShowDialogEdit();
        dialogEdit.openDialog();

        if ($(".dialog-content").hasClass("FormEdit")) {
            $(".appendShow1").empty();
            base.GetDataInDialogShow1();
            var row = ` <div class="dialog-footer-td">

                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">

                                <input fielditemname1="SKUCode" class="hidden ip-first item0" type="text" name="tabmenuinput" id="focus-tabindex1" value=""
                                       placeholder="Tìm mã hoặc tên" />
                                <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                                <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                                <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                            </div>

                            <div class="dialog-footer-td-element noclick"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName"></span></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue" type="text"
                                       value="" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                                <input fielditemname1="UnitName" class="addrow1 text-right revalue" type="text"
                                       value="" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                            </div>

                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Quantity" class=" text-right addrow number coculator define" value="0" type="number" name="name" min="0" onkeypress='validate(event)' />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator define" value="0" type="text" onkeypress='validate(event)'
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="Amount" class=" text-right addrow number current-money coculator define" value="0" type="text"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="DiscountRate" class="text-right addrow coculator define" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" min="0" />
                            </div>
                            <div class="dialog-footer-td-element text-right " style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">0</div></div>
                            <div class="dialog-footer-td-element dialog-footer-td-element-special">
                                <input fielditemname2="VATRate" class=" text-right addrow ip-last coculator define" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                       name="name" />
                            </div>
                            <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px">
                                <div class="define" fielditemname2="VATAmount" style="border:none" data-type="number">0</div>
                            </div>
                            <div class="dialog-footer-td-element text-right number define" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">0</div></div>
                            <div class="icon-tabmenu">
                                <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                                <div class="text-center icon-tabmenu-element remove-row"><i class="fas fa-trash" style="color:red"></i></div>
                            </div>
                        </div>`

            setTimeout(function () {
                $(".appendShow1").last().append(row);
            }, 300)

        }

    }


    /**
    * Hàm hiển thị dialog watch
    * Created by: NHTHAI (28/05/2019)
    * */
    ShowDialogWatch() {

        base.GetDataInDialogShow();

        $('.dialog-watch').dialog({
            modal: true,
            width: 1000,
            dialogClass: "",
            resizable: false,


            title: "Xem phiếu nhập hàng ",
            position: {
                my: "top",
                at: "top",
                of: ".jumbotro",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }
        });

    }




    //Hàm lựa chọn radio button trong dialog insert
    //Create by: NHTHAI 24/5/2019
    DialogInsert_RadioButton() {

        $(this).removeAttr('id');
        $("#dialog-content-details-choise1").removeAttr("id");
        $(this).attr("id", "dialog-content-details-choise1").removeClass("dialog-choise2");
        $(".dialog-choise1").attr("id", "dialog-content-details-choise2").removeClass("dialog-choise1").addClass("dialog-choise2");
        $(this).addClass("dialog-choise1");
        if ($(".c2").hasClass("dialog-choise1")) {
            $("#phieuchi").css("border", "none");
            $("#phieuchi").css("display", "block");
            $("#dialog-content-tienmat").css("background", "#fff");
            $(".switch").css("visibility", "visible");

        }
        else {
            $("#phieuchi").css("display", "none");
            $("#dialog-content-tienmat").css("background", "#f0f0f0");
            $(".switch").css("visibility", "hidden");
            $("#phieunhap").trigger("click");
            $("#phieuchi").css("display", "nosne");
            $("#uynhiemchi").css("display", "none");


        }


    }

    /**
    * Hàm hiển thị dialog chonnhacungcapg
    * Created by: NHTHAI (4/05/2019)
    * */
    ShowChonNhaCungCap() {

        $('.dialog-chonnhacungcap').dialog({
            modal: true,
            width: 800,
            dialogClass: "",
            resizable: false,

            title: "Chọn nhà cung cấp",
            position: {
                my: "top",
                at: "top",
                of: ".dialog-content",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }
        });




        //Datepicker dialog chonnhacungcap
        //Create by: NHTHAI 24/5/2019
        $(".datepicker").datepicker({
            language: 'vi-vn',
            showOn: "button",
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            buttonImageOnly: false



        });

    }

    /**
    * Hàm hiển thị dialog chonnhacungcapg
    * Created by: NHTHAI (4/05/2019)
    * */
    ShowDialogGroupNhacungcap() {

        $('.dialog-group').dialog({
            modal: true,
            width: 500,
            dialogClass: ".dialog-nhacungcap",
            resizable: false,

            title: "Chọn nhà cung câp",
            position: {
                my: "center",
                at: "center",
                of: ".dialog-content",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }
        });

    }

    /**
    * Hàm hiển thị dialog nhacungcap
    * Created by: NHTHAI (30/05/2019)
    * */
    ShowDialogNhacungcap() {
        $('.dialog-nhacungcap').dialog({
            width: 700,
            modal: true,
            dialogClass: "",
            title: "Thêm mới nhà cung cấp ",
            position: {
                my: "top",
                at: "top",
                of: ".dialog-content",
                collision: "none"
            },
            resizable: false
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }
        });
        //Datepicker dialog nhà cung cấp
        //Create by: NHTHAI 28/5/2019
        $(".datepicker").datepicker({
            language: 'vi-vn',
            showOn: "button",
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],


        });
    }


    /**
    * Hàm lựa chọn raidobutton nhacungcap và đồng thơi ẩn hiện nội dung khi click radio button tương ứng
    * Created by: NHTHAI (30/05/2019)
    * */
    DialogNhacungcap_RadioButton() {
        $(this).removeAttr('id');
        $("#dialog-nhacungcap-choise1").removeAttr("id");
        $(this).attr("id", "dialog-nhacungcap-choise1").removeClass("dialog-nhacungcap-choise2");

        $(".dialog-nhacungcap-choise1").attr("id", "dialog-nhacungcap-choise2").removeClass("dialog-nhacungcap-choise1").addClass("dialog-nhacungcap-choise2");
        $(this).addClass("dialog-nhacungcap-choise1");
        var change = $(".b1").hasClass("dialog-nhacungcap-choise2");
        if (change) {

            $("#dialog-nhacungcap-table2").css("display", "block");
            $("#dialog-nhacungcap-table1").css("display", "none");
        }
        else {


            $("#dialog-nhacungcap-table1").css("display", "block");
            $("#dialog-nhacungcap-table2").css("display", "none");
        }
    }




    /**
     * Hàm hiển thị dialog nvmuahang
     * Created by: NHTHAI (31/05/2019)
     * */
    ShowDialogNvmuahang() {
        $('.dialog-nvmuahang').dialog({
            width: 700,
            modal: true,
            dialogClass: "",
            title: "Thêm mới nhân viên ",
            resizable: false,
            position: {
                my: "top",
                at: "top",
                of: ".jumbotro",
                collision: "none"
            }
            , create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            }


        });



        //Datepicker dialog nvmuahang
        //Create by: NHTHAI 30/5/2019
        $(".datepicker").datepicker({
            language: 'vi-vn',
            showOn: "button",
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],

            defaultDate: "30/05/1998",
            buttonImageOnly: false
        });
    }


    //Ẩn hiện tabmenu thời gian truy cập khi click vào checkbox
    //Create by: NHTHAI 30/5/2019
    ShowTabMenu_ThoiGianTruyCap() {
        var src = $(this).attr('src') === '../Img/check.png'
            ? '../Img/uncheck.png'
            : '../Img/check.png';

        $(this).attr('src', src);
        var img = $(this).attr("src");

        if (img === '../Img/uncheck.png') {

            $("#thoigiantruycap").css("display", "none");
            $(".MK").hide();


        }
        if (img === '../Img/check.png') {

            $("#thoigiantruycap").css("display", "inline-block");
            $(".MK").show();

        }
    }




    //Chọn thời gian truy cập khi click vào checkbox và style lại khi uncheckbox trong tab menu Thời gian truy cập.
    //Create by: NHTHAI 30/5/2019
    ChoiseTime_Thoigiantruycap() {
        var parent = $(this).parent();
        var parent1 = parent.next();
        var childpa1 = parent1.find(".total-time-nv");

        var src = $(this).attr('src') === '/Content/nhthai/Img/check.png'
            ? '/Content/nhthai/Img/uncheck.png'
            : '/Content/nhthai/Img/check.png';
        $(this).attr('src', src);
        var img = $(this).attr("src");

        if (img === '/Content/nhthai/Img/uncheck.png') {
            childpa1.css("opacity", "0.4");
        }
        if (img === '/Content/nhthai/Img/check.png') {
            childpa1.css("opacity", "1");
        }
    }

    //hàm lựa chọn Riadio DialogNvmuahang(tabmenu1)
    //Create by: NHTHAI 30/5/2019
    Radio_DialogNvmnuahang_Tabmenu1() {
        var pa = $(this).parent();
        pa.find(".img1").removeClass("img1").addClass("img2").removeAttr("src").attr("src", "/Content/nhthai/Img/uncheck.png");
        $(this).removeClass("img2").addClass("img1").removeAttr("src").attr("src", "/Content/nhthai/Img/check.png");
        var img = $(".i").attr("src");

        if (img === '/Content/nhthai/Img/check.png') {


            $(".time").removeClass("time-hidden");
        }
        if (img === '/Content/nhthai/Img/uncheck.png') {

            $(".time").addClass("time-hidden");
        }
    }

    //Tabmenu đổi nội dung khi chọn của dialog nvmuahang
    //Create by: NHTHAI 30/5/2019
    TabMenu_DialogNvmuahang() {

        $(".tabmenu-nvmuahang-header-element").addClass("tab-nvmuahang-hidden");
        $(this).removeClass("tab-nvmuahang-hidden");
        var parent = $(".table-nvmuahang").parent();
        var child = parent.children();
        if ($(this).hasClass("s1") && $("table-nvmuahang").find(".s1")) {
            child.removeClass("active");
            child.removeClass("inactive");
            child.addClass("inactive");
            $(".s1").addClass("active");
        }
        if ($(this).hasClass("s2") && $("table-nvmuahang").find(".s2")) {
            child.removeClass("active");
            child.removeClass("inactive");
            child.addClass("inactive");
            $(".s2").addClass("active");
        } if ($(this).hasClass("s3") && $("table-nvmuahang").find(".s3")) {
            child.removeClass("active");
            child.removeClass("inactive");
            child.addClass("inactive");
            $(".s3").addClass("active");
        }
        if ($(this).hasClass("s4") && $("table-nvmuahang").find(".s4")) {
            child.removeClass("active");
            child.removeClass("inactive");
            child.addClass("inactive");
            $(".s4").addClass("active");
        }

    }





    /**
    * Thực hiện load dữ liệu của table đầu trong ui
    * Created by: NHThai (11/05/2019)
    * */
    LoadData() {
        //var data = getData();

        var data = [];
        var total = 0;
        $.ajax({
            method: "GET",
            url: "/Ref",
            async: true
        }).done(function (res) {
            data = res;
            var fields = $("[fieldName]");
            $.each(data, function (index, item) {
                var rowHTML = $('<div data-id="' + item.RefID + '" class="table-details"></div>');


                $.each(fields, function (i, fieldItem) {
                    var fieldName = fieldItem.getAttribute('fieldName');



                    var value = '';
                    var cls = 'text-align-left';

                    if (fieldName) {
                        value = item[fieldName];

                        if (fieldName === "RefNo") {
                            var clss = 'link';
                        }

                        if (fieldName === "TotalAmount") {
                            total = total + value;
                        }
                        if (fieldName === "RefDate") {
                            value = new Date(value);
                        }
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }
                        // Thực hiện định dạng dữ liệu hiển thị tương ứng:
                        if (!value)
                            value = '';

                        rowHTML = rowHTML.append('<div class="{2} {1}">{0}</div>'.format(value, cls, clss));

                    }
                    else {
                        rowHTML = rowHTML.append(' <div  class="text-center "><img class="check-img" src="/Content/nhthai/Img/uncheck.png" /></div>');
                    }

                });
                $("strong").text(total.formatMoney());
                $('.table-details-height').append(rowHTML);
                $(".load").hide();




            });

            $('.table-details').eq(0).addClass('row-selected').trigger("mouseup");
            //RowItemOnClick();


        }).fail(function (res) {
        });
    }

    /**
    * Thực hiện load dữ liệu của table 2 trong ui
    * Created by: NHThai (11/05/2019)
    * */
    LoadDataItem() {
        var data = [];
        var a;

        $.ajax({
            method: "GET",
            url: "/InventoryItems/ItemDetalis",
            async: true
        }).done(function (res) {
            data = res;
            var fields = $("[fieldItemName]");
            $.each(data, function (index, item) {

                var rowHTML = $("<tr></tr>");
                $.each(fields, function (i, fielditem) {

                    var fieldname = fielditem.getAttribute("fieldItemName");
                    var value = '';
                    var cls = "text-left";
                    if (fieldname) {
                        value = item[fieldname];
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-center';
                                break;
                            default:

                                break;
                        }
                    }

                    rowHTML = rowHTML.append('<td class="{1}"><span>{0}<span></td>'.format(value, cls));

                });
                $('.tbody-tbody').append(rowHTML);
            });


        });
    }


    /**
    * Thực hiện load dữ liệu khi chon nhà cung cấp của nhacungcap trong dialog content
    * Created by: NHThai (11/05/2019)
    * */
    LoadDataObjectMini2() {
        var data = [];

        $.ajax({
            method: "GET",
            url: "/InventoryItems/inventoryItem",
            async: true
        }).done(function (res) {
            data = res.Data;
            var obj = $("[ObjectDetailMini2]");
            $.each(data, function (index, item) {

                var rowHTML = $("<div class='toggle-nhacungcap-content-element2' Price = '" + (lamtronso(item.CostPrice)).formatMoney() + "'  SKUCode = '" + item.InventoryItemID + "' ></div>");
                //$("body").data('body', item);




                $.each(obj, function (i, objItem) {
                    var objName = objItem.getAttribute("ObjectDetailMini2");
                    var value = '';
                    var cls = 'text-align-left';
                    if (objName) {
                        value = item[objName];
                        // Định dạng dữ liệu hiển thị:
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }

                    }
                    rowHTML = rowHTML.append('<div class="{1}" >{0}</div>'.format(value, cls));
                });
                $('.toggle-nhacungcap-content2').append(rowHTML);

            });
        });
    }



    //Load kho

    LoadStock() {
        var data = [];

        $.ajax({
            method: "GET",
            url: "/Refs/Stock",
            async: true
        }).done(function (res) {
            data = res.Data;
            var obj = $("[StockFlied]");
            $.each(data, function (index, item) {

                var rowHTML = $("<div class='toggle-stock-content-element' StockID = '" + item.StockID + "'></div>");
                //$("body").data('body', item);




                $.each(obj, function (i, objItem) {
                    var objName = objItem.getAttribute("StockFlied");
                    var value = '';
                    var cls = 'text-align-left';
                    if (objName) {
                        value = item[objName];
                        // Định dạng dữ liệu hiển thị:
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }

                    }
                    rowHTML = rowHTML.append('<div style=" text-overflow: ellipsis;overflow: hidden;" class="{1}" >{0}</div>'.format(value, cls));
                });
                $('.toggle-stock-content').append(rowHTML);

            });
        });
    }



    //load nhà cung cấp
    LoadDataObjectMini() {
        var data = [];

        $.ajax({
            method: "GET",
            url: "/api/ObjectDetail",
            async: true
        }).done(function (res) {
            data = res.Data;

            var obj = $("[ObjectDetailMini]");
            $.each(data, function (index, item) {


                var rowHTML = $("<div class='toggle-nhacungcap-content-element' CODENCC='" + item.VendorID + "'></div>");
                $.each(obj, function (i, objItem) {
                    var objName = objItem.getAttribute("ObjectDetailMini");
                    var value = '';
                    var cls = 'text-align-left';
                    if (objName) {
                        value = item[objName];
                        // Định dạng dữ liệu hiển thị:
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }

                    }
                    rowHTML = rowHTML.append('<div class="{1}" >{0}</div>'.format(value, cls));
                })
                $('.toggle-nhacungcap-content').append(rowHTML);

            })
        })
    }


    //Load nha cung cấp
    LoadDataObjectMini3() {
        var data = [];

        $.ajax({
            method: "GET",
            url: "/Refs/Employee",
            async: true
        }).done(function (res) {
            data = res.Data;

            var obj = $("[ObjectDetailMini3]");
            $.each(data, function (index, item) {

                var rowHTML = $("<div class='toggle-nhacungcap-content-element3' CodeNV = '" + item.EmployeeID + "'></div>");
                $.each(obj, function (i, objItem) {
                    var objName = objItem.getAttribute("ObjectDetailMini3");
                    var value = '';
                    var cls = 'text-align-left';
                    if (objName) {
                        value = item[objName];
                        // Định dạng dữ liệu hiển thị:
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }

                    }
                    rowHTML = rowHTML.append('<div class="{1}" >{0}</div>'.format(value, cls));
                });
                $('.toggle-nhacungcap-content3').append(rowHTML);

            })
        })
    }


    /**
    * Thực hiện load dữ liệu của nhacungcap trong dialog content
    * Created by: NHThai (11/05/2019)
    * */
    LoadDataObjectDetails() {

        var data = [];
        $.ajax({
            method: "GET",
            url: "/api/ObjectDetail",
            async: true
        }).done(function (res) {
            data = res.Data;
            var obj = $("[ObjectDetail]");
            $.each(data, function (index, item) {
                var rowHTML = $("<div  class='dialog-chonnhacungcap-content-des-element'></div>");
                $.each(obj, function (i, objItem) {

                    var objName = objItem.getAttribute("ObjectDetail");
                    var value = '';
                    var cls = 'text-align-left';
                    if (objName) {
                        value = item[objName];
                        // Định dạng dữ liệu hiển thị:
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }
                        // Thực hiện định dạng dữ liệu hiển thị tương ứng:
                        rowHTML = rowHTML.append('<div class="element {1}">{0}</div>'.format(value, cls));

                    }
                    else {
                        rowHTML = rowHTML.append('<div class="element text-center"><input class="text-center" type="radio" name="name" value="" /></div>');
                    }



                });
                $('.dialog-chonnhacungcap-content-des').append(rowHTML);
            });

        });
    }







    /**
    * Thực hiện Reload dữ liệu 
    * Created by: NHThai (01/06/2019)
    * */
    EmptyLoadData() {

        $('.table-details-height').empty();
        //$(".load").show();


        base.SelectPaging();
    }



    /**
* Thực hiện Xóa nhiều dữ liệu
* Created by: NHThai (11/05/2019)
* */
    Deletes() {
        // Lấy recordID bản ghi đang chọn:
        var id = [];
        for (var i = 0; i < $(".table-details").length; i++) {

            //if ($(".table-details").length == 1 && $(".table-details").hasClass("row-selected")) {

            //}
            if ($($(".check-img")[i]).attr("src") === "/Content/nhthai/Img/check.png" || $($(".check-img")[i]).parents(".table-details").hasClass("row-selected")) {

                var a = $($(".check-img")[i]).parents(".table-details").attr("data-id");
                id.push(a);
            }
        }




        // Gọi service xóa dữ liệu:
        $.ajax({
            method: "DELETE",
            url: "/Refs/deletesby",
            data: JSON.stringify(id),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function () {
                $('.table-details-height').empty();
                base.SelectPaging();
            },
            error: function () {

            }
        });
        base.CloseDialog();


    }






    /**
    * Thực hiện thêm dữ liệu
    * Created by: NHThai (11/05/2019)
    * */
    Save() {
        //$('.form_id').trigger("reset").find("INPUT").val("");
        base.TimeNow();
        base.DateNow();

        var VendorID = $(".AddNewForm .item1").attr("valuencc");
        var EmployeeID = $(".AddNewForm .codestaff").attr('valuenv');
        var RefNo = $(".AddNewForm #RefNo-Code").val();
        var ContactName = $(".AddNewForm #ContactName").val();
        var AccountObjectName = $(".AddNewForm #AccountObjectName").val();
        var JournalMemo = $(".AddNewForm #JournalMemo").val();
        var TimeValue = $(".AddNewForm .time-value").val();
        var RefDate1 = $(".AddNewForm [RefDatee]").datepicker('getDate').formatddMMyyyy();

        var newDate = RefDate1.substr(0, 2)
        var newMonth = RefDate1.substr(3, 2)
        var newYear = RefDate1.substr(6, 4)
        var newTime = newYear + "/" + newMonth + "/" + newDate

        var RefDate = newTime + " " + TimeValue;
        debugger

        var listID = $(".AddNewForm [inventoryitemcode]");
        var Quantity = $('.AddNewForm [fielditemname2="Quantity"]')
        var tdparren = $(".AddNewForm .toggle-nhacungcap2").data('current-row');
       

        var InventoryItems = [];
        var inventoryElement = $('.AddNewForm .dialog-footer-content .dialog-footer-td');

        $.each(inventoryElement, function (i, item) {
         
            var id = $(item).attr("inventoryitemcode");
            var stockid = $(item).attr("stockid");
            var inventory = { InventoryItemID: id, StockID: stockid };
            if (i !== inventoryElement.length - 1) {

                $.each($(item).children(), function (index, element) {
              
                    var fieldNameElement = $(element).children()[0];
                    var fieldName = $(fieldNameElement).attr('fielditemname2');

                    if (fieldNameElement !== undefined && fieldName !== undefined) {
                        if (fieldNameElement.tagName === 'INPUT') {
                            inventory[fieldName] = $(fieldNameElement).val();

                            if (fieldName === 'Amount' || fieldName === 'VATRate' || fieldName === 'Quantity' || fieldName === 'DiscountRate') {
                                inventory[fieldName] = ParseMonneyToNumber($(fieldNameElement).val())
                            }
                        }
                        else {
                            var value;
                            var dataType = $(fieldNameElement).attr('data-type');

                            value = $(element).text();
                            if (dataType && dataType == 'number') {
                                inventory[fieldName] = Number(value.trim().split('.').join(''));
                            }
                            else
                                inventory[fieldName] = value.trim();
                        }
                    }
                });
                InventoryItems.push(inventory);

            }
        });
        var ref = {
            RefNo: RefNo,
            JournalMemo: JournalMemo,
            RefDate: RefDate,
            AccountObjectName: AccountObjectName,
            VendorID: VendorID,
            EmployeeID: EmployeeID,
            RefDetails: InventoryItems,
            ContactName: ContactName
        };
        console.log(ref)
        $.ajax({
            method: "POST",
            url: "/Refs/CreateInvoice",
            async: true,
            data: JSON.stringify(ref),
            success: function (res) {
         
                $('.table-details-height').empty();

                base.SelectPaging();
                if (res == false) {
                    base.ShowDialogAlertClose1();
                    $(".total-footer").data("RefNo", RefNo)
                }
                else {
                    $('.form_id').trigger("reset").find("INPUT").val("");
                    base.GetLastId();
                    base.TimeNow();
                    base.DateNow();
                }

            },
            contentType: 'application/json; charset="utf-8"'
        }).done(function () {
            base.EmptyLoadData();
            //setTimeout(function () {
            //    base.ShowDialogWatch();
            //}, 100)
            dialogEdit.closeDialog();
        })


    }



    /**
    * Thực hiện cập nhập dữ liệu khi click chọn 1 hàng hóa và gán giá trị trong tabmenu
    * Created by: NHThai (11/05/2019)
    * */

    Update() {

        var RefNo = $(".FormEdit #RefNo-Code").val();
        var ContactName = $(".FormEdit #ContactName").val();
        var EmployeeID = $(".FormEdit .codestaff").attr('valuenv');
        var JournalMemo = $(".FormEdit #JournalMemo").val();
        var RefID = $("[data-refid]").attr("data-refid");
        var InventoryItems = [];
        var inventoryElement = $('.FormEdit .dialog-footer-content .dialog-footer-td');

        $.each(inventoryElement, function (i, item) {

            var id = $(item).attr("inventoryitemcode");
            var stockid = $(item).attr("stockid");
            var refdetail = $(item).attr("data-ref-detail")
            var inventory = { InventoryItemID: id, StockID: stockid, RefDetailID: refdetail };
            if (i !== inventoryElement.length - 1) {

                $.each($(item).children(), function (index, element) {

                    var fieldNameElement = $(element).children()[0];
                    var fieldName = $(fieldNameElement).attr('fielditemname2');

                    if (fieldNameElement !== undefined && fieldName !== undefined) {
                        if (fieldNameElement.tagName === 'INPUT') {
                            inventory[fieldName] = $(fieldNameElement).val();
                            if (fieldName === 'Amount') {
                                inventory[fieldName] = ParseMonneyToNumber($(fieldNameElement).val())
                            }
                         
                        }
                        else {
                            var value;
                            var dataType = $(fieldNameElement).attr('data-type');

                            value = $(element).text();
                            if (dataType && dataType == 'number') {
                                inventory[fieldName] = Number(value.trim().split('.').join(''));
                            }
                            else
                                inventory[fieldName] = value.trim();
                        }
                    }
                });
                InventoryItems.push(inventory);
            }
        });


        var ref = {
            RefID: RefID,
            RefNo: RefNo,
            ContactName: ContactName,
            EmployeeID: EmployeeID,
            JournalMemo: JournalMemo,
            RefDetails: InventoryItems,
        };
        $.ajax({
            method: "PUT",
            url: "/Refs/UpdateInvoice",
            data: JSON.stringify(ref),
            async: true,
            contentType: 'application/json; charset="utf-8"',

        }).done(function () {
            base.EmptyLoadData();
            //setTimeout(function () {
            //    base.ShowDialogWatch();
            //}, 100)
            dialogEdit.closeDialog();
        })

    }






   /**
    * Thực hiện nhân bản dữ liệu 
    * Created by: NHThai (11/05/2019)
    * */
    Duplicate() {

        var VendorID = $(".FormDuplicate .item1").attr("valuencc");
        var RefNo = $(".FormDuplicate #RefNo-Code").val();
        var ContactName = $(".FormDuplicate  #ContactName").val();
        var EmployeeID = $(".FormDuplicate .codestaff").attr('valuenv');
        var JournalMemo = $(".FormDuplicate #JournalMemo").val();
        var RefID = $("[data-refid]").attr("data-refid");
        var TimeValue = $(".FormDuplicate .time-value").val();
        var RefDate1 = $(".FormDuplicate [RefDatee]").datepicker('getDate').formatddMMyyyy();
      

        var newDate = RefDate1.substr(0, 2)
        var newMonth = RefDate1.substr(3, 2)
        var newYear = RefDate1.substr(6, 4)
        var newTime = newYear + "/" + newMonth + "/" + newDate


        var RefDate = newTime + " " + TimeValue;

        var InventoryItems = [];
        var inventoryElement = $('.FormDuplicate .dialog-footer-content .dialog-footer-td');

        $.each(inventoryElement, function (i, item) {

            var id = $(item).attr("inventoryitemcode");
            var stockid = $(item).attr("stockid");
            var refdetail = $(item).attr("data-ref-detail")
            var inventory = { InventoryItemID: id, StockID: stockid, RefDetailID: refdetail };
            if (i !== inventoryElement.length - 1) {

                $.each($(item).children(), function (index, element) {

                    var fieldNameElement = $(element).children()[0];
                    var fieldName = $(fieldNameElement).attr('fielditemname2');

                    if (fieldNameElement !== undefined && fieldName !== undefined) {
                        if (fieldNameElement.tagName === 'INPUT') {
                            inventory[fieldName] = $(fieldNameElement).val();
                            if (fieldName === 'Amount') {
                                inventory[fieldName] = ParseMonneyToNumber($(fieldNameElement).val())
                            }

                        }
                        else {
                            var value;
                            var dataType = $(fieldNameElement).attr('data-type');

                            value = $(element).text();
                            if (dataType && dataType == 'number') {
                                inventory[fieldName] = Number(value.trim().split('.').join(''));
                            }
                            else
                                inventory[fieldName] = value.trim();
                        }
                    }
                });
                InventoryItems.push(inventory);
            }
        });
        
        var ref = {
            RefID: RefID,
            RefNo: RefNo,
            ContactName: ContactName,
            EmployeeID: EmployeeID,
            JournalMemo: JournalMemo,
            RefDetails: InventoryItems,
            RefDate: RefDate,
            VendorID: VendorID
        };
        console.log(ref)
        $.ajax({
            method: "POST",
            url: "/Refs/CreateInvoice",
            data: JSON.stringify(ref),
            async: true,
            contentType: 'application/json; charset="utf-8"',

        }).done(function () {
            base.EmptyLoadData();
            //setTimeout(function () {
            //    base.ShowDialogWatch();
            //}, 100)
            dialogEdit.closeDialog();
        })

    }





    /**
    * Thực hiện lấy dữ liệu khi click chọn 1 hàng hóa và gán giá trị trong tabmenu
    * Created by: NHThai (11/05/2019)
    * */
    GetItem() {

        var code = $(".toggle-nhacungcap2").data("code");
        //var res = $("body").data('body');


        $.ajax({

            method: 'GET',
            url: '/InventoryItems/item/' + code
        }).done(function (res) {
            res = res.Data;
            var thiss = $(".dialog-content").data("this");
            var fields = thiss.find('[fielditemname1]');

            $.each(fields, function (index, element) {
                var fieldName = $(element).attr('fielditemname1');

                if (element.tagName === 'INPUT') {

                    $(element).val(res[0][fieldName]);

                }
                else {
                    $(element).text(res[0][fieldName]);

                }
                $(thiss).find("[fielditemname2='Quantity']").val(1);


            });


            var row = `
                   <div class="dialog-footer-td ">

                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">

                            <input fielditemname1="SKUCode" class="hidden ip-first item0" type="text" name="tabmenuinput" id="focus-tabindex1" value=""
                                   placeholder="Tìm mã hoặc tên" />
                            <img class="hidden cursor-menu arrow-toggle-nhacungcap-content2" contentEditable src="/Content/nhthai/Img/arrow-down-line.png" />

                            <img class="hidden cursor-menu " src="/Content/nhthai/Img/Quick-search.png" contentEditable />
                            <div class="dialog-content-icon-plus hidden cursor-menu" style="float:right"><i class="fas fa-plus fa-xs" contentEditable></i></div>
                        </div>

                        <div class="dialog-footer-td-element noclick"><span style="font-weight:200;padding-left:10px;" fielditemname1="InventoryItemName"></span></div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                            <input fielditemname2="StockName" style="text-overflow: ellipsis;" class="addrow1 revalue" type="text"
                                   value="" name="tabmenuinput1" /> <img class="hidden cursor-menu stock-arrow" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special ">
                            <input fielditemname1="UnitName" class="addrow1 text-right revalue" type="text"
                                   value="" name="tabmenuinput2" /> <img class="hidden cursor-menu" id="arrow-down-paginationn" src="/Content/nhthai/Img/arrow-down-line.png" contentEditable />
                        </div>

                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="Quantity" class=" text-right addrow number coculator" value="0" type="number" name="name" min="0" onkeypress='validate(event)' />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname1="CostPrice" class="text-right addrow number current-money coculator" value="0" type="text" onkeypress='validate(event)'
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="Amount" class=" text-right addrow number current-money coculator" value="0" type="text"
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="DiscountRate" class=" text-right addrow coculator" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                   name="name" min="0" />
                        </div>
                        <div class="dialog-footer-td-element text-right " style="padding:0 4px 0 5px"><div fielditemname2="DiscountAmount" style="border:none" data-type="number">0</div></div>
                        <div class="dialog-footer-td-element dialog-footer-td-element-special">
                            <input fielditemname2="VATRate" class=" text-right addrow ip-last coculator" min="0" max="100" onkeypress='return event.charCode >= 48 && event.charCode <= 57' oninput="changeHandler(this)" value="0" type="number"
                                   name="name" />
                        </div>
                        <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px">
                            <div fielditemname2="VATAmount" style="border:none" data-type="number">0</div>
                        </div>
                        <div class="dialog-footer-td-element text-right number" style="padding:0 4px 0 5px"><div fielditemname2="PayAmount" style="border:none" data-type="number">0</div></div>
                        <div class="icon-tabmenu">
                            <div class="text-center icon-tabmenu-element"><img src="/Content/nhthai/Img/copy-down.png" /></div>
                            <div class="text-center icon-tabmenu-element remove-row"><i class="fas fa-trash" style="color:red"></i></div>
                        </div>
                    </div>
`

            var current = $(".toggle-nhacungcap2").data('current-row');
            var numbers = current.find('input.number');
            var isAddRow = false;
            for (var i = 0; i < numbers.length; i++) {
                if ($(numbers[i]).val() > 0) {
                    isAddRow = true;
                    break;
                }
            }



            if (isAddRow && $(current).next().hasClass("dialog-footer-td")) {


            }
            else {
                current.parent().append(row);
            }

            var unitPrice = $(thiss).children().find("[fielditemname1='CostPrice']").val(); //Đơn giá
            //var quantity = $(thiss).children().find("[fielditemname2='Quantity']").val(); //Số lượng
            //var Amount = $(thiss).children().find("[fielditemname2='Amount']").val(); //Thành tiền
            $(thiss).children().find("[fielditemname1='CostPrice']").val((lamtronso(unitPrice)).formatMoney());


            //Thành tiền  = số lượng * đơn giá
            //var valueAmount = ParseMonneyToNumber(unitPrice) * quantity;

            //$(thiss).find("[fielditemname2='Amount']").val((lamtronso(valueAmount)).formatMoney());
            //$(thiss).children().find("[fielditemname2='PayAmount']").text(lamtronso(valueAmount).formatMoney());





        });
    }

    /**
 * Thực hiện lấy Id cuối cùng của list
 * Created by: NHThai (11/05/2019)
 * */
    GetLastId() {
        $.ajax({

            method: 'GET',
            url: '/Refs/getlastid'
        }).done(function (res) {
            $(".ui-dialog #RefNo-Code").data("dataRefCode", res.Data);
            $('.ui-dialog #RefNo-Code').val(res.Data);

        });
    }





    /**
    * Thực hiện validate dữ liệu
    * Created by: NHThai (11/05/2019)
    * */
    ValidateRequired() {
        var value = $(this).val();
        if (!value) {
            if ($(this).parent().hasClass("special")) {
                $(this).addClass("required1");
                $(this).parent().removeClass("input-content-nvmuahang1");
            }
            else {
                $(this).addClass("required");
                $(this).parent().removeClass("input-content-nvmuahang");
            }


            $(this).attr('title', "Trường này không được để trống");
            $(this).data("isValid", false);
            $(this).next().css("display", "inline-block");
        } else {

            if ($(this).parent().hasClass("special")) {
                $(this).removeClass("required1");
                $(this).parent().addClass("input-content-nvmuahang1").css("border", "black");

            }
            else {
                $(this).removeClass("required");
                $(this).parent().addClass("input-content-nvmuahang");
            }

            $(this).removeAttr('title', "Trường này không được để trống");
            $(this).data("isValid", true);
            $(this).next().css("display", "none");
        }
    }



    /**
    * Thực hiện show lỗi khi hover chuột vào div-error
    * Created by: NHThai (11/05/2019)
    * */
    onShowRequiredError(event) {
        var offset = $(this).offset();
        //var x = $(this).height();
        //var y = event.pageY;
        var value = $(this).prev().find("input").val();
        var dateclass = $(this).prev().children().hasClass("date-value");
        var timeclass = $(this).prev().children().hasClass("time-value");
        if (value === '') {

            $('.tolltip-requaid').show();
            $('.tolltip-requaid').css('left', offset.left + 15);
            $('.tolltip-requaid').css('top', offset.top + 30);
        }
        else if (dateclass) {
            if (!isValidDate(value)) {
                $('.tolltip-date-error').show();
                $('.tolltip-date-error').css('left', offset.left + 15);
                $('.tolltip-date-error').css('top', offset.top + 30);
            }
            else {
                $(".tolltip-error ").hide();
            }
        }
        else if (timeclass) {
            if (!isValidDate(value)) {
                $('.tolltip-time-error').show();
                $('.tolltip-time-error').css('left', offset.left + 15);
                $('.tolltip-time-error').css('top', offset.top + 30);
            }
            else {
                $(".tolltip-error ").hide();
            }
        }



    }
    /**
    * Thực hiện ẩn div error khi rời chuột khỏi vùng đó
    * Created by: NHThai (11/05/2019)
    * */

    onHideRequiredError() {
        $(".tolltip-error").hide();
    }

    /**
    * Thực hiện trả về giá trị ban đầu khi input trống trong dialog-insert
    * Created by: NHThai (11/05/2019)
    * */

    ReturnValue() {
        var value = $(this).val();

        if ($(this).hasClass("code-value")) {
            if (value === '') {

                $(this).val($('#RefNo-Code').data("dataRefCode"));
                $(this).parent().removeClass("required");
                $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                $(this).parents(".error-container").find(".error").css("display", "none");
                //$(this).removeAttr('title');

            }
        }
        if ($(this).hasClass("date-value")) {
            if (value === '' || $(this).parent().next().hasClass("error")) {
                $(".date-value").val($('.date-value').data("date-value"));
                $(this).parent().removeClass("required");
                $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                $(this).parents(".error-container").find(".error").css("display", "none");
                //$(this).removeAttr('title');

            }

        }
        if ($(this).hasClass("date-value1")) {
            if (value === '' || $(this).parent().next().hasClass("error")) {
                $(".date-value1").val($('.date-value').data("date-value"));
                $(this).parent().removeClass("required");
                $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                $(this).parents(".error-container").find(".error").css("display", "none");
                //$(this).removeAttr('title');

            }

        }

        if ($(this).hasClass("time-value")) {
            if (value === '' || $(this).parent().next().hasClass("error")) {
                $(".time-value").val($('.time-value').data("time-value"));
                $(this).parent().removeClass("required");
                $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                $(this).parents(".error-container").find(".error").css("display", "none");
                //$(this).removeAttr('title');


            }
        }

    }


    /**
    * Thực hiện validate dữ liệu
    * Created by: NHThai (11/05/2019)
    * */
    ValidateDialog() {


        var value = $(this).val();
        if (value === '') {

            $(this).parent().addClass("required");
            $(this).parents(".error-container").css("border", "none");
            $(this).parents(".error-container").find(".error").css("display", "inline-block");
            $(this).data("isValid", false);

        }
        else {


            if ($(this).hasClass("date-value")) {

                if (isValidDate(value)) {
                    $(this).parent().removeClass("required");
                    $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                    $(this).parents(".error-container").find(".error").css("display", "none");

                    //$(this).removeAttr('title');
                    $(this).data("isValid", true);
                    $(".date-value").data("date-value", value);

                }
                else {
                    //$(this).removeAttr('title', "Trường này không được để trống");
                    //$(this).attr('title', "Định dạng ngày tháng không hợp lệ");
                    $(this).parent().addClass("required");
                    $(this).parents(".error-container").css("border", "none");
                    $(this).parents(".error-container").find(".error").css("display", "inline-block");


                }
            }
            else if ($(this).hasClass("date-value1")) {

                if (isValidDate(value)) {
                    $(this).parent().removeClass("required");
                    $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                    $(this).parents(".error-container").find(".error").css("display", "none");

                    //$(this).removeAttr('title');
                    $(this).data("isValid", true);
                    $(".date-value").data("date-value", value);

                }
                else {
                    //$(this).removeAttr('title', "Trường này không được để trống");
                    //$(this).attr('title', "Định dạng ngày tháng không hợp lệ");
                    $(this).parent().addClass("required");
                    $(this).parents(".error-container").css("border", "none");
                    $(this).parents(".error-container").find(".error").css("display", "inline-block");


                }
            }
            else if ($(this).hasClass("time-value")) {


                if (validateHhMm(value)) {
                    $(this).parent().removeClass("required");
                    $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                    $(this).parents(".error-container").find(".error").css("display", "none");

                    //$(this).removeAttr('title');
                    $(this).data("isValid", true);
                    $(".time-value").data("time-value", value);
                }
                else {
                    //$(this).removeAttr('title', "Trường này không được để trống");
                    //$(this).attr('title', "Định dạng giờ không hợp lệ");
                    $(this).parent().addClass("required");
                    $(this).parents(".error-container").css("border", "none");
                    $(this).parents(".error-container").find(".error").css("display", "inline-block");

                }
            }
            else {
                $(this).parent().removeClass("required");
                $(this).parents(".error-container").css("border", "1px solid #e1e1e1");
                $(this).parents(".error-container").find(".error").css("display", "none");
                $(".tolltip-requaid").css("display", "none");
                $(this).data("isValid", true);
                $("#RefNo-Code").data("dataRefCode", value);

            }



        }

    }



    //Gọi ajax phân trang
    CallAjaxLoad(pagingParameter) {

        var total = 0;
        $.ajax({
            method: "POST",
            url: "/Refs/FilterAndPaging",
            dataType: "json",
            data: JSON.stringify(pagingParameter),
            contentType: "application/json; charset=utf-8",
        }).done(function (res) {
            $('.table-details-height').empty();

            var data = res.Data.Entities;
            var TotalRecord = res.Data.TotalRecord;

            
            var TotalPage = res.Data.TotalPage;

            var pageNumber = $(".pagination-input").children().val();
            pageNumber = parseInt(pageNumber);
            var pageSize = $("#pagination-value-choise").text();
            pageSize = parseInt(pageSize);
            var Count = ((pageNumber - 1) * pageSize) + 1;
            var row = Count + pageSize - 1;
            if (row > TotalRecord) {
                row = TotalRecord;
            }

            $(".TotalPage").data("TotalPage", TotalPage);

            $(".TotalPage").text("Trên {0}".format(TotalPage));
            var v = $(".pagination-input").data("ok");
            $(".TotalRecord").text("Hiển thị {0}-{1} trên {2} kết quả".format(Count, row, TotalRecord));

            var valuepage = parseInt($(".pagination-input").children().val()); // số trang hiện tại
            var pageSize = parseInt($("#pagination-value-choise").text()); //tổng số bản ghi của trang đó
         



            var fields = $("[fieldName]");
            $.each(data, function (index, item) {
                var rowHTML = $('<div data-id="' + item.RefID + '" class="table-details"></div>');


                $.each(fields, function (i, fieldItem) {
                    var fieldName = fieldItem.getAttribute('fieldName');


                    var value = '';
                    var cls = 'text-align-left';

                    if (fieldName) {
                        value = item[fieldName];

                        if (fieldName === "RefNo") {
                            var clss = 'link';
                        }

                        if (fieldName === "TotalAmount") {
                            total = total + value;
                        }
                        if (fieldName === "RefDate") {
                            value = new Date(value);
                        }
                        // Xác định kiểu dữ liệu:
                        var dataType = $.type(value);
                        switch (dataType) {

                            case "number":
                                // Định dạng kiểu hiện thị tiền tệ và hiển thị căn phải:
                                value = value.formatMoney();
                                cls = 'text-align-right';
                                break;
                            case "date":

                                // Định dạng hiển thị ngày/tháng/năm và căn giữa:
                                value = value.formatddMMyyyy();
                                cls = 'text-align-center';
                                break;
                            default:

                                break;
                        }
                        // Thực hiện định dạng dữ liệu hiển thị tương ứng:
                        if (!value)
                            value = '';

                        rowHTML = rowHTML.append('<div class="{2} {1}">{0}</div>'.format(value, cls, clss));

                    }
                    else {
                        rowHTML = rowHTML.append(' <div  class="text-center "><img class="check-img" src="/Content/nhthai/Img/uncheck.png" /></div>');
                    }

                });
                $("strong").text(total.formatMoney());
                $('.table-details-height').append(rowHTML);
                $(".load").hide();




            });

            $('.table-details').eq(0).addClass('row-selected').trigger("mouseup");
            //RowItemOnClick();


        }).fail(function (res) {
        });

    }




    //Lấy dữ liệu để filter và phân trang
    SelectPaging() {
      
        var finalpage = $(".TotalPage").data("TotalPage");
        var indexPage = $("#pagination-value-choise").attr("index-page");
        indexPage = parseInt(indexPage);
        if ($(this).hasClass("pagination2")) {
            indexPage -= 1;
            if (indexPage < 1) {
                indexPage = 1;
            }
        }
        else if ($(this).hasClass("pagination1")) {
            indexPage = 1;
        }
        else if ($(this).hasClass("pagination3")) {
            indexPage += 1;
            if (indexPage > finalpage) {
                indexPage = finalpage;
            }
        }
        else if ($(this).hasClass("pagination4")) {
            indexPage = finalpage;
        }

        $(".pagination-input").children().val(indexPage);

        $("#pagination-value-choise").attr("index-page", indexPage);
        var pageNumber = $(".pagination-input").children().val();
        var pageSize = $("#pagination-value-choise").text();

        pageSize = parseInt(pageSize);

        var fieldname = $("[filter]");

        var Filters = [];
        $.each(fieldname, function (index, item) {

            debugger
        
            if ($(item).attr("filter") == "Gender") {
                var atr = $(item).attr("filter");
                var atrvalue = $(item).attr("val1");
               
                var filter = {
                    FieldName: atr,
                    FilterValue: atrvalue,
                    FilterType: 0
                }
                Filters.push(filter);
                
            }

            else {
                if ($(item).val() != "") {
                    debugger
                    var type = $(item).parents(".table-description-choise").find("[FilterType1]").attr("FilterType1");
                    type = parseInt(type);
                    var atr = $(item).attr("filter");
                    var atrvalue = ParseMonneyToNumber($(item).val());
                    var filter = {
                        FieldName: atr,
                        FilterValue: atrvalue,
                        FilterType: type
                    }
                    Filters.push(filter);
                }
            }



        })

        var Columns = [];


        $.each(fieldname, function (index, item) {
            var atr = $(item).attr("filter");
            Columns.push(atr);
        })
        Columns.push("RefID")
        Columns.push("Gender")

        var pagingParameter = {
            Columns: [],
            Filters: Filters,
            RecordCount: pageSize,
            Page: indexPage,
            OrderBy: "RefNo DESC"
        };

        console.log(pagingParameter)
        base.CallAjaxLoad(pagingParameter);

    }


}




