(function ( $ ) {
    $.fn.sparklify = function(options) {
        this.each(function(n, img) {

          $img = $(img);
          if(options.intensity == undefined) options.intensity = 1;
          if(options.speed == undefined) options.speed = 10;
          if(options.size == undefined) options.size = 6;
          if(options.symbols == undefined) options.symbols = ["+", "*","★","●"];
          if(options.color == undefined) options.color = "white";


          var $canvas = $("<canvas></canvas>");
          $canvas.text($img.attr("alt"));
          $canvas.data("sparklify", { img: img, $img: $img, options: options });
          var id = $img.attr("id");
          $img.attr("id", "orig_" + id);
          $canvas.attr("id", id);
          $canvas.attr("class", $img.attr("class"));

          var canvas = $canvas[0];
          $canvas.insertAfter(img);
          $img.hide();
          //$img.replaceWith($canvas);
          var ctx = canvas.getContext("2d");


          function rand(n) {
            return Math.floor(Math.random() * n) + 1
          }

          //var imageObj = new Image();

          function render($canvas) {
              var data = $canvas.data("sparklify");
              var canvas = $canvas[0];
              var ctx = canvas.getContext("2d");
              //console.log([data.$img[0], $canvas[0], data.$img.width(), data.$img.height()]);
            canvas.width = data.$img.width();
            canvas.height = data.$img.height();
            ctx.font = data.options.size + 'px';
            ctx.fillStyle = data.options.color;
            ctx.shadowColor = data.options.color;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 10;

            var itterate = (data.$img.width() + data.$img.height())/data.options.symbols.length * data.options.intensity;

            function drawChars(indx, chr) {
              for (var i = 0; i < itterate; i++) {
                var x = rand(data.$img.width());
                var y = rand(data.$img.height());

                var imgd = ctx.getImageData(x, y, 1, 1);
                var pix = imgd.data;
                if(pix[3] == 255) {
                  ctx.fillText(chr, x, y);
                }
              }
            }

            ctx.drawImage(data.img, 0, 0, data.$img.width(), data.$img.height());

            $.each(data.options.symbols, drawChars);


            setTimeout(render, (1/data.options.speed) * 1000, $canvas);
          }

          img.onload = function() {render($canvas)};
          img.crossOrigin = 'anonymous';
          img.src = img.src;
          //render();
          //imageObj.src = imgUrl;
          return this;
        });
    }
}( jQuery ));