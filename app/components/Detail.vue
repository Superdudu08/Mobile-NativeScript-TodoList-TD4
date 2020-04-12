<template>
    <Page>
        <ActionBar title="Details">
        </ActionBar>
        <StackLayout>
            <Label :text="todoItem.content"></Label>
            <Button text="Back" @tap="onBackTap"></Button>
            <Button :text="statusText" @tap='toggle'></Button>
        </StackLayout>
    </Page>
</template>

<script>
import * as localstorage from 'nativescript-localstorage';
import axios from "axios";
import Account from "./Account";

export default {
    props: ['todoItem'],
    data: function() {
        return {
           
        }
    },
    computed: {
        statusText: function() {
            return this.todoItem.done ? 'Done' : 'Not done';
        }
    },
    methods: {
        toggle: function() {
           axios({
                    method: "post",
                    url: "https://api.todolist.sherpa.one/users/check-token",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(() => {
                    axios({
                        method: "patch",
                        url: "https://api.todolist.sherpa.one/users/" + localstorage.getItem("uuid") + "/todos/" + this.todoItem.uuid,
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                        },
                        data: {
                            "done": !this.todoItem.done
                        }
                    }).then(() => {
                        this.todoItem.done = !this.todoItem.done;
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
        onBackTap : function() {
            this.$navigateBack();
        }
    }

}
</script>

<style lang="scss" scoped>
    Button {
        background-color: rgb(228, 201, 201);
        margin-top:10px;
        margin-bottom:10px;
        width:60%;
        height:120px;
        font-size:14px;
        border-radius:5%;
    }

    Label {
        padding: 30px;
        font-size:20px;
        text-align: center;
    }

    ActionBar {
        background-color: rgb(228, 201, 201);
        color:black;
    }
</style>