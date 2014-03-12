(function ( $ ) {
    $.fn.sparklify = function(options) {
        this.each(function(n, img) {

          $img = $(img);
          if(options.intensity == undefined) options.intensity = 1;
          if(options.speed == undefined) options.speed = 10;
          if(options.size == undefined) options.size = 6;
          if(options.symbols == undefined) options.symbols = ["+", "*","★","●"];
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
          var w = $img.width();
          var h = $img.height();
          $canvas.data("sparklify", { img: img, $img: $img, options: options, width: w, height: h, pixData: undefined });

          function rand(n) {
            return Math.floor(Math.random() * n) + 1
          }

          //var imageObj = new Image();

          function render($canvas) {
              var data = $canvas.data("sparklify");
              var canvas = $canvas[0];
              var ctx = canvas.getContext("2d");
              //console.log([data.$img[0], $canvas[0], data.width, data.$img.height()]);
            canvas.width = data.width;
            canvas.height = data.height;
            ctx.font = data.options.size + 'px';
            ctx.fillStyle = data.options.color;
            if(data.options.glow != 0) {
                ctx.shadowColor = data.options.color;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = data.options.glow;
            }

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
            if(data.pixData === undefined) data.pixData = ctx.getImageData(0, 0, w, h).data;
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