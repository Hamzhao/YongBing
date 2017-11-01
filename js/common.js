$(function(){
    $('#get-code').on('click', function () {
        sendcode();
    });
    /*发送手机验证码倒计时*/
    function sendcode() {
        $('#get-code').html("<span class='countdown'>60</span>秒后重获").prop("disabled", true);
        timer = setInterval(countdown, 1000);
    }

    function countdown() {
        var time = parseInt($(".countdown").html());
        if (time > 1) {
            $(".countdown").html(time - 1);
        } else {
            window.clearInterval(timer);
            $('#get-code').html("获取验证码").prop("disabled", false);
        }
    }
    /*发送手机验证码倒计时 END*/
    //ie兼容placeholder属性
    $(function(){
        $('input, textarea').placeholder({customClass:'my-placeholder'});
    })
    //图片截取hover
    $('.btn-group .btn').hover(function(){
        $('.btn-group').find('.tooltip').hide();
        $(this).find('.tooltip').show();
    },function(){
        $('.btn-group').find('.tooltip').hide();
    })

    //关闭tips
    $('.tip-close').on('click',function(){
        $(this).parent().remove();
    });
});

<!-- 选择照片js-->
function previewImage(file, id) {
    var MAXWIDTH;
    var MAXHEIGHT;
    var divid = 'preview' + id;
    var imgid = 'imghead' + id;
    var div = document.getElementById(divid);
    $('#upfile' + id).html(file.value);
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id='+imgid +'>';
        var img = document.getElementById(imgid);
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            img.style.marginLeft = rect.left + 'px';
            img.style.marginTop = rect.top + 'px';
        };
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    }
    else {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id='+imgid +'>';
        var img = document.getElementById(imgid);
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;margin-left:" + rect.left + "px;" + sFilter + src + "\"'></div>";
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {top: 0, left: 0, width: width, height: height};
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

// 弹窗效果popup
function seeImage(img, id) {
    var divid = '#popup_content_' + id;
    var windowW = $(window).width();
    var windowH = $(window).height();
    $(divid).find("img").css({"max-width":windowW*0.85,"max-height":windowH*0.85});
    var ow = $(divid).width();
    var oh = $(divid).height();
    $(divid).css({"margin-left": ow * (-0.5), "margin-top": oh * (-0.5)});
    $('.layerbg').show();
    $(img).siblings().show();
}
$(document).ready(function() {
    $(function () {
        $('.layerbg').click(function(){
            $(".popup_content").hide();
            $('.layerbg').hide();
            return false;
        });
    });
});
