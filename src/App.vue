<template>
  <div id="app">
    <div class="container mt-5">

      <div class="search ">
        <font-awesome-icon style="color: #21477c;font-size: 20px;margin: 11px 0 0 10px ;" icon="fas fa-search" />
        <input @keydown.enter="getUser()" v-model="searchUser" class="searchInput form-control" placeholder="Search GitHub username...">
        <button @click="getUser()"  style="border-radius: 9px;" class="btn btn-primary px-4 py-2">Search</button>
      </div>

      <div v-if="user.username!=null || error==true" class="user row">
        <div v-if="error" class="alert alert-danger mt-3 w-75 text-center m-auto fw-bold ">
          Kullanıcı bulunamadı
        </div>
        <div v-else >
          <div class="d-flex">
            <div class="col-md-2 me-3">
              <img :src="user.avatar" class="user-image">
            </div>
            <div class="col-md-9">
              <div class="user-main">
                <div class="user-detail">
                  <p class="fw-bold">{{user.name}}</p>
                  <p>{{user.bio}}</p>
                </div>
              </div>

            </div>
          </div>
          <div class="mt-2">
           <div class="user-repo">
            <div>
              <p>Repos</p>
              <p class="fw-bold">{{user.repos}}</p>
            </div>
            <div>
              <p>Followers</p>
              <p class="fw-bold">{{user.followers}}</p>
            </div>
            <div>
             <p>Following</p>
             <p class="fw-bold">{{user.following}}</p>
           </div>
         </div>
         <div class="user-contact">
           <div class="row">
             <div class="col-12 col-md-4 text-center"><font-awesome-icon icon="fas fa-map-marker-alt" /> {{user.company}}</div>
             <div class="col-12 col-md-4 text-center"><font-awesome-icon icon="fab fa-twitter" /> {{user.twitter}}</div>
             <div class="col-12 col-md-4 text-center"><font-awesome-icon icon="fas fa-link" /> <a style="text-decoration: none;" target="blank" :href="user.url">{{user.url}}</a></div>
           </div>
         </div>
       </div>

       <div class="row mt-3 d-flex">
         <div v-for="repo in repoList" class="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
           <span class="badge bg-success">{{repo}}</span>
         </div>
       </div>

     </div>
   </div>

 </div>
</div>
</template>

<script>
  import axios from "axios"
  export default {
    data () {
      return {
        searchUser:null,
        user:{
          username:null,
          name:null,
          avatar:null,
          bio:null,
          company:null,
          repos:null,
          followers:null,
          following:null,
          url:null,
          twitter:null,
        },
        repoList:[],
        error:false
      }
    },
    methods:{
      getUser(){
        axios.get("/"+this.searchUser)
        .then((response) =>{
          //console.log(response)
          var data = response.data
          this.error=false
          this.user = {
            name:data.name,
            username:data.login,
            avatar:data.avatar_url,
            bio:data.bio,
            company:data.company,
            repos:data.public_repos,
            followers:data.followers,
            following:data.following,
            url:data.html_url,
            twitter:data.twitter_username
          }
        })
        .catch(e=>{
          //console.log(e)
          this.error = true
        });
        this.repoList=[]
        axios.get("/"+this.searchUser+"/repos")
        .then(response=>{
          //console.log(response)
          for(let i=response.data.length-1; i>=0;i--){
            this.repoList.push(response.data[i].name) 
          }          
        })
        .catch(e=>{
          console.log(e)
        })
      }
    }
  }
</script>

<style>
  body{
    background-color: #141c30;
  }
  .search{
    background-color: #1f2a48;
    display: flex;
    justify-content: space-between;
    padding: 7px;
    border-radius: 12px;

  }
  .search .searchInput{
    background-color: transparent;
    color:#fff ;
    border:0;
    box-shadow: none;
    font-size: 13px;
  }
  .user{
   background-color: #1f2a48;
   color: #fff;
   margin-top: 20px;
   margin-bottom: 20px;
   padding-bottom: 20px;
   border-radius: 12px;
   font-size: 13px;
 }
 .user-main{
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
}
.user-image{
  background-color: #fff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-top: 20px;
}
.user-repo{
  display: flex;
  justify-content: space-between;
  background-color: #141c30;
  border-radius: 12px;
  padding: 10px 30px 0 30px;
}
.user-contact{
  margin-top: 10px;
}
</style>
