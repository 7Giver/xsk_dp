/*! xdnphb-html-rong 2016-11-23 */
!
  function() {
      function a() {
          g($G("videoUrl")),
            b(),
            function() {
                var a, b = editor.selection.getRange().getClosedNode();
                if (b && b.className) {
                    var d = "edui-faked-video" == b.className,
                      e = b.className.indexOf("edui-upload-video") != -1;
                    if (d || e) {
                        $G("videoUrl").value = a = b.getAttribute("_url"),
                          $G("videoWidth").value = b.width,
                          $G("videoHeight").value = b.height;
                        var f = domUtils.getComputedStyle(b, "float"),
                          g = domUtils.getComputedStyle(b.parentNode, "text-align");
                        c("center" === g ? "center": f)
                    }
                    e && (k = !0)
                }
                h(a)
            } ()
      }
      function b() {
          dialog.onok = function() {
              $G("preview").innerHTML = "",
                d()
          },
            dialog.oncancel = function() {
                $G("preview").innerHTML = ""
            }
      }
      function c(a) {
          for (var b, c = $G("videoFloat").children, d = 0; b = c[d++];) b.getAttribute("name") == a ? "focus" != b.className && (b.className = "focus") : "focus" == b.className && (b.className = "")
      }
      function d() {
          var a = $G("videoUrl").value;
          return !! a && void editor.execCommand("insertvideo", {
                url: f(a),
                width: 420,
                height: 280,
                vid: e(f(a))
            },
            k ? "upload": null)
      }
      function e(a) {
          var b, c;
          c = a.split("?")[1] ? a.split("?")[1].split("&") : [];
          for (var d = 0; d < c.length; d++) {
              var e = c[d].split("=");
              "vid" == e[0] && (b = e[1])
          }
          return b
      }
      function f(a) {
          if (!a) return "";
          a = utils.trim(a);
          var b = e(a);
          return a = b ? utils.trim(a).replace(/v\.qq\.com\/[\w]+\/[\w]+\/[\w]+\/([\w]+)\.html/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=" + b).replace(/v\.qq\.com\/[\w]+\/[\w]+\/([\w]+)\.html/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=" + b).replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=" + b) : a.replace(/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i, "player.youku.com/player.php/sid/$1/v.swf").replace(/(www\.)?youtube\.com\/watch\?v=([\w\-]+)/i, "www.youtube.com/v/$2").replace(/youtu.be\/(\w+)$/i, "www.youtube.com/v/$1").replace(/v\.ku6\.com\/.+\/([\w\.]+)\.html.*$/i, "player.ku6.com/refer/$1/v.swf").replace(/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i, "player.56.com/v_$1.swf").replace(/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i, "player.56.com/v_$1.swf").replace(/v\.pps\.tv\/play_([\w]+)\.html.*$/i, "player.pps.tv/player/sid/$1/v.swf").replace(/www\.letv\.com\/ptv\/vplay\/([\d]+)\.html.*$/i, "i7.imgs.letv.com/player/swfPlayer.swf?id=$1&autoplay=0").replace(/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i, "www.tudou.com/v/$1").replace(/v\.qq\.com\/[\w]+\/[\w]+\/[\w]+\/([\w]+)\.html/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=$1").replace(/v\.qq\.com\/[\w]+\/[\w]+\/([\w]+)\.html/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=$1").replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&vid=$1").replace(/my\.tv\.sohu\.com\/[\w]+\/[\d]+\/([\d]+)\.shtml.*$/i, "share.vrs.sohu.com/my/v.swf&id=$1")
      }
      function g(a) {
          browser.ie ? a.onpropertychange = function() {
              h(this.value)
          }: a.addEventListener("input",
            function() {
                h(this.value)
            },
            !1)
      }
      function h(a) {
          if (a) {
              var b = f(a),
                c = e(b);
              $G("preview").innerHTML = '<div class="previewMsg"><span>' + lang.urlError + '</span></div><embed wmode="direct" flashvars="vid=' + c + '&amp;tpid=0&amp;showend=1&amp;showcfg=1&amp;searchbar=1&amp;pic=//shp.qpic.cn/qqvideo_ori/0/g03483q9uyh_496_280/0&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;shownext=1&amp;list=2&amp;autoplay=0" class="previewVideo" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + b + '" width="100%" height="100%" quality="high" bgcolor="#000000" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/" title="Adobe Flash Player"></embed>'
          }
      }
      function i(a) {
          this.$wrap = a.constructor == String ? $("#" + a) : $(a),
            this.init()
      }
      var j = [],
        k = !1;
      window.onload = function() {
          $focus($G("videoUrl")),
            a()
      },
        i.prototype = {
            init: function() {
                this.fileList = [],
                  this.initContainer(),
                  this.initUploader()
            },
            initContainer: function() {
                this.$queue = this.$wrap.find(".filelist")
            },
            initUploader: function() {
                function a(a) {
                    var b = h('<li id="' + a.id + '"><p class="title">' + a.name + '</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),
                      c = h('<div class="file-panel"><span class="cancel">' + lang.uploadDelete + '</span><span class="rotateRight">' + lang.uploadTurnRight + '</span><span class="rotateLeft">' + lang.uploadTurnLeft + "</span></div>").appendTo(b),
                      d = b.find("p.progress span"),
                      e = b.find("p.imgWrap"),
                      g = h('<p class="error"></p>').hide().appendTo(b),
                      i = function(a) {
                          switch (a) {
                              case "exceed_size":
                                  text = lang.errorExceedSize;
                                  break;
                              case "interrupt":
                                  text = lang.errorInterrupt;
                                  break;
                              case "http":
                                  text = lang.errorHttp;
                                  break;
                              case "not_allow_type":
                                  text = lang.errorFileType;
                                  break;
                              default:
                                  text = lang.errorUploadRetry
                          }
                          g.text(text).show()
                      };
                    "invalid" === a.getStatus() ? i(a.statusText) : (e.text(lang.uploadPreview), "|png|jpg|jpeg|bmp|gif|".indexOf("|" + a.ext.toLowerCase() + "|") == -1 ? e.empty().addClass("notimage").append('<i class="file-preview file-type-' + a.ext.toLowerCase() + '"></i><span class="file-title">' + a.name + "</span>") : browser.ie && browser.version <= 7 ? e.text(lang.uploadNoPreview) : f.makeThumb(a,
                      function(a, b) {
                          if (a || !b || /^data:/.test(b) && browser.ie && browser.version <= 7) e.text(lang.uploadNoPreview);
                          else {
                              var c = h('<img src="' + b + '">');
                              e.empty().append(c),
                                c.on("error",
                                  function() {
                                      e.text(lang.uploadNoPreview)
                                  })
                          }
                      },
                      u, v), x[a.id] = [a.size, 0], a.rotation = 0, a.ext && B.indexOf(a.ext.toLowerCase()) != -1 || (i("not_allow_type"), f.removeFile(a))),
                      a.on("statuschange",
                        function(e, f) {
                            "progress" === f ? d.hide().width(0) : "queued" === f && (b.off("mouseenter mouseleave"), c.remove()),
                              "error" === e || "invalid" === e ? (i(a.statusText), x[a.id][1] = 1) : "interrupt" === e ? i("interrupt") : "queued" === e ? x[a.id][1] = 0 : "progress" === e && (g.hide(), d.css("display", "block")),
                              b.removeClass("state-" + f).addClass("state-" + e)
                        }),
                      b.on("mouseenter",
                        function() {
                            c.stop().animate({
                                height: 30
                            })
                        }),
                      b.on("mouseleave",
                        function() {
                            c.stop().animate({
                                height: 0
                            })
                        }),
                      c.on("click", "span",
                        function() {
                            var b, c = h(this).index();
                            switch (c) {
                                case 0:
                                    return void f.removeFile(a);
                                case 1:
                                    a.rotation += 90;
                                    break;
                                case 2:
                                    a.rotation -= 90
                            }
                            y ? (b = "rotate(" + a.rotation + "deg)", e.css({
                                "-webkit-transform": b,
                                "-mos-transform": b,
                                "-o-transform": b,
                                transform: b
                            })) : e.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + ~~ (a.rotation / 90 % 4 + 4) % 4 + ")")
                        }),
                      b.insertBefore(o)
                }
                function b(a) {
                    var b = h("#" + a.id);
                    delete x[a.id],
                      c(),
                      b.off().find(".file-panel").off().end().remove()
                }
                function c() {
                    var a, b = 0,
                      c = 0,
                      d = q.children();
                    h.each(x,
                      function(a, d) {
                          c += d[0],
                            b += d[0] * d[1]
                      }),
                      a = c ? b / c: 0,
                      d.eq(0).text(Math.round(100 * a) + "%"),
                      d.eq(1).css("width", Math.round(100 * a) + "%"),
                      e()
                }
                function d(a, b) {
                    if (a != w) {
                        var c = f.getStats();
                        switch (n.removeClass("state-" + w), n.addClass("state-" + a), a) {
                            case "pedding":
                                k.addClass("element-invisible"),
                                  l.addClass("element-invisible"),
                                  p.removeClass("element-invisible"),
                                  q.hide(),
                                  m.hide(),
                                  f.refresh();
                                break;
                            case "ready":
                                p.addClass("element-invisible"),
                                  k.removeClass("element-invisible"),
                                  l.removeClass("element-invisible"),
                                  q.hide(),
                                  m.show(),
                                  n.text(lang.uploadStart),
                                  f.refresh();
                                break;
                            case "uploading":
                                q.show(),
                                  m.hide(),
                                  n.text(lang.uploadPause);
                                break;
                            case "paused":
                                q.show(),
                                  m.hide(),
                                  n.text(lang.uploadContinue);
                                break;
                            case "confirm":
                                if (q.show(), m.hide(), n.text(lang.uploadStart), c = f.getStats(), c.successNum && !c.uploadFailNum) return void d("finish");
                                break;
                            case "finish":
                                q.hide(),
                                  m.show(),
                                  c.uploadFailNum ? n.text(lang.uploadRetry) : n.text(lang.uploadStart)
                        }
                        w = a,
                          e()
                    }
                    g.getQueueCount() ? n.removeClass("disabled") : n.addClass("disabled")
                }
                function e() {
                    var a, b = "";
                    "ready" === w ? b = lang.updateStatusReady.replace("_", r).replace("_KB", WebUploader.formatSize(s)) : "confirm" === w ? (a = f.getStats(), a.uploadFailNum && (b = lang.updateStatusConfirm.replace("_", a.successNum).replace("_", a.successNum))) : (a = f.getStats(), b = lang.updateStatusFinish.replace("_", r).replace("_KB", WebUploader.formatSize(s)).replace("_", a.successNum), a.uploadFailNum && (b += lang.updateStatusError.replace("_", a.uploadFailNum))),
                      m.html(b)
                }
                var f, g = this,
                  h = jQuery,
                  i = g.$wrap,
                  k = i.find(".filelist"),
                  l = i.find(".statusBar"),
                  m = l.find(".info"),
                  n = i.find(".uploadBtn"),
                  o = (i.find(".filePickerBtn"), i.find(".filePickerBlock")),
                  p = i.find(".placeholder"),
                  q = l.find(".progress").hide(),
                  r = 0,
                  s = 0,
                  t = window.devicePixelRatio || 1,
                  u = 113 * t,
                  v = 113 * t,
                  w = "",
                  x = {},
                  y = function() {
                      var a = document.createElement("p").style,
                        b = "transition" in a || "WebkitTransition" in a || "MozTransition" in a || "msTransition" in a || "OTransition" in a;
                      return a = null,
                        b
                  } (),
                  z = editor.getActionUrl(editor.getOpt("videoActionName")),
                  A = editor.getOpt("videoMaxSize"),
                  B = (editor.getOpt("videoAllowFiles") || []).join("").replace(/\./g, ",").replace(/^[,]/, "");
                return WebUploader.Uploader.support() ? editor.getOpt("videoActionName") ? (f = g.uploader = WebUploader.create({
                    pick: {
                        id: "#filePickerReady",
                        label: lang.uploadSelectFile
                    },
                    swf: "../../third-party/webuploader/Uploader.swf",
                    server: z,
                    fileVal: editor.getOpt("videoFieldName"),
                    duplicate: !0,
                    fileSingleSizeLimit: A,
                    compress: !1
                }), f.addButton({
                    id: "#filePickerBlock"
                }), f.addButton({
                    id: "#filePickerBtn",
                    label: lang.uploadAddFile
                }), d("pedding"), f.on("fileQueued",
                  function(b) {
                      r++,
                        s += b.size,
                      1 === r && (p.addClass("element-invisible"), l.show()),
                        a(b)
                  }), f.on("fileDequeued",
                  function(a) {
                      r--,
                        s -= a.size,
                        b(a),
                        c()
                  }), f.on("filesQueued",
                  function(a) {
                      f.isInProgress() || "pedding" != w && "finish" != w && "confirm" != w && "ready" != w || d("ready"),
                        c()
                  }), f.on("all",
                  function(a, b) {
                      switch (a) {
                          case "uploadFinished":
                              d("confirm", b);
                              break;
                          case "startUpload":
                              var c = utils.serializeParam(editor.queryCommandValue("serverparam")) || "",
                                e = utils.formatUrl(z + (z.indexOf("?") == -1 ? "?": "&") + "encode=utf-8&" + c);
                              f.option("server", e),
                                d("uploading", b);
                              break;
                          case "stopUpload":
                              d("paused", b)
                      }
                  }), f.on("uploadBeforeSend",
                  function(a, b, c) {
                      c.X_Requested_With = "XMLHttpRequest"
                  }), f.on("uploadProgress",
                  function(a, b) {
                      var d = h("#" + a.id),
                        e = d.find(".progress span");
                      e.css("width", 100 * b + "%"),
                        x[a.id][1] = b,
                        c()
                  }), f.on("uploadSuccess",
                  function(a, b) {
                      var c = h("#" + a.id);
                      try {
                          var d = b._raw || b,
                            e = utils.str2json(d);
                          "SUCCESS" == e.state ? (j.push({
                              url: e.url,
                              type: e.type,
                              original: e.original
                          }), c.append('<span class="success"></span>')) : c.find(".error").text(e.state).show()
                      } catch(f) {
                          c.find(".error").text(lang.errorServerUpload).show()
                      }
                  }), f.on("uploadError",
                  function(a, b) {}), f.on("error",
                  function(b, c) {
                      "Q_TYPE_DENIED" != b && "F_EXCEED_SIZE" != b || a(c)
                  }), f.on("uploadComplete",
                  function(a, b) {}), n.on("click",
                  function() {
                      return ! h(this).hasClass("disabled") && void("ready" === w ? f.upload() : "paused" === w ? f.upload() : "uploading" === w && f.stop())
                  }), n.addClass("state-" + w), void c()) : void h("#filePickerReady").after(h("<div>").html(lang.errorLoadConfig)).hide() : void h("#filePickerReady").after(h("<div>").html(lang.errorNotSupport)).hide()
            },
            getQueueCount: function() {
                var a, b, c, d = 0,
                  e = this.uploader.getFiles();
                for (b = 0; a = e[b++];) c = a.getStatus(),
                "queued" != c && "uploading" != c && "progress" != c || d++;
                return d
            },
            refresh: function() {
                this.uploader.refresh()
            }
        }
  } ();