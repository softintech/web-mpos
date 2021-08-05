export default class Ajax{
    constructor(){         
        this.url = '';
       
    }
    GetJson(mode,token,id='',r=''){     
       // console.log(this.url+`${mode}/${id}`);      
        fetch(this.url+`${mode}/${id}`,{
            method:'GET', 
            headers:{
                Authorization:`Basic ${token}`
            }           
        })
        .then(response=>response.json())
        .then(data=>{ 
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }
    GetText(mode,token,id='',r=''){     
      //  console.log(this.url+`${mode}/${id}`);      
        fetch(this.url+`${mode}/${id}`,{
            method:'GET', 
            headers:{
                Authorization:`Basic ${token}`
            }           
        })
        .then(response=>response.text())
        .then(data=>{            
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }
    Get(mode,token,id='',r=''){     
       // console.log(this.url+`${mode}/${id}`);      
        fetch(this.url+`${mode}/${id}`,{
            method:'GET', 
            headers:{
                Authorization:`Basic ${token}`
            }           
        })
        .then(response=>response.text())
        .then(data=>{            
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }

    PostJson(mode,token,obj,r=''){ 
        fetch(this.url+`${mode}`,{
            method:'POST', 
            headers:{
                Authorization:`Basic ${token}`
            } ,
            body:JSON.stringify(obj)         
        })  
        .then(response=>response.json())      
        .then(data=>{   
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }
    PostText(mode,token,obj,r=''){ 
        fetch(this.url+`${mode}`,{
            method:'POST', 
            headers:{
                Authorization:`Basic ${token}`
            } ,
            body:JSON.stringify(obj)         
        })
        .then(response=>response.text())
        .then(data=>{   
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }
    Post(mode,token,obj,r=''){ 
        
        fetch(this.url+`${mode}`,{
            method:'POST', 
            headers:{
                Authorization:`Basic ${token}`
            } ,
            body:JSON.stringify(obj)         
        })
        .then(response=>response.text())
        .then(data=>{   
            if(r!=''){
                r(data)
            }else{
                return data;
            }  
        })
        .catch(err=>{
           console.log(err);
        })
    }
    post(){ 
        
        const obj = {
            'user':'Suntorn.d',
            'pass':'123456'
        }
        console.log(obj);
        fetch(this.url,{
            method:'POST',
            body:JSON.stringify(obj)
        })
        .then(response=>response.json())
        .then(data=>{   
            sessionStorage.setItem('token',data.token); 
        })
        .catch(err=>{
            console.log(err);   
        })
    }
    
}

