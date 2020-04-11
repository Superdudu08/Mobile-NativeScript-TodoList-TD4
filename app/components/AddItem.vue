<template>
    <Page>
        <StackLayout>
            <Label text="Add new task"></Label>
            <TextField v-model="content" hint="Enter task title"></TextField>
            <Button text="Save" @tap="onSaveTap"></Button>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: ['id'],
    data: function() {
        return {
           content: ''
        }
    },
    methods: {
        onSaveTap: function() {
            if(this.content !== "") {
                const newItem = {
                    content: this.content,
                    done: false
                };
                this.$modal.close(newItem);
            }
            
        }
    }

}
</script>

<style lang="scss" scoped>

StackLayout {
    width:100%;
    padding:30px;
}
label {
    text-align:center;
    padding:20px;
}

button {
    background-color: rgb(228, 201, 201);
    border-radius:5%;
}
</style>