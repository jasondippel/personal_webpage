
var o = {
    init: function () {
        this.diagram();
    },
    random: function (l, u) {
        return Math.floor((Math.random() * (u - l + 1)) + l);
    },
    diagram: function () {
        var originX = 10;
        var originY = 70;
        var barHeight = 30;
        var barMargin = 10;

        Raphael.fn.roundedRectangle = function (x, y, w, h, r1, r2, r3, r4){
            var array = [];
            array = array.concat(["M",x,r1+y, "Q",x,y, x+r1,y]); 
            array = array.concat(["L",x+w-r2,y, "Q",x+w,y, x+w,y+r2]); 
            array = array.concat(["L",x+w,y+h-r3, "Q",x+w,y+h, x+w-r3,y+h]); 
            array = array.concat(["L",x+r4,y+h, "Q",x,y+h, x,y+h-r4, "Z"]);  
            return this.path(array);
        };

        // calculations to determin how wide graph should be (max size of 700px wide)
        var width = $( window ).width() - 100;
        if(width > 700) {
            width = 700;
        } else if (width < 300) {
            width = 300;
        }

        var height = width/2; //460,330
        if(height > 460) {
            height = 460;
        } else if (height < 350) {
            height = 350;
        }

        var r = Raphael('diagram', width, height);

        // We don't need the customAttributes, so we drop that, 
        // and replace with a simple call to rect()
        r.rect(10, 10, 260, barHeight+10, 3).attr({
            stroke: 'none',
            fill: '#222'
        });
        // Similarly, we reposition the title to center
        // it with our new rectangle.
        var title = r.text(140, 30, 'Skills').attr({
            font: '1.7em Arial',
            fill: '#fff'
        }).toFront();

        $('.get').find('.skill').each(function (i) {
            // I've added in a width field, and calculate
            // it based on turning its value to a percentage
            // of the width of the Raphael element.
            var t = $(this),
                color = t.find('.color').val(),
                value = t.find('.percent').val(),
                width = r.width * (t.find('.percent').val() * .01),
                text = t.find('.text').text();
            // create a new rectangle, providing X, Y, width, 
            // and height. Base the fill and stroke on the color
            var z = r.roundedRectangle(originX, originY, width, barHeight, 0, 15, 15, 0).attr({
                'fill': color,
                'stroke': color,
                'stroke-width': 0
            });
            // Create the text that goes on the rectangles for each
            // skill. Align left and indent slightly.
            var barText = r.text(originX+20, originY+15, text).attr({
                font: '1em Arial',
                fill: '#fff',
                'stroke-width': 0,
                "text-anchor":"start"
            }).toFront();
            // var hoverZone = r.roundedRectangle(originX, originY, width, barHeight, 0, 5, 5, 0).attr({
            //     'stroke-width': 0
            // }).toFront();
            // update our originY to accomodate shifting the next
            // bar down by the barHeight + barMargin
            originY = originY + barHeight + barMargin;

            z.mouseover(function () {
                // I added X in to animation, so that it would
                // appear to expand from the left, and the 
                // expansion would not bleed off-canvas
                z.animate({
                    'x': 10,
                    'stroke-width': 10,
                    opacity: .75
                }, 150, 'ease-in-ease-out');
                if (Raphael.type != 'VML') //solves IE problem
                // this.toFront();
                barText.animate({
                    fill: '#2e2e2e'
                }, 150, 'ease-in-ease-out');
            }).mouseout(function () {
                // and here I revert back to the originX after the
                // mouse has moved on...
                z.animate({
                    x: originX,
                    'stroke-width': 0,
                    opacity: 1
                }, 150, 'ease-in-ease-out');
                barText.animate({
                    fill: '#fff'
                }, 150, 'ease-in-ease-out');
            });

            barText.mouseover(function () {
                // I added X in to animation, so that it would
                // appear to expand from the left, and the 
                // expansion would not bleed off-canvas
                z.animate({
                    'x': 10,
                    'stroke-width': 10,
                    opacity: .75
                }, 150, 'ease-in-ease-out');
                if (Raphael.type != 'VML') //solves IE problem
                // this.toFront();
                barText.animate({
                    fill: '#2e2e2e'
                }, 150, 'ease-in-ease-out');
            }).mouseout(function () {
                // and here I revert back to the originX after the
                // mouse has moved on...
                z.animate({
                    x: originX,
                    'stroke-width': 0,
                    opacity: 1
                }, 150, 'ease-in-ease-out');
                barText.animate({
                    fill: '#fff'
                }, 150, 'ease-in-ease-out');
            });
        });
    }
}

$(function () {
    o.init();

    $( window ).resize(function() {
        $('#diagram').html('');
        o.init();
    });
    
});