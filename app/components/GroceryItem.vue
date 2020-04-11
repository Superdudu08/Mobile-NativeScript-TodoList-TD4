<template>
    <GridLayout columns="100,*,40" rows="60">
        <Label col="0" :text="statusText" @tap="onDoneTap" class="statusDone" :class="{ 'toDoDone' : groceryItem.done }"></Label>
        <Label col="1" class="item-name" :class="{ 'line-through' : groceryItem.done }" :text="groceryItem.content" @tap="onNameTap"></Label>
        <Label col="2" v-if='groceryItem.done' @tap="onDeleteTap" text="🗑️" class="deleteButton"></Label> 
    </GridLayout>
</template>

<script>
export default {
    props: ['groceryItem'],
    data: function() {
        return {
           
        }
    },
    computed: {
        statusText: function() {
            return this.groceryItem.done ? 'DONE' : 'TO DO';
        }
    },
    methods: {
        toggle: function() {
           this.$emit('toggleDone', this.groceryItem);
        },
        onDoneTap: function() {
            this.$emit('doneTap', this.groceryItem);
        },
        onNameTap: function() {
            this.$emit('nameTap', this.groceryItem);
        },
        onDeleteTap: function() {
            this.$emit('deleteTap', this.groceryItem);
        }
    }
}
</script>

<style lang="scss" scoped>

page {
    label {
        color:black;
    }
    .line-through {
        text-decoration: line-through;
        color:rgb(170,170,170);
    }
    
}
label {
    vertical-align: center;
}
.statusDone {
    text-align:center;
    border-radius:5%;
    margin-left:10px;
    background-color:rgba(180, 110, 110, 0.829);
    padding:2%;
}

.toDoDone {
    background-color: rgb(120, 197, 110)
}
.item-name {
    padding-left: 10px;
    text-align:center;
}

.deleteButton {
    background-color: rgba(7, 6, 6, 0.609);
    text-align: center;
    border-radius:100%;
}
</style>