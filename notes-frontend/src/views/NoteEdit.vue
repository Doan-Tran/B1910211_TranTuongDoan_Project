<template>
    <div v-if="note" class="page">
        <h4>Cập nhật ghi chú</h4>
        <NoteForm
            :note="note"
            @submit:note="updateNote"
            @delete:note="deleteNote"
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            note: null,
            message: "",
        };
    },
    methods: {
        async getNote(id) {
            try {
                this.note = await NoteService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateNote(data) {
            try {
                await NoteService.update(this.note._id, data);
                this.message = "Ghi chú được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteNote() {
            if (confirm("Bạn muốn xóa ghi chú này?")) {
                try {
                    await NoteService.delete(this.note._id);
                    this.$router.push({ name: "notebook" }); //từng là contactbook
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNote(this.id);
        this.message = "";
    },
};
</script>