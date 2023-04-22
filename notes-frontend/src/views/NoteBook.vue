<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Ghi chú
            </h4>
            <NoteList
                v-if="filteredNotesCount > 0"
                :notes="filteredNotes"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có ghi chú nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddNote">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllNotes"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeNote">
                <h4>
                    Chi tiết ghi chú
                </h4>
                <NoteCard :note="activeNote" />
                <router-link
                    :to="{
                        name: 'note.edit',
                        params: { id: activeNote._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Chỉnh sửa
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import NoteList from "@/components/NoteList.vue";
import NoteService from "@/services/note.service";

export default {
    components: {
        NoteCard,
        InputSearch,
        NoteList,
    },
    data() {
        return {
            notes: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng note thành chuỗi để tiện cho tìm kiếm.
        noteStrings() {
            return this.notes.map((note) => {
                const { name, title, description } = note;
                return [name, title, description].join("");
            });
        },
        // Trả về các note có chứa thông tin cần tìm kiếm.
        filteredNotes() {
            if (!this.searchText) return this.notes;
            return this.notes.filter((_note, index) =>
                this.noteStrings[index].includes(this.searchText)
            );
        },
        activeNote() {
            if (this.activeIndex < 0) return null;
            return this.filteredNotes[this.activeIndex];
        },
        filteredNotesCount() {
            return this.filteredNotes.length;
        },
    },
    methods: {
        async retrieveNotes() {
            try {
                this.notes = await NoteService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveNotes();
            this.activeIndex = -1;
        },

        async removeAllNotes() {
            if (confirm("Bạn muốn xóa tất cả ghi chú?")) {
                try {
                    await NoteService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddNote() {
            this.$router.push({ name: "note.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>