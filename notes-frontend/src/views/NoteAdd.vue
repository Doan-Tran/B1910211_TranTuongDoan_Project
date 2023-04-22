<template>
    <div v-if="note" class="page">
        <h4>Thêm ghi chú</h4>
        <NoteForm 
            :note="note" 
            @submit:note="createNote" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import NoteForm from "@/components/NoteForm.vue";
import NoteService from "@/services/note.service";

export default {
    components: {
        NoteForm,
    },
    data() {
        return {
            note: null,
            message: "",
        };
    },
    methods: {
        async createNote(data) {
            try {
                await NoteService.create(data);
                this.message = "Thêm ghi chú thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.note = {};
        this.message = "";
    },
};
</script>   