
$(function(){
	
	function Factory(options){
		var calendar = new Calendar();
		return calendar.init(options)
	}
	
	$.calendar = $.fn.calendar = Factory;
})

function Calendar(){

	this.$calendar = null;
	this.oDate = null;
	this.year = null;
	this.month = null;
	this.date = null;
	this.$obj = null;
	this.indexVal = 0;  // 确保点击对应
	
	this.settings = {
		classCalendar :'nf_calendar'
	}
	
}

Calendar.prototype = {
	
	constructor : Calendar,
	
	init : function(options){
	
		$.extend(this.settings,options);
		
		this.pos();
		
	},
	
	//显示位置
	pos : function(){
		
		var This = this;
		this.$obj = $('.'+this.settings.classCalendar);

		this.$obj.on('click',function(ev){
			
			This.indexVal = $(this).index()-1;
			//console.log($(this).index())
			
			if(This.$calendar){
				This.$calendar.remove();
			}
			This.showCalendar();

			This.$calendar.css({
				top : $(this).offset().top + $(this).height()+5,
				left: $(this).offset().left
			});
			
			ev.stopPropagation();
		});
		
		$(document).click(function(){
			This.$calendar.remove();
		})
		
	},
	
	//日历共用生成模板
	template : function(year,month,date,monthDays,week){
		
		var iNow = 1;
		var html = '<div class="calendar_title"><div class="prev_year">&lt;&lt;</div><div class="prev_month">&lt;</div><div class="data_now">'+year+'-'+toDouble(month)+'-'+toDouble(date)+'</div><div class="next_month">&gt;</div><div class="next_year">&gt;&gt;</div></div><div class="calendar_box"><div class="calendar_table"><table cellpadding="0" cellspacing="0"><thead><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></thead><tbody>'
		
		for(var i=1;i<=6;i++){
			html +='<tr>'
			for(var j=0;j<7;j++){
				html += '<td></td>'
			}
			html+='</tr>';
		}
		
		html+='</tbody></table></div><div class="calendar_bg">'+month+'</div></div>'
		
		
		this.$calendar.html(html);
		
		
		for(var i=week; i<(monthDays+week);i++){
			if(date == iNow){
				this.$calendar.find('.calendar_table tbody td').eq(i).addClass('today')
			}
			this.$calendar.find('.calendar_table tbody td').eq(i).html(iNow);
			iNow++; 
		}
		this.hidenTd();
		
		$('body').append(this.$calendar);
		
		this.changeMonth();
		this.changeYear();
		this.inputDate();
		
	},
	
	//显示日历
	showCalendar : function(){
		
		this.$calendar = $('<div class="calendar"></div>');
		this.oDate = new Date();
		this.year = this.oDate.getFullYear();
		this.month = this.oDate.getMonth()+1;
		this.date = this.oDate.getDate();
		
		var monthDays = new Date(this.oDate.getFullYear(), (this.oDate.getMonth()+1), 0).getDate();
		    this.oDate.setDate(1);
		
		var day = this.oDate.getDay();
		
		this.template(this.year,this.month,this.date,monthDays,day)
		
		
	},
	
	//改变月份
	changeMonth : function(){
		
		var This = this;
		
		this.$calendar.find('.next_month').on('click',function(ev){
			
			if(This.month==12){
 				This.year += 1;
				This.month = 1;
				This.date = This.oDate.getDate();
				
				var monthDays = new Date(This.year, This.month, 0).getDate();
					This.oDate.setFullYear(This.year, This.month-1,1);
				
				var day = This.oDate.getDay();
				This.oDate.setDate(This.date);
				
				This.template(This.year,This.month,This.date,monthDays,day);
			}else{
				
				This.month++;
				
				var monthDays = new Date(This.year, This.month, 0).getDate();
				This.oDate.setFullYear(This.year, This.month-1,1);
				
				var day = This.oDate.getDay();
				This.oDate.setDate(This.date);
				This.template(This.year,This.month,This.date,monthDays,day)
				
			}
			ev.stopPropagation(); 
		});
		
		this.$calendar.find('.prev_month').on('click',function(ev){
			
			if(This.month==1){
 				This.year -= 1;
				This.month = 12;
				
				var monthDays = new Date(This.year, This.month, 0).getDate();
					This.oDate.setFullYear(This.year, This.month-1,1);
				
				var day = This.oDate.getDay();
				This.oDate.setDate(This.date);
				This.template(This.year,This.month,This.date,monthDays,day);
			}else{
				
				This.month--;
				
				var monthDays = new Date(This.year, This.month, 0).getDate();
				This.oDate.setFullYear(This.year, This.month-1,1);
				
				var day = This.oDate.getDay();
				This.oDate.setDate(This.date);
				This.template(This.year,This.month,This.date,monthDays,day)
				
			}
			ev.stopPropagation(); 
		})
		
	},
	
	//改变年份
	changeYear : function(){
		var This = this;
		this.$calendar.find('.prev_year').on('click',function(ev){
			This.year--;
			var monthDays = new Date(This.year, This.month, 0).getDate();
			This.oDate.setFullYear(This.year, This.month-1,1);
			
			var day = This.oDate.getDay();
			This.oDate.setDate(This.date);
			This.template(This.year,This.month,This.date,monthDays,day);
			ev.stopPropagation();
		});
		
		this.$calendar.find('.next_year').on('click',function(ev){
			This.year++;
			var monthDays = new Date(This.year, This.month, 0).getDate();
			This.oDate.setFullYear(This.year, This.month-1,1);
			
			var day = This.oDate.getDay();
			This.oDate.setDate(This.date);
			This.template(This.year,This.month,This.date,monthDays,day);
			
			ev.stopPropagation();
		});
		
	},
	
	//生成选择日期
	inputDate : function(){
		var This = this;
		this.$calendar.find('.calendar_table td').click(function(ev){
			This.$obj.eq(This.indexVal).val( This.year+'-'+toDouble(This.month)+'-'+toDouble($(this).html()) )
		});
		
		this.$calendar.find('.data_now').click(function(){
			This.$obj.eq(This.indexVal).val($(this).html())
		})
	},
	
	//多余部分的td隐藏
	hidenTd : function(){
		var nullVal = false;
		for(var i=35; i<42; i++){
			if( this.$calendar.find('.calendar_table tbody td').eq(i).html() != '' ){
				nullVal = true;
			}
		}
		
		if(!nullVal){
			this.$calendar.find('.calendar_table tbody td').eq(35).parent().remove();
		}
	}
	
}

//统一成两位数
function toDouble(num){
	
	if(num<10){
		return '0'+num;
	}
	else{
		return num;
	}
			
}
