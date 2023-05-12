

# vue环境监听手机键盘弹出事件

```ts
data: {    
	return {        
		docmHeight: '0',  //默认屏幕高度       
		showHeight:  '0',   //实时屏幕高度        
		hidshow:true , //显示或者隐藏footer,      
		isResize:false //默认屏幕高度是否已获取   
	};  
}

mounted: {    // window.onresize监听页面高度的变化   
	 window.onresize = ()=>{        
       return(()=>{                     
		if (!this.isResize) {                               
			// 默认屏幕高度                              
			this.docmHeight = document.documentElement.clientHeight                                
			this.isResize = true                       
		}                        
		// 实时屏幕高度                       
		this.showHeight = document.body.clientHeight         
        })()    
	 }  
 }

// watch监听
function showHeight() {        
	if(this.docmHeight > this.showHeight){    
           // 键盘顶起        
		this.hidshow=false        
	}else{            
		this.hidshow=true        
	}    
}
```