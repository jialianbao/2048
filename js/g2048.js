/**
 * Created on 2018/6/12
 */
$(function(){
    // 进来之后就开始
    $(document).ready(function(){
    	$('.score2').html(window.localStorage.getItem('fen')||0);
    	restSize();
    	getRP();
    	getRP();
//  	setTimeout(function(),10);
    });

	function restSize(){
		let h = $('.mainbox').width();
		$('.mainbox').css({
			'height':h+'px'
		})
		$('.cell').css({
			'line-height':$('.cell').width()+'px'
		})
	}
    // 屏幕改变大小时
    $(window).resize(restSize);
    //一些数据
    var randomNum,randomPos;
    var left ="left";                           //左
    var up ="up";                               //上
    var right ="right";                         //右
    var down ="down";                           //下

    // 开始的时候运行的
    function init(){
    	$('.cell').html('').removeClass('step').addClass('reCell');
    	getRP();
    	setTimeout(getRP,10)
    }
    $('.newGame').click(function(){init()});// 点击开始

    // 随机生成一个值
    function getRP(direction){
        randomNum=Math.random()<0.80?2:4;
        randomPos=$('.cell').eq(parseInt(Math.random()*16));
        if(randomPos.html()!=""){
            return getRP(direction);
        }else{
            randomPos.html(randomNum);
        }
        fenshu();
    }

    // 判断是否游戏结束，没结束再获取一个值
    function refreshPR(){
		if(checkGame()){
    		alert('游戏结束');
    	}else{
			setTimeout(function(){
//              if(Math.random()>.67){
//                  getRP();
//                  setTimeout(function(){getRP()},5)
//              }else{
                    getRP()
//              }
                getClass();
            },100)
    	}
   	}
    
    // 修改cell 的状态    有值的都要加上step
    function getClass(){
//      setTimeout(function(){
            for(var i=0;i<16;i++){
                if($('.cell').eq(i).html() >0){
                    $('.cell').eq(i).addClass('step')// 有值的加上step
                }else{
                	$('.cell').eq(i).removeClass('reCell');
                }
            }
//      },10)
    }

    // 
    var mybody = $('.mainbox').get(0);
    var startX, startY, moveEndX, moveEndY, X, Y, isScrolling;
    
    // 获取按下开始的x和y
    mybody.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
    // 获取按下结束的x和y
    mybody.addEventListener('touchend', function(e) {
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        isScrolling = Math.abs(X) < Math.abs(Y) ? 1:0;    //isScrolling涓�1鏃讹紝琛ㄧず绾靛悜婊戝姩锛�0涓烘í鍚戞粦鍔�
        if ( isScrolling < 1 && X < 0 ) {
            cellsMove(left);
        }else if ( isScrolling > 0 && Y < 0 ) {
            cellsMove(up);
        }else if ( isScrolling < 1 && X > 0 ) {
            cellsMove(right);
        }else if ( isScrolling > 0 && Y > 0) {
            cellsMove(down);
        }
    });
    
    // 按下按键运行方法的区别
    $(document).keydown(function (event){
        if(event.keyCode == 37){
            cellsMove(left);
        }else if(event.keyCode == 38){
            cellsMove(up);
        }else if(event.keyCode == 39){
            cellsMove(right);
        }else if(event.keyCode == 40){
            cellsMove(down);
        }
    });
    
    // 运行上下左右
    function cellsMove(direction){
    	let arr = [];
    	let tb = '';
    	let lr = '';
    	let arr2 = ['0','1','2','3'];
    	let lt = true;
    	let yidong = false;
    	if(direction==='left'||direction==='up'){
    		arr = ['1','2','3','4'];
    		lt = true;
    	}else{
    		arr = ['4','3','2','1'];
    		lt = false;
    	}
    	if(direction==='left'||direction==='right'){
    		tb = 'row';
    		lr = 'col';
    	}else{
    		lr = 'row';
    		tb = 'col';
    	}
		for(let i=1 ; i<=4 ; i++){
			// 有空缺时先补空缺
			var ll = 0;
			for(let f=0;f<arr.length-1;f++){
				if(!$('.'+tb+[i]+'.'+lr+arr[f]).html()){
					for(var n=f;n<3;n++){
						$('.'+tb+[i]+'.'+lr+arr[arr2[n]]).html($('.'+tb+[i]+'.'+lr+arr[arr2[n]-0+1]).html())
						if($('.'+tb+[i]+'.'+lr+arr[arr2[n]-0+1]).html()){
							yidong = true;
						}
//						console.log(arr2[n],'arr3[n]')
					}
					$('.'+tb+[i]+'.'+lr+arr[arr2[n]]).html('');
					f--;
					ll++;
				}
				if(ll>3){
					break;
				}
			}
			// 当第一个等于第二个的时候
    		if($('.'+tb+[i]+'.'+lr+arr[0]).html()==$('.'+tb+[i]+'.'+lr+arr[1]).html()&&!!$('.'+tb+[i]+'.'+lr+arr[0]).html()){
    			yidong = true;
	    		$('.'+tb+[i]+'.'+lr+arr[0]).html($('.'+tb+[i]+'.'+lr+arr[0]).html()-0+($('.'+tb+[i]+'.'+lr+arr[1]).html()-0));
	    		$('.'+tb+[i]+'.'+lr+arr[1]).html('')
	    		// 第三个等于第四个的时候
	    		if($('.'+tb+[i]+'.'+lr+arr[2]).html()==$('.'+tb+[i]+'.'+lr+arr[3]).html()&&$('.'+tb+[i]+'.'+lr+arr[2]).html()){
		    		$('.'+tb+[i]+'.'+lr+arr[1]).html($('.'+tb+[i]+'.'+lr+arr[2]).html()-0+($('.'+tb+[i]+'.'+lr+arr[3]).html()-0));
		    		$('.'+tb+[i]+'.'+lr+arr[2]).html('')
		    		$('.'+tb+[i]+'.'+lr+arr[3]).html('')
	    		}else{
	    			$('.'+tb+[i]+'.'+lr+arr[1]).html($('.'+tb+[i]+'.'+lr+arr[2]).html());
	    			$('.'+tb+[i]+'.'+lr+arr[2]).html($('.'+tb+[i]+'.'+lr+arr[3]).html());
	    			$('.'+tb+[i]+'.'+lr+arr[3]).html('');
	    		}
	    		// 第二个等于第三个的时候
    		}else if($('.'+tb+[i]+'.'+lr+arr[1]).html()==$('.'+tb+[i]+'.'+lr+arr[2]).html()&&!!$('.'+tb+[i]+'.'+lr+arr[1]).html()){
    			yidong = true;
	    		$('.'+tb+[i]+'.'+lr+arr[1]).html($('.'+tb+[i]+'.'+lr+arr[1]).html()-0+($('.'+tb+[i]+'.'+lr+arr[2]).html()-0));
	    		$('.'+tb+[i]+'.'+lr+arr[2]).html($('.'+tb+[i]+'.'+lr+arr[3]).html());
	    		$('.'+tb+[i]+'.'+lr+arr[3]).html('');
	    		// 第一个为空的时候
	    		if(!$('.'+tb+[i]+'.'+lr+arr[0]).html()){
	    			$('.'+tb+[i]+'.'+lr+arr[0]).html($('.'+tb+[i]+'.'+lr+arr[1]).html())
	    			$('.'+tb+[i]+'.'+lr+arr[1]).html($('.'+tb+[i]+'.'+lr+arr[2]).html())
	    			$('.'+tb+[i]+'.'+lr+arr[2]).html($('.'+tb+[i]+'.'+lr+arr[3]).html())
	    		}
	    		
    		}else if($('.'+tb+[i]+'.'+lr+arr[2]).html()==$('.'+tb+[i]+'.'+lr+arr[3]).html()&&$('.'+tb+[i]+'.'+lr+arr[2]).html()){
    			yidong = true;
	    		$('.'+tb+[i]+'.'+lr+arr[2]).html($('.'+tb+[i]+'.'+lr+arr[2]).html()-0+($('.'+tb+[i]+'.'+lr+arr[3]).html()-0));
	    		$('.'+tb+[i]+'.'+lr+arr[3]).html('');
    		}
		}
		if(yidong){
			refreshPR();
//	        setTimeout(refreshPR,100);// 50毫秒后运行
		}else{
			if(checkGame()){
	    		alert('游戏结束');
	    	}
		}
    }

    //是否结束游戏ameover
    function checkGame(){
        for(var i=1;i<=16;i++){
            if($('.cell').eq(i).html()==""){
                return false
            }
        }
        for (let i = 1; i <= 4; i++) {
        	if(
        		$('.row'+i+'.col1').html()==$('.row'+i+'.col2').html() ||
	        	$('.row'+i+'.col3').html()==$('.row'+i+'.col2').html() ||
				$('.row'+i+'.col3').html()==$('.row'+i+'.col4').html() ||
        		$('.col'+i+'.row1').html()==$('.col'+i+'.row2').html() ||
	        	$('.col'+i+'.row3').html()==$('.col'+i+'.row2').html() ||
				$('.col'+i+'.row3').html()==$('.col'+i+'.row4').html()
			){
        		return false;
        	}
        }
        return true;
    }
    function fenshu(){
    	let sum = 0;
        for(var i=1;i<=16;i++){
        	if(!!$('.cell').eq(i).html()){
        		sum += $('.cell').eq(i).html()-0;
        	}
        }
        $('.score1').html(sum);
        if($('.score2').html()<sum){
        	window.localStorage.setItem('fen',sum)
        	$('.score2').html(sum);
        }
    }
    
    
});
// .row1.col1  .row1.col2  .row1.col3  .row1.col4
// .row2.col1  .row2.col2  .row2.col3  .row2.col4
// .row3.col1  .row3.col2  .row3.col3  .row3.col4
// .row4.col1  .row4.col2  .row4.col3  .row4.col4
// 
