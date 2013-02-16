/**
 * FoxShow 1.0 图片轮播
 * Date: 2011-06-27 17:15:00 +0800
 * Author: Damien (http://foxsp.com)
 */
$(function() {
	t = false;
	str = '';
	s = 500;
	a = 5000;
	w = $('#ac').attr('w');		//单个图片宽度
	n = $('#ac li').length;		//图片个数
	nw = n*18;					//id=ni的宽度
	c = 0;
	$('#ac').width(w * n);
	$('#ac li').each(function(i) {
		str += '<span></span>';
	});
	$('#ni').width(nw).html(str);
	$('#ni').css('left', (w-nw)/2);
	$('#ni span:first').addClass('on');
	function cur(ele, ac) {
		ele = $(ele) ? $(ele) : ele;
		ele.addClass(ac).siblings().removeClass(ac);
	}
	$('#foxshow .next').click(function() {
		slide(1);
	});
	$('#foxshow .prev').click(function() {
		slide(-1);
	});
	function slide(j) {
		if ($('#ac').is(':animated') == false) {
			c += j;
			if (c != -1 && c != n) {
				$('#ac').animate({'marginLeft': -c * w + 'px'},s);
			} else if (c == -1) {
				c = n - 1;
				$("#ac").css({"marginLeft": -(w * (c - 1)) + "px"});
				$("#ac").animate({"marginLeft": -(w * c) + "px"},s);
			} else if (c == n) {
				c = 0;
				$("#ac").css({"marginLeft": -w + "px"});
				$("#ac").animate({"marginLeft": 0 + "px"},s);
			}
			cur($('#ni span').eq(c), 'on');
		}
	}
	$('#ni span').click(function() {
		c = $(this).index();
		fade(c);
		cur($('#ni span').eq(c), 'on');
	});
	function fade(i) {
		if ($('#ac').css('marginLeft') != -i * w + 'px') {
			$('#ac').css('marginLeft', -i * w + 'px');
			$('#ac').fadeOut(0,function() {
				$('#ac').fadeIn(500);
			})
		}
	}
	function start() {
		t = setInterval(function() {
			slide(1);
		},a);
	}
	function stopt() {
		if(t){
			clearInterval(t);
		}
	}
	
	$("#foxshow").mouseover(stopt).mouseout(start);
	start();
});
