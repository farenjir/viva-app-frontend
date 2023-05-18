import axios from "axios";

const KycService = {
    chekkyc: function chekkyc(): Promise<any> {

        return axios.get(process.env.REACT_APP_Bse_Url + '/kyc/Getkycbyid', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    addkyc: function addkyc(formdata: any): Promise<any> {

        const data = {
            "country": formdata['country'],
            "city": formdata['city'],
            "address": formdata['address'],
            "filename": formdata['filename'],
            "mobail": formdata['mobail'],
            "walletadress": formdata['walletadress'],
            "isaccept": 0,
            "fullname":formdata['fullname'],
            "Email":formdata['Email']
        };

        return axios.post(process.env.REACT_APP_Bse_Url + '/kyc/Addkyc', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    upload: function upload(formdata: any): Promise<any> {

        const data = new FormData()
        data.append('file', formdata)

        return axios.post(process.env.REACT_APP_Bse_Url + '/kyc/File-upload', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    addproject: function addproject(formdata: any): Promise<any> {
        
        const data = {
            "tokenname": formdata['tokenname'],
            "tokensymbol": formdata['tokensymbol'],
            "tokentotall": formdata['tokentotall'],
            "tokenadress": formdata['tokenadress'],
            "ftarget": formdata['ftarget'],
            "pptoken":formdata['pptoken'],
            "sst":formdata['sst'],
            "set": formdata['set'],
            "softcap": formdata['softcap'],
            "hardcap": formdata['hardcap'],
            "sr": formdata['sr'],
            "sc": formdata['sc'],
            "mina": formdata['mina'],
            "maxa": formdata['maxa'],
            "tdt": formdata['tdt'],
            "email": formdata['email'],
            "username": formdata['username'],
            "rounds": formdata['rounds'],
            "vesting": formdata['vesting'],
            "imglist": formdata['imglist'],
            "isfuther": 0,
            "isshow":false,
            "status":0,
            "projecttype":formdata['projecttype'],
            "info":formdata['info'],
            "des":formdata['des']
        }

        return axios.post(process.env.REACT_APP_Bse_Url + '/Project/Addproject', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    listproject: function listproject(): Promise<any> {
      

        return axios.get(process.env.REACT_APP_Bse_Url + '/Project/allproject',  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    kycinfo: function kycinfo(): Promise<any> {
      

        return axios.get(process.env.REACT_APP_Bse_Url + '/kyc/Getkycbyid',  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    addround: function addround(formdata: any): Promise<any> {
        
        const data = {
            "startdate": formdata['startdate'],
            "enddate": formdata['enddate'],
            "price": formdata['price'],
            "username": "",
            "status":0
        }

        return axios.post(process.env.REACT_APP_Bse_Url + '/round/addround', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    addvi: function addvi(formdata: any): Promise<any> {
        
        const data = {
            "startdate": formdata['startdate'],
            "enddate": formdata['enddate'],
            "username": "",
            "status":0
        }

        return axios.post(process.env.REACT_APP_Bse_Url + '/visit/addvi', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    listvi: function listvi(): Promise<any> {
      

        return axios.get(process.env.REACT_APP_Bse_Url + '/visit/Getviwithusername',  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    listround: function listround(): Promise<any> {
      

        return axios.get(process.env.REACT_APP_Bse_Url + '/round/Getroundwithusername',  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    deleteround: function deleteround(id:any): Promise<any> {
      

        return axios.delete(process.env.REACT_APP_Bse_Url + '/round/deleteround/'+id,  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    
    deletevi: function deletevi(id:any): Promise<any> {
      

        return axios.delete(process.env.REACT_APP_Bse_Url + '/visit/deletevi/'+id,  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    listcurency: function listcurency(): Promise<any> {
      

        return axios.get(process.env.REACT_APP_Bse_Url + '/currency/listcurrency',  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
    
    prodetail: function prodetail(id:any): Promise<any> {
      

        return axios.put(process.env.REACT_APP_Bse_Url + '/Project/Getprojectdetail/'+id,  {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
    },
}
export default KycService;