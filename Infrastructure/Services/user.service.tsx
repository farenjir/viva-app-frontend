import axios from "axios";

const UserService = {
    registeruser:  function registeruser(formdata:any):Promise<any> {
       
        const data = {
            "username": formdata['username'],
            "walletadress": formdata['walletadress'],
            "email": formdata['email'],
            "password": formdata['password'],
            "Reffrallcode":formdata['Reffrallcode']
        };
    
        return  axios.post(process.env.REACT_APP_Bse_Url+'/Auth/Register',data,{
            
        });
    },
    login:  function login(formdata:any):Promise<any> {
       
        const data = {
            "username": formdata['username'],
            "password": formdata['password']
        };
    
        return  axios.post(process.env.REACT_APP_Bse_Url+'/Auth/Login',data,{
            
        });
    }
    ,
    listuser:  function listuser():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/Auth/getlistuser',{
            
        });
    }
    ,
    listfooter:  function listfooter():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/config/listmenu',{
            
        });
    },
    listfootersubmenu:  function listfootersubmenu():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/config/listsubmenu',{
            
        });
    },
    deleteallround:  function deleteallround():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/round/deleteallround',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    deleteallvest:  function deleteallvest():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/visit/deleteallvest',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    }
    ,
    getdetail:  function getdetail():Promise<any> {
       
      
    
        return  axios.get(process.env.REACT_APP_Bse_Url+'/Auth/UserDetail',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    listrefferalluser: function listrefferalluser(id:any): Promise<any> {
      

        return axios.put(process.env.REACT_APP_Bse_Url + '/Auth/getreffralllistforuser/'+id,  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },

}
 export default UserService;