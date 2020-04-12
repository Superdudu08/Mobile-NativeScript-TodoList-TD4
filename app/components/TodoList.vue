<template>
    <ListView for="item in items">
        <v-template>
            <TodoItem :todoItem="item" @doneTap="onToggleDone" @nameTap="onItemTap" @deleteTap="onDeleteTap"></TodoItem>
        </v-template>
    </ListView>
</template>

<script > 
    import TodoItem from "./TodoItem";
    import Detail from './Detail';
    import axios from "axios";
    import * as localstorage from "nativescript-localstorage";
    import Account from "./Account";

  export default {
    components: {TodoItem, Detail},
    props: ['items'],
    methods: {
        onToggleDone(todoItem) {
            const idx = this.items.findIndex(i => i.uuid === todoItem.uuid);
            axios({
                    method: "post",
                    url: "https://api.todolist.sherpa.one/users/check-token",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(() => {
                    axios({
                        method: "patch",
                        url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos/" + this.items[idx].uuid,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        },
                        data: {
                            "done": !todoItem.done
                        }
                    }).then(() => {
                        this.items[idx].done = !todoItem.done;
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
        },
        onItemTap(args) {
            this.$navigateTo(Detail, {
                props: {
                    todoItem: args
                },
                transitionAndroid: {
                    name:"slide",
                    duration: 300,
                    curve: "easeInOut"
                }
            });
        },
        onDeleteTap(todoItem) {
            const idx = this.items.findIndex(i => i.uuid === todoItem.uuid);

            if (this.items[idx].done) {
                    axios({
                        method: "post",
                        url: "https://api.todolist.sherpa.one/users/check-token",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(() => {
                        axios({
                            method: "delete",
                            url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos/" + this.items[idx].uuid,
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(() => {
                            this.items.splice(idx, 1);
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
                } else {
                    alert("Réalisez cette tâche avant de la supprimer");
                }
        }
    }
  }
</script>

<style lang="scss" scoped>
    
</style>
