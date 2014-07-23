
$(function(){
	
	function Factory(options){
		var calendar = new Calendar();
		return calendar.init(options)
	}
	
	$.calendar = $.fn.calendar = Factory;
})

function Calendar(){
	
	this.$calendar = null
	
	this.settings ={
		classCalendar :'nf_calendar'
	}
	
}

Calendar.prototype = {
	
	constructor : Calendar,
	
	init : function(options){
	
		$.extend(this.settings,options);
		
		this.pos();
	
	},
	
	pos : function(){
		
		var This = this;
		var $data = $('.'+this.settings.classCalendar);
		
		$data.each(function(i){
			$(this).on('focus',function(){
				
				This.template();
				This.date();
				
				This.$calendar.css({
					top : $data.eq(i).offset().top + $data.eq(i).height()+5,
					left: $data.eq(i).offset().left
				})
			});
		})
		
		$data.each(function(i){
			$(this).on('blur',function(){
				setTimeout(function(){
					This.$calendar.remove();
				},100)
			});
		})
		
		
	},
	
	template : function(){
		
		this.$calendar = $('<div class="calendar"></div>');
		var oDate = new Date();
		
		var monthDays = new Date(oDate.getFullYear(), (oDate.getMonth()+1), 0).getDate();
		
		var html = '<div class="calendar_title"><div class="prev_year">&lt;&lt;</div><div class="prev_month">&lt;</div><div class="data_now">'+oDate.getFullYear()+'-'+toDouble(oDate.getMonth()+1)+'-'+toDouble(oDate.getDate())+'</div><div class="next_month">&gt;</div><div class="next_year">&gt;&gt;</div></div><div class="calendar_box"><div class="calendar_table"><table cellpadding="0" cellspacing="0"><thead><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></thead><tbody>'
		
		for(var i=1;i<=monthDays;){
			html +='<tr>'
			for(var j=0;j<7;j++){
				html += '<td>'+ (i++)+'</td>'
			}
			html+='</tr>';
		}
		
		html+='</tbody></table></div><div class="calendar_bg">'+(oDate.getMonth()+1)+'</div></div>'
		
		
		this.$calendar.html(html);
		
		$('body').append(this.$calendar);
		
	},
	
	date : function(){
		this.$calendar.find('.calendar_table td').click(function(){
			console.log($(this).html())
		})
	}
	
	
}

function toDouble(num){
	
	if(num<10){
		return '0'+num;
	}
	else{
		return num;
	}
			
}