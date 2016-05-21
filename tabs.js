
(function initPb($) {
	$.fn.pbfy = function(options) {
		var self = this;

		// options
		var settings = $.extend({
			accent: '#12a8df',
			tabColor: '#fff',
			textColor:'#9e9e9e',
			dividerColor: 'whitesmoke',
		}, options );

		// selector
		var $listToPbfy = this;


		// build pb wrapper
		var $pb = $('<div id="pb" class="pb"></div>');
		var $pbList = $('<ul class="pb-list"></ul>');

		// hide orig list, get the titles, add list items to pb
		var stepsArr = [];
		$listToPbfy.hide().after($pb).find('li').each(function(i, em){

			stepsArr.push($(em).text());
			$pbList.append('<li class="pb-step"><div class="pb-span-wrapper"><span class="pb-span"><i class="pb-index">'+(i+1)+'</i><b class="pb-text">'+$(em).text()+'</b></span></div></li>');

		})
		// style and make index 1 active, before appending
		$pbList.find('.pb-step').width(100/stepsArr.length+'%').eq(0).addClass('active ');
		$pbList.find('.pb-step').eq(1).addClass('next');

		// setcolor

		$pb.append($pbList);
		// methods
		this.c = function setColor(obj){
			obj = $.extend({
				accent: '#12a8df',
				tabColor: '#fff',
				textColor:'#000',
				dividerColor: 'whitesmoke',
			}, obj);

			var style = $('<style>.pb.colorizer .pb-step {background-color:'+obj.tabColor+';color:'+obj.textColor+';} .pb.colorizer .pb-step.active {background-color:'+obj.accent+'; color:'+obj.tabColor+';}.pb.colorizer .pb-index {border-color: '+obj.accent+';}.pb.colorizer .active .pb-index {border-color: '+obj.accent+'; background-color: '+obj.tabColor+'; color: '+obj.accent+';}.pb.colorizer .pb-step+.pb-step { border-left-color: '+obj.dividerColor+';}.pb.colorizer .pb-step+.pb-step::before{ border-left-color: '+obj.tabColor+';}.pb.colorizer .pb-step+.pb-step::after{ border-left-color: '+obj.dividerColor+';}.pb.colorizer .pb-step.active+.pb-step::before { border-left-color: '+obj.accent+';}</style>');
			$('html > head').append(style);
			$('.pb').addClass('colorizer');

			return self;
		};

		/**
		 * Highlighter
		 *
		 * @param index, which tab to highlight
		 * @var this
		 */
		this.hl = function highligtThisIndex(index){
			var $pbSteps = $('.pb-step');
			if (index > $pbSteps.length || index < 1)
				throw "highlighting more than what's available?";
			else {
				$('.pb-step').removeClass('active prev next');
				$('.pb-step').eq(index-1).addClass('active'); // humanize,not 0-based
				$('.pb-step').eq(index-2).addClass('prev');
				$('.pb-step').eq(index-3).addClass('more-prev');
				$('.pb-step').eq(index).addClass('next');

			}
			return self;
		};

		/**
		 * Get active tab's index
		 *
		 * @var int, the humanized index
		 */
		this.i = function getActiveTabIndex(){
			var index = $('.pb-step.active').index()+1;
			return index; 
		};

		/**
		 * Highlight previous tab
		 *
		 * @var this
		 */
		this.b = function goBack(){
			if (self.i() > 1)
				self.hl(self.i()-1);
			else
				throw "Can't move back further.";
			return self; 
		};

		/**
		 * Highlight next tab
		 *
		 * @var this
		 */
		this.f = function goForward(){ 
			var $pbSteps = $('.pb-step');
			if (self.i() < $pbSteps.length)
				self.hl(self.i()+1);
			else
				throw "Can't move forward further.";
			return self; 
		};

		/**
		 * Get the active tab HTML
		 *
		 * @var jQuery object
		 */
		this.g = function getActiveTabHtml(){ 
			return $('.pb-step.active'); 
		};

		window.pb = this;//leak global

		return this;
		
	};



}(jQuery));

