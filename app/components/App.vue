<template>
  <Page>
    <ActionBar title="TO DO LIST">
      <ActionItem text="ADD" @tap="onAddTap"></ActionItem>
      <ActionItem text="NEW PASSWORD" @tap="onChangePassword"></ActionItem>
    </ActionBar>
    <StackLayout>
      <TodoList :items="items" />
    </StackLayout>
  </Page>
</template>

<script > 
  import TodoList from "./TodoList";
  import AddItem from './AddItem';
  import * as localstorage from 'nativescript-localstorage';
  import axios from "axios";
  import Account from "./Account";
  
  export default {
    components: {TodoList},
    data() {
      return {
        items: []
      }
    },
    methods: {
      alert(message) {
                return alert({
                    title: "TODO LIST",
                    okButtonText: "OK",
                    message: message
                });
            },
      onAddTap() {
        const newId= new Date().getTime();
        this.$showModal(AddItem).then( newItem => {
          if(newItem) {
            axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/check-token",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(() => {
                        axios({
                            method: "post",
                            url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos",
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            },
                            data: newItem
                        }).then((response) => {
                            let {data} = response;
                            this.items.push(data.todo);
                        }).catch((response) => {
                            alert("Erreur API\n" + response);
                        });
              }).catch(() => {
                        this.$navigateTo(Account, {
                            transitionAndroid: {
                                name: "slideRight",
                                duration: 1000,
                                curve: "easeOut"
                            }
                        });
                    });
                }
            });
          },
      onChangePassword() {
        axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/check-token",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
        }).then(axios({
                  method: "post",
                  url: "https://api.todolist.sherpa.one/users/" + localStorage.getItem("uuid") + "/reset/password",
                  headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
        })).then((response) => {
          let {data} = response;
          let nouveauPassword = data.password;
        })
      }
    },
    computed: {
          listItems() {
              localStorage.setItem("data", JSON.stringify(this.items));
              return this.items;
          }
    },
    created: function () {
            axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/check-token",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(() => {
                axios({
                    method: "get",
                    url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then((response) => {
                    let {data} = response;
                    this.items = data.todos;
                }).catch((response) => {
                    alert("Erreur API\n" + response);
                });
            }).catch(() => {
                this.$navigateTo(Account, {
                    transitionAndroid: {
                        name: "slideRight",
                        duration: 1000,
                        curve: "easeOut"
                    }
                });
            });
        }
}
</script>

<style scoped>
ActionBar {
  background-color: rgb(228, 201, 201);
  color: black;
}
</style>
