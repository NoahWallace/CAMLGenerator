(function($){
	$.fn.CAMLgenerator=function(x,options){
		var s='';

		var setting=$.extend({
				rowLimit:'',
				order:'',
				viewFields:'',
				debug:false
			},options);
		if(x.length==1){s=getCompare(x[0]);}
		if(x.length>1){
			var o=[];
			for(l=0;l<x.length;l++){
				var str=getCompare(x[l]);
				o.push(str);
			}
			for(c=0;c<o.length;c++){
				var sa='';
				var ea='';
				if(c==1 || c>1){sa='<Or>';ea="</Or>";}
				s=sa+o[c]+s+ea;
			}						
		}
		s="<Where>"+s+"</Where>";
		if(setting.order!=''){
			var str=getOrder(setting.order);
				s=s+str;
		};
		s="<Query>"+s+"</Query>";
		if(setting.viewFields!=''){
			var str='';
			str+="<ViewFields>";
			for(i=0;i<setting.viewFields.length;i++){
				str+="<FieldRef Name='"+setting.viewFields[i]+"' />";
			}
			str+="</ViewFields>";
			s=s+str;
		}
		if(setting.rowLimit!=''){
			var str="<RowLimit>"+setting.rowLimit+"</RowLimit>"
			s=s+str;
		};			
		return s;
	}
	function getCompare(x){
			var s='';
			if(x.length==1){
				for(o=0;o<x.length;o++){
					if(x.length==1){
						s+="<"+x[o][0]+">";
						s+="<FieldRef Name='"+x[o][1]+"'/>";
						s+="<Value Type='"+x[o][3]+"'>"+x[o][2]+"</Value>";
						s+="</"+x[o][0]+">";					
					}
				}
			}
			if(x.length!=1){
				for(i=0;i<x.length;i++){
					var sa='';
					var ea='';
					if(i==1 || i>1){sa='<And>';ea="</And>"}
					s=sa+"<"+x[i][0]+"><FieldRef Name='"+x[i][1]+"'/><Value Type='"+x[i][3]+"'>"+x[i][2]+"</Value></"+x[i][0]+">"+s+ea;
				}
			}
			return s;
	}
	function getOrder(obj){
			
			var str='';
				str+='<OrderBy>';
			for(i=0;i<obj.length;i++){
				if(obj[i].length!=2){console.log("Order Array Does not have a length of 2:\"Array Index "+i+"'"+obj[i]);continue;}
				var order='True';
				if(obj[i][1]=='Desc'){order="FALSE";}
					str+="<FieldRef Name='"+obj[i][0]+"' Ascending='"+order+"'/>";
			}
			str+='</OrderBy>';
			return str;
	}

			
	
}(jQuery));