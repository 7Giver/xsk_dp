(function () {
    var parent = window.parent;
    //dialog对象
    dialog = parent.$EDITORUI[window.frameElement.id.replace( /_iframe$/, '' )];
    //当前打开dialog的编辑器实例
    editor = dialog.editor;

    UE = parent.UE;

    domUtils = UE.dom.domUtils;

    utils = UE.utils;

    browser = UE.browser;

    ajax = UE.ajax;

    $G = function ( id ) {
        return document.getElementById( id )
    };
    //focus元素
    $focus = function ( node ) {
        setTimeout( function () {
            if ( browser.ie ) {
                var r = node.createTextRange();
                r.collapse( false );
                r.select();
            } else {
                node.focus()
            }
        }, 0 )
    };
    utils.loadFile(document,{
        href:editor.options.themePath + editor.options.theme + "/dialogbase.css?cache="+Math.random(),
        tag:"link",
        type:"text/css",
        rel:"stylesheet"
    });
    lang = editor.getLang(dialog.className.split( "-" )[2]);
    if(lang){
        domUtils.on(window,'load',function () {

            var langImgPath = editor.options.langPath + editor.options.lang + "/images/";
            //针对静态资源
            for ( var i in lang["static"] ) {
                var dom = $G( i );
                if(!dom) continue;
                var tagName = dom.tagName,
                    content = lang["static"][i];
                if(content.src){
                    //clone
                    content = utils.extend({},content,false);
                    content.src = langImgPath + content.src;
                }
                if(content.style){
                    content = utils.extend({},content,false);
                    content.style = content.style.replace(/url\s*\(/g,"url(" + langImgPath)
                }
                switch ( tagName.toLowerCase() ) {
                    case "var":
                        dom.parentNode.replaceChild( document.createTextNode( content ), dom );
                        break;
                    case "select":
                        var ops = dom.options;
                        for ( var j = 0, oj; oj = ops[j]; ) {
                            oj.innerHTML = content.options[j++];
                        }
                        for ( var p in content ) {
                            p != "options" && dom.setAttribute( p, content[p] );
                        }
                        break;
                    default :
                        domUtils.setAttributes( dom, content);
                }
            }
        } );
    }

    filterFile = function (file, {size=0, type='image'}) {
        return new Promise((resolve, reject) => {
            let rFilter = ''
            let rFilterTip = ''
            switch (type) {
                case 'image':
                    rFilter = /\/(?:jpeg|jpg|png|gif|webp)/i;
                    rFilterTip = "您必须选择一个有效的图像文件！"
                    break
                case 'video':
                    rFilter = /\/(?:mp4|quicktime|mov)/i;
                    rFilterTip = "您必须选择一个有效的视频文件！"
                    break
                default:
                    break
            }

            if (file.type && !rFilter.test(file.type)) {
                alert(rFilterTip);
                reject();
            } else if (!file.type) {
                let nameList = file.name.split('.')
                let type = nameList[nameList.length - 1]
                if (type && !rFilter.test(type)) {
                    alert(rFilterTip);
                    reject();
                } else {
                    resolve()
                }
            } else if (size > 0 && file.size > size) {
                let sizeStr = Math.floor(size / 1024 / 1024)
                let tipTxt = ''
                switch (type) {
                    case 'image':
                        tipTxt = `图片太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                        break
                    case 'video':
                        tipTxt = `视频太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                        break
                    default:
                        tipTxt = `文件太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                        break
                }
                alert(tipTxt);
                reject();
            } else {
                resolve()
            }
        })
    };
})();

