
$(document).ready(function () {
    //Hiển thị toggle cho từng button trong table
    //Create by: NGTHAI 21/05/2019
    $("#arrow-down").click(function () {

        $(".toggle-date").toggle();
    });

    $("#calculation1").click(function () {
        $("#toggle-calculation1").toggle();
    });
    $("#calculation2").click(function () {
        $("#toggle-calculation2").toggle();
    });

    $("#calculation3").click(function () {
        $("#toggle-calculation3").toggle();
    });

    $("#calculation4").click(function () {
        $("#toggle-calculation4").toggle();
    });

    $("#calculation5").click(function () {
        $("#toggle-calculation5").toggle();
    });
    $("#calculation6").click(function () {
        $("#toggle-calculation6").toggle();
    });
    $("#toggle-nhacungcap-content-click,#toggle-nhacungcap-content-click3").click(function () {
        $(".navbar").data("CODENCC", $(this));
 
        $(".toggle-nhacungcap").toggle();
    });
    $("#toggle-nhacungcap-content-click2").click(function () {
    
        $("#Code").data("NV", $(this));
        $(".toggle-nhacungcap3").toggle();
    });

    $(".time-icon").click(function () {
        $(".listtime").toggle();
    });
    $(".switch").click(function () {
        $(".toggle-switch").toggle();
    });
    //toggle chọn phân trang
    //Create by: NHTHAI 24/5/2019
    $(".arrow-down-paginationn").click(function () {
    
        $(".paginationn-toggle").toggle();

    });
    $(document).on("click", ".arrow-toggle-nhacungcap-content2", function (event) {
        $(".toggle-nhacungcap2").data('current-row', $(event.currentTarget).parents('.dialog-footer-td'));
        var parent = $(this).parent();
        var off = $(parent).offset();
        $(".flex-menu").data("inventory", $(this));
        $(".dialog-content").data("this", $(this).parents(".dialog-footer-td"));
        $(".toggle-nhacungcap2").css("left", off.left);
        $(".toggle-nhacungcap2").css("top", off.top + 30);
        $(".toggle-nhacungcap2").toggle();
    })


    $(document).on("click", ".stock-arrow", function (event) {

        $(".toggle-stock").data('current-row1', $(event.currentTarget).parents('.dialog-footer-td'));
        var parent = $(this).parent();
        var off = $(parent).offset();
        $(".toggle-stock").css("left", off.left);
        $(".toggle-stock").css("top", off.top + 30);
        $(".toggle-stock").toggle();
    })

    $(".toggle-stock").mouseleave(function () {
        setTimeout(function () {
            $(".toggle-stock").hide();
        }, 200);
    })

    $(".listtime").mouseleave(function () {
        setTimeout(function () {
            $(".listtime").hide();
        }, 200);
    })
    $(".toggle-nhacungcap").mouseleave(function () {
        setTimeout(function () {
            $(".toggle-nhacungcap").hide();
        }, 200);
    });
    $(".toggle-nhacungcap2").mouseleave(function () {
        setTimeout(function () {
            $(".toggle-nhacungcap2").hide();
        }, 200);
    });
    $(".toggle-nhacungcap3").mouseleave(function () {
        setTimeout(function () {
            $(".toggle-nhacungcap").hide();
        }, 200);
    });

    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation1").hide();
    });

    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation2").hide();
    });

    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation3").hide();
    });

    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation4").hide();
    });

    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation5").hide();
    });
    $(".table-element-description").mouseleave(function () {
        $("#toggle-calculation6").hide();
    });

    $(".paginationn-toggle").mouseleave(function () {
        $(".paginationn-toggle").hide();
    });

    $("#fillter-getdate").mouseleave(function () {
        $(".toggle-date").hide();
    });



    $(".check-img1").click(function () {

        var x = $(this).attr("src");
        if (x === '/Content/nhthai/Img/uncheck.png') {
            $("#hoadon").css("display", "block");
        }
        if (x === '/Content/nhthai/Img/check.png') {
            $("#hoadon").css("display", "none");
            $("#phieunhap").trigger("click");
        }

    });

    //Checkbox thay đổi khi click
    //Create by: NHTHAI 22/05/2019
    $(".table-details-height").on("click", ".check-img", function () {
    
        var src = $(this).attr('src') === '/Content/nhthai/Img/check.png'
            ? '/Content/nhthai/Img/uncheck.png'
            : '/Content/nhthai/Img/check.png';
        $(this).attr('src', src);
        if ($(this).attr("src") === "/Content/nhthai/Img/check.png") {
            $(this).parents(".table-details").addClass("row-selected1");
            $(".table-details").removeClass("row-selected");
        }
        else {
            $(this).parents(".table-details").removeClass("row-selected1").removeClass("row-selected")
            
        }
    });
    //Checkbox thay đổi khi click trong table
    //Create by: NHTHAI 22/05/2019

    $(".check-img").click(function () {
    
        var src = $(this).attr('src') === '/Content/nhthai/Img/check.png'
            ? '/Content/nhthai/Img/uncheck.png'
            : '/Content/nhthai/Img/check.png'
        $(this).attr('src', src);
        //if ($(this).attr("src") === "/Content/nhthai/Img/check.png") {
        //    $(this).parents(".table-details").addClass("row-selected1");
        //}
        //else {
        //    $(this).parents(".table-details").addClass("row-selected1");
        //}
        


    });
    //Click vào Checkbox tổng sẽ thay đổi tất các các checkbox khác
    //Create by: NHTHAI 22/05/2019
    $(".tablee").on("click", "#check-total", function () {

        var src = $("#check-total").attr('src') === '/Content/nhthai/Img/check.png'
            ? '/Content/nhthai/Img/uncheck.png'
            : '/Content/nhthai/Img/check.png';
        $("#check-total").attr('src', src);
        var src1 = $(".check-img").attr('src') === '/Content/nhthai/Img/check.png'
            ? '/Content/nhthai/Img/uncheck.png'
            : '/Content/nhthai/Img/check.png';
        $(".check-img").attr('src', src1);
        if ($(this).attr("src") === "/Content/nhthai/Img/check.png") {
            $(".table-details").addClass("row-selected1");
  
        }
        else {
            $(".table-details").removeClass("row-selected1");
         
        }

    });



    //Formart ngày tháng hiển thị cho lịch
    //Create by: NHTHAI 20/05/2019


    $(".datepickerr").datepicker({

        showOn: "button",
        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        buttonImageOnly: false,



    });

    $(".datepicker").datepicker({

        showOn: "button",
        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        buttonImageOnly: false,
        dateFormat: 'dd/mm/yy'



    });




    //toggle chọn ngày tháng
    //Create by: NHTHAI 24/5/2019
    $(".toggle-date-details").click(function () {
        var value = $(this).text();
        var attr = $(this).attr("numberfill");
        $("#c").val(value);
        $(".toggle-date").hide();
        changeDateTimeByCase(attr, "#start-date", "#end-date");
    });

    //toggle chọn phep lọc
    //Create by: NHTHAI 24/5/2019
    $(".child1").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i1").text(value).attr("FilterType1", atr);
        $(".toggle-calculation").hide();
    });
    $(".child2").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i2").text(value).attr("FilterType1", atr);;
        $(".toggle-calculation").hide();
    });
    $(".child3").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i3").text(value).attr("FilterType1", atr);;
        $(".toggle-calculation").hide();
    });
    $(".child4").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i4").text(value).attr("FilterType1", atr);;
        $(".toggle-calculation").hide();
    });
    $(".child5").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i5").text(value).attr("FilterType1", atr);;
        $(".toggle-calculation").hide();
    });
    $(".child6").click(function () {

        var value = $(this).attr("name");
        var atr = $(this).attr("FilterType");
        $("#i6").text(value).attr("FilterType1", atr);;
        $(".toggle-calculation").hide();
    });
    $(".dialog-content").on("click", ".toggle-nhacungcap-content-element", function() {
        var child1 = $(this).children()[0];
        var child2 = $(child1).next();
        var value1 = $(child1).text();

        var value2 = $(child2).text();

        var varlue = $(this).attr("codencc");

        $(".item2").val(value2);
        $(".item1").val(value1).attr("valueNCC", varlue);
        
    });
    $(".dialog-content").on("click", ".toggle-nhacungcap-content-element3", function() {
        var child1 = $(this).children()[0];
        var child2 = $(child1).next();
        var value1 = $(child1).text();
        var valur = $(this).attr("codenv");
        var value2 = $(child2).text();
        $(".codestaff").val(value1).attr("valueNV", valur);
        $(".namestaff").val(value2);

    });
    $(document).on("click", ".toggle-stock-content-element", function () {


        var value = $($(this).children()[1]).text();
        var valueattr = $(this).attr("stockid");
        var i = $(".toggle-stock").data('current-row1'); //dialog-td
        $(i).find("[fielditemname2='StockName']").val(value);
        $(i).attr("StockID", valueattr);
        $(".toggle-stock").hide();

    })


    $(".listtime-element").click(function () {

        var value = $(this).text();
        $(".timepicker").val(value);
        $(".listtime").hide();
    })
    $(".toggle-switch-element").click(function () {

        var valur = $(this).text();
        $(".text-switch").text(valur);
        $(".toggle-switch").hide();
        if ($(".text-switch").text() === $("#tiengui").text()) {
            $("#uynhiemchi").css("display", "inline-block");
            $("#phieuchi").css("display", "none");
            $("#uynhiemchi").trigger("click")
        }
        else {
            $("#uynhiemchi").css("display", "none");
            $("#phieuchi").css("display", "inline-block");
            $("#phieuchi").trigger("click")
        }
    })


    //toggle chọn Phân trang    
    //Create by: NHTHAI 24/5/2019
    $(".pagination-value").click(function () {

        var value = $(this).attr("value");

        $("#pagination-value-choise").text(value);
        $(".paginationn-toggle").hide();
    });




    //validate ngày tháng
    //Create by NHTHAI 25/05/2019
    $("#start-date").keyup(function () {
        var value = $(this).val();

        if (isValidDate(value, "DMY")) {
            $("#start-date-border").css("border", "1px solid #007abc");

            $(this).blur(function () {
                $("#start-date").val(value);
                $("#start-date-border").css("border", "1px solif #e1e1e1;");
            })

        }
        else {
            $("#start-date-border").css("border", "1px solid red");
            $("#start-date-border").focusout(function () {
                $("#start-date").val("01/06/2019");
                $("#start-date-border").css("border", "1px solid #e1e1e1");
            });
        }
    });

    $("#end-date").keyup(function () {
        var value = $(this).val();

        if (isValidDate(value, "DMY")) {
            $("#end-date-border").css("border", "1px solid #007abc");
            $(this).blur(function () {
                $("#end-date").val(value);
                $("#end-date-border").css("border", "1px solid #e1e1e1;");
            })
        }
        else {
            $("#end-date-border").css("border", "1px solid red");
            $("#end-date-border").focusout(function () {
                $("#end-date").val("31/06/2019");
                $("#end-date-border").css("border", "1px solid #e1e1e1");
            });
        }
    });

    $("#fill-date").keyup(function () {
        var value = $(this).val();

        if (isValidDate(value, "DMY")) {
            $("#fill-date-border").css("border", "1px solid blue");
            $(this).blur(function () {
                $("#end-date").val(value);
                $("#end-date-border").css("border", "1px solid #e1e1e1;");
            })
        }
        else {
            $("#fill-date-border").css("border", "1px solid red");
            $("#fill-date-border").focusout(function () {
                $("#fill-date").val("");
                $("#fill-date-border").css("border", "1px solid #e1e1e1");
            });
        }
    });


    //ẩn hiện tabmenu trong dialog insert
    $(".dialog-content").on("click", "#phieuchi", function () {

        $(".dialog-content-details-info2").show();
        $(".dialog-content-details-info1").hide();
        $(".dialog-content-details-info3").hide();
        $(".dialog-content-details-info4").hide();
        $(this).children().addClass("color-tab").removeClass("color-tab1")
        $("#phieunhap").children().addClass("color-tab1").removeClass("color-tab")
        $("#hoadon").children().addClass("color-tab1").removeClass("color-tab")
        $("#uynhiemchi").children().addClass("color-tab1").removeClass("color-tab")

    })
    $(".dialog-content").on("click", "#phieunhap", function () {

        $(".dialog-content-details-info1").show();
        $(".dialog-content-details-info2").hide();
        $(".dialog-content-details-info3").hide();
        $(".dialog-content-details-info4").hide();

        $(this).children().addClass("color-tab").removeClass("color-tab1")
        $("#hoadon").children().addClass("color-tab1").removeClass("color-tab")
        $("#phieuchi").children().addClass("color-tab1").removeClass("color-tab")
        $("#uynhiemchi").children().addClass("color-tab1").removeClass("color-tab")

    })
    $(".dialog-content").on("click", "#hoadon", function () {

        $(".dialog-content-details-info3").show();
        $(".dialog-content-details-info2").hide();
        $(".dialog-content-details-info1").hide();
        $(".dialog-content-details-info4").hide();

        $(this).children().addClass("color-tab").removeClass("color-tab1")
        $("#phieuchi").children().addClass("color-tab1").removeClass("color-tab")
        $("#phieunhap").children().addClass("color-tab1").removeClass("color-tab")
        $("#uynhiemchi").children().addClass("color-tab1").removeClass("color-tab")
    })
    $(".dialog-content").on("click", "#uynhiemchi", function () {

        $(".dialog-content-details-info4").show();
        $(".dialog-content-details-info2").hide();
        $(".dialog-content-details-info1").hide();
        $(".dialog-content-details-info3").hide();

        $(this).children().addClass("color-tab").removeClass("color-tab1")
        $("#phieuchi").children().addClass("color-tab1").removeClass("color-tab")
        $("#hoadon").children().addClass("color-tab1").removeClass("color-tab")
        $("#phieunhap").children().addClass("color-tab1").removeClass("color-tab")
    })
    $(".date-choise").change(function () {


        var value = $(this).val();
        $(".date-choise").val(value);

    })



    $("#arrow-employee").click(function () {
        $(".toggle-emoloyee-gender").toggle();
    })

    $("[value-gender]").click(function () {
        if ($(this).attr("value-gender") != "") {
            $(".add-gender").text($(this).text())
            $(".add-gender").attr("val1", $(this).attr("value-gender"))
           
        }
        else {
            $(".add-gender").text($(this).text())
            $(".add-gender").attr("val1", "")
            
        }
        $(".toggle-emoloyee-gender").hide();
    })


});



















