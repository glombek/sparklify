/*

★ sparklify.js ★

http://sparklify.joe.gl

By http://joe.gl/ombek

*/

(function ( $ ) {
    $.fn.sparklify = function(options) {
        this.each(function(n, img) {

          $img = $(img);
          //$img.load(function()  {
              if(!options) options = {};
              if(options.intensity == undefined) options.intensity = 1;
              if(options.speed == undefined) options.speed = 10;
              if(options.size == undefined) options.size = 10;
              if(options.symbols == undefined) options.symbols = ["+", "*","★","●","."];
              if(options.color == undefined) options.color = "white";
              if(options.glow == undefined) options.glow = 0;

              var $canvas = $("<canvas></canvas>");
              $canvas.text($img.attr("alt"));

              var id = $img.attr("id");
              $img.attr("id", "orig_" + id);
              $canvas.attr("id", id);
              $canvas.attr("class", $img.attr("class"));

              var canvas = $canvas[0];
              $canvas.insertAfter(img);
              $img.hide();
              //$img.replaceWith($canvas);
              var ctx = canvas.getContext("2d");
              $canvas.data("sparklify", { img: img, $img: $img, options: options, width: undefined, height: undefined, pixData: undefined });

              function rand(n) {
                return Math.floor(Math.random() * n) + 1
              }

              //var imageObj = new Image();

              function render($canvas) {
                var data = $canvas.data("sparklify");
                var canvas = $canvas[0];
                var ctx = canvas.getContext("2d");
                if(data.width===undefined) data.width = data.$img.width();
                if(data.height===undefined) data.height = data.$img.height();
                canvas.width = data.width;
                canvas.height = data.height;


                var itterate = (data.width + data.height)/data.options.symbols.length * data.options.intensity;

                function drawChars(indx, chr) {
                  for (var i = 0; i < itterate; i++) {
                    var x = rand(data.width);
                    var y = rand(data.height);

                    //var imgd = ctx.getImageData(x, y, 1, 1);
                    //var pixData = imgd.data;

                    if(data.pixData[((data.width * y) + x) * 4 + 3] == 255) {
                        //if(pixData[3] == 255) {
                      ctx.fillText(chr, x, y);
                    }
                  }
                }

                ctx.drawImage(data.img, 0, 0, data.width, data.height);

                  ctx.font = data.options.size + 'px sans-serif';
                ctx.fillStyle = data.options.color;
                if(data.options.glow != 0) {
                    ctx.shadowColor = data.options.color;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = data.options.glow;
                }
                if(data.pixData === undefined) data.pixData = ctx.getImageData(0, 0, data.width, data.height).data;
                $.each(data.options.symbols, drawChars);


                setTimeout(render, (1/data.options.speed) * 1000, $canvas);
              }

              img.onload = function() {render($canvas)};
              img.crossOrigin = 'anonymous';
              img.src = img.src;
              //render();
              //imageObj.src = imgUrl;
              return this;
          //});
        });
    }
}( jQuery ));