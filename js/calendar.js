
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
		var $obj = $('.'+this.settings.classCalendar);

		$obj.on('click',function(e){
			
			if(This.$calendar){
				This.$calendar.remove();
			}
			This.template();
			This.date();
			This.$calendar.css({
				top : $(this).offset().top + $(this).height()+5,
				left: $(this).offset().left
			});
			e.stopPropagation();
		});
		
		$(document).click(function(){
			This.$calendar.remove();
		})
		
	},
	
	template : function(){
		
		this.$calendar = $('<div class="calendar"></div>');
		var oDate = new Date();
		var year = oDate.getFullYear();
		var month = oDate.getMonth()+1;
		var date = oDate.getDate()
		
		var monthDays = new Date(oDate.getFullYear(), (oDate.getMonth()+1), 0).getDate();
		    oDate.setDate(1);
		
		var day = oDate.getDay();
		console.log(day)
		
		var html = '<div class="calendar_title"><div class="prev_year">&lt;&lt;</div><div class="prev_month">&lt;</div><div class="data_now">'+year+'-'+toDouble(month)+'-'+toDouble(date)+'</div><div class="next_month">&gt;</div><div class="next_year">&gt;&gt;</div></div><div class="calendar_box"><div class="calendar_table"><table cellpadding="0" cellspacing="0"><thead><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></thead><tbody>'
		
		for(var i=1;i<=6;i++){
			html +='<tr>'
			for(var j=0;j<7;j++){
				html += '<td></td>'
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

function datePos(d){
	switch(d){
		case 0:
			for(var i=0;i<dayNum;i++){
				aTd[i+6].innerHTML = i+1;
			}
		break;
		case 1:
			for(var i=0;i<dayNum;i++){
				aTd[i].innerHTML = i+1;
			}
		break;
		case 2:
			for(var i=0;i<dayNum;i++){
				aTd[i+1].innerHTML = i+1;
			}
		break;
		case 3:
			for(var i=0;i<dayNum;i++){
				aTd[i+2].innerHTML = i+1;
			}
		break;
		case 4:
			for(var i=0;i<dayNum;i++){
				aTd[i+3].innerHTML = i+1;
			}
		break;
		case 5:
			for(var i=0;i<dayNum;i++){
				aTd[i+4].innerHTML = i+1;
			}
		break;
		case 6:
			for(var i=0;i<dayNum;i++){
				aTd[i+5].innerHTML = i+1;
			}
		break;
	}
}