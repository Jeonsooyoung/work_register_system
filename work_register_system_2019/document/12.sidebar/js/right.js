$(document).ready(function(){
	function fixBanner () {
		$(".banner .btn").on("click",function  () {
			var active=$(this).parent().hasClass("on");
			console.log(active);

			//열려진 경우 => 닫아주기
			if (active) $(this).parent().removeClass("on").stop().animate({width:20});
			//닫겨진 경우 => 열어주기
			else $(this).parent().addClass("on").stop().animate({width:200});

			return false;
		});
	}
	fixBanner ();
});