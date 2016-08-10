/******Created by 萌杰 on 2016/7/27.*********/
/*选项卡*/
tab();
function tab() {
    var inner = document.getElementById('div1');
    var aLi = inner.getElementsByTagName('li');
    var aDiv = inner.getElementsByTagName('input');

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onclick = function () {
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className = '';
                aDiv[j].className = '';
            }
            aLi[this.index].className = 'bg';
            aDiv[this.index].className = 'input1';
        }
    }
}
/*轮播图*/
(function () {
    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oBox.getElementsByTagName('li');
    var oBtnLeft = oBox.getElementsByTagName('a')[0];
    var oBtnRight = oBox.getElementsByTagName('a')[1];
    var data = null;
    var step = 0;
    var autoTimer = null;
    var interval = 2000;

    getData();
    function getData() {
        var xml = new XMLHttpRequest;
        xml.open('get', 'json/data.txt?=' + Math.random(), false);
        xml.onreadystatechange = function () {
            if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                data = utils.jsonParse(xml.responseText);
            }
        };
        xml.send(null);
    }

    //2.绑定数据
    bind();
    function bind() {
        var str1 = '';
        var str2 = '';
        for (var i = 0; i < data.length; i++) {
            str1 += '<div><img realImg="' + data[i].imgSrc + '" alt=""/></div>';
            str2 += i === 0 ? '<li class="bg"></li>' : '<li></li>';
        }
        oBoxInner.innerHTML = str1;
        oUl.innerHTML = str2;
    }

    //3.延迟加载
    lazyImg();
    function lazyImg() {
        for (var i = 0; i < aImg.length; i++) {
            var tmpImg = new Image;
            tmpImg.src = aImg[i].getAttribute('realImg');
            tmpImg.index = i;
            tmpImg.onload = function () {
                aImg[this.index].src = this.src;
                utils.css(aDiv[0], 'zIndex', 1);
                zhufengAnimate(aDiv[0], {opacity: 1}, 1000);
            }
        }
    }

    // 4.自动渐隐渐现轮播图
    clearInterval(autoTimer);
    autoTimer = setInterval(autoMove, interval);
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            var curEle = aDiv[i];
            if (i === step) {
                utils.css(curEle, 'zIndex', 1);
                zhufengAnimate(curEle, {opacity: 1}, 500, function () {
                    var siblings = utils.siblings(this);
                    for (var k = 0; k < siblings.length; k++) {
                        utils.css(siblings[k], 'opacity', 0);
                    }
                })
            } else {
                utils.css(curEle, 'zIndex', 0)
            }

        }
        bannerTip();
    }

    //5.焦点自动轮播
    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = i === step ? 'bg' : '';
        }
    }

    //6.移入移出
    oBox.onmouseover = function () {
        clearInterval(autoTimer);
        oBtnLeft.style.display = oBtnRight.style.display = 'block';
    };
    oBox.onmouseout = function () {
        autoTimer = setInterval(autoMove, interval);
        oBtnLeft.style.display = oBtnRight.style.display = 'none';
    };
    //7.点击焦点手动切换
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                step = this.index;
                setBanner();
            }
        }
    }

    //8.点击左右按钮手动切换
    oBtnRight.onclick = autoMove;
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length;
        }
        step--;
        setBanner();
    }


})();
/*Hi范儿*/
HiFas();
function HiFas() {
    var box1 = document.getElementById('Hi');
    var aLi = box1.getElementsByTagName('li');
    var aDiv = box1.getElementsByTagName('div')
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onclick = function () {
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className = '';
                aDiv[j].className = '';
            }
            aLi[this.index].className = 'bt';
            aDiv[this.index].className = 'bg';
        }
    }
}
boor();
function boor() {
    var box1 = document.getElementById('HiFa');
    var hei = box1.getElementsByTagName('ul')[0]
    var aLi = hei.getElementsByTagName('li');
    var aDiv = utils.getByClass(box1, 'hahaha');
    console.log(aLi)
    for (var i = 0; i < aLi.length; i++) {

        (function (index) {
            aLi[index].onclick = function () {
                for (var j = 0; j < aLi.length; j++) {

                    utils.removeClass(aLi[j], 'bg')
                    utils.removeClass(aDiv[j], 'hehe')
                }
                aLi[index].className = 'bg';
                utils.addClass(aDiv[index], ' hehe')
            }
        })(i)
    }
}