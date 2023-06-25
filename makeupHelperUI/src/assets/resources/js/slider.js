function slider(){ 
	$(".slick-list").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		infinite: false,
		autoplay: false
	});
	$(".prev-btn").click(function () {
		$(".slick-list").slick("slickPrev");
	});

	$(".next-btn").click(function () {
		$(".slick-list").slick("slickNext");
	});
	$(".prev-btn").addClass("slick-disabled");
	$(".slick-list").on("afterChange", function () {
		if ($(".slick-prev").hasClass("slick-disabled")) {
			$(".prev-btn").addClass("slick-disabled");
		} else {
			$(".prev-btn").removeClass("slick-disabled");
		}
		if ($(".slick-next").hasClass("slick-disabled")) {
			$(".next-btn").addClass("slick-disabled");
		} else {
			$(".next-btn").removeClass("slick-disabled");
		}
	});
};
